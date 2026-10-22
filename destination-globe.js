import {
  AmbientLight,
  BackSide,
  CanvasTexture,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer
} from "three";
import { gsap } from "gsap";
import { feature } from "topojson-client";

const GLOBE_RADIUS = 1.08;
const MARKER_RADIUS = 1.105;
const CLUSTER_DISTANCE_DEGREES = 1.5;

function createIllustrativeTexture(worldAtlas) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is not available for the globe texture.");

  const ocean = context.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, "#2d594b");
  ocean.addColorStop(0.5, "#1d493d");
  ocean.addColorStop(1, "#12382f");
  context.fillStyle = ocean;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const longitudeX = (longitude) => ((longitude + 180) / 360) * canvas.width;
  const latitudeY = (latitude) => ((90 - latitude) / 180) * canvas.height;

  context.strokeStyle = "rgba(221, 204, 159, 0.15)";
  context.lineWidth = 1;
  for (let latitude = -75; latitude <= 75; latitude += 25) {
    context.beginPath();
    context.ellipse(
      canvas.width / 2,
      latitudeY(latitude),
      canvas.width * 0.49,
      Math.max(1, Math.cos((latitude * Math.PI) / 180) * canvas.height * 0.48),
      0,
      0,
      Math.PI * 2
    );
    context.stroke();
  }
  for (let longitude = -150; longitude < 180; longitude += 30) {
    context.beginPath();
    context.ellipse(
      longitudeX(longitude),
      canvas.height / 2,
      Math.max(1, Math.cos((longitude * Math.PI) / 180) * canvas.width * 0.49),
      canvas.height * 0.49,
      0,
      0,
      Math.PI * 2
    );
    context.stroke();
  }

  const land = feature(worldAtlas, worldAtlas.objects.countries);
  const landColor = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  landColor.addColorStop(0, "#b1b78b");
  landColor.addColorStop(0.5, "#929f77");
  landColor.addColorStop(1, "#737f67");
  context.fillStyle = landColor;
  context.strokeStyle = "rgba(235, 217, 171, 0.27)";
  context.lineWidth = 0.8;

  const drawRing = (ring) => {
    context.beginPath();
    let previousX = null;
    ring.forEach(([longitude, latitude], index) => {
      const x = longitudeX(longitude);
      const y = latitudeY(latitude);
      if (index === 0 || Math.abs(x - previousX) > canvas.width / 2) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
      previousX = x;
    });
    context.closePath();
    context.fill();
    context.stroke();
  };

  land.features.forEach(({ geometry }) => {
    if (geometry.type === "Polygon") {
      geometry.coordinates.forEach(drawRing);
    } else if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((polygon) => polygon.forEach(drawRing));
    }
  });

  return new CanvasTexture(canvas);
}

function toSpherePosition(latitude, longitude, radius) {
  const lat = MathUtils.degToRad(latitude);
  const lon = MathUtils.degToRad(longitude);
  return new Vector3(
    radius * Math.cos(lat) * Math.cos(lon),
    radius * Math.sin(lat),
    -radius * Math.cos(lat) * Math.sin(lon)
  );
}

function groupNearbyDestinations(destinations) {
  const clusters = [];
  destinations.forEach((destination) => {
    if (!destination.published) return;
    const latitude = destination.latitude;
    const longitude = destination.longitude;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;
    const cluster = clusters.find((candidate) => {
      const meanLatitude = (candidate.latitude + latitude) / 2;
      const longitudeDistance = Math.abs(candidate.longitude - longitude) *
        Math.cos(MathUtils.degToRad(meanLatitude));
      return Math.hypot(candidate.latitude - latitude, longitudeDistance) <=
        CLUSTER_DISTANCE_DEGREES;
    });
    if (cluster) {
      cluster.destinations.push(destination);
      const count = cluster.destinations.length;
      cluster.latitude += (latitude - cluster.latitude) / count;
      cluster.longitude += (longitude - cluster.longitude) / count;
    } else {
      clusters.push({
        destinations: [destination],
        latitude,
        longitude
      });
    }
  });
  return clusters;
}

export async function createDestinationGlobe({ canvas, markerLayer, destinations, language, onSelect }) {
  let renderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "low-power"
    });
  } catch {
    return null;
  }

  let worldData;
  try {
    const response = await fetch(
      new URL(`${import.meta.env.BASE_URL}data/countries-110m.json`, import.meta.url)
    );
    if (!response.ok) {
      throw new Error(`Natural Earth map request failed with status ${response.status}.`);
    }
    worldData = await response.json();
  } catch (error) {
    renderer.dispose();
    throw new Error("Could not load Natural Earth map data.", { cause: error });
  }

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 20);
  camera.position.set(0, 0, 3.75);
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
  renderer.outputColorSpace = SRGBColorSpace;

  const globe = new Group();
  globe.rotation.x = 0.09;
  globe.rotation.y = -Math.PI / 2 + 0.1;
  scene.add(globe);

  const texture = createIllustrativeTexture(worldData);
  const sphereGeometry = new SphereGeometry(GLOBE_RADIUS, 48, 32);
  const sphereMaterial = new MeshStandardMaterial({
    map: texture,
    roughness: 0.96,
    metalness: 0
  });
  globe.add(new Mesh(sphereGeometry, sphereMaterial));

  const atmosphere = new Mesh(
    new SphereGeometry(GLOBE_RADIUS * 1.045, 32, 24),
    new MeshBasicMaterial({
      color: 0xc8b276,
      side: BackSide,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    })
  );
  globe.add(atmosphere);

  scene.add(new AmbientLight(0xffffff, 1.35));
  const keyLight = new DirectionalLight(0xf5e8c7, 2.2);
  keyLight.position.set(-3, 2, 4);
  scene.add(keyLight);

  const markerGeometry = new SphereGeometry(0.032, 12, 10);
  const markers = new Map();
  const markerMeshes = [];
  const markerButtons = new Map();
  groupNearbyDestinations(destinations).forEach((cluster) => {
    const material = new MeshStandardMaterial({
      color: 0xf3d27e,
      emissive: 0x795723,
      emissiveIntensity: 0.8,
      roughness: 0.42
    });
    const marker = new Mesh(markerGeometry, material);
    marker.position.copy(toSpherePosition(
      cluster.latitude,
      cluster.longitude,
      MARKER_RADIUS
    ));
    marker.userData.destinationIds = cluster.destinations.map((destination) => destination.id);
    marker.userData.destinations = cluster.destinations;
    if (cluster.destinations.length > 1) {
      marker.scale.setScalar(1 + Math.min(cluster.destinations.length - 1, 3) * 0.12);
    }
    marker.userData.baseScale = marker.scale.x;
    globe.add(marker);
    cluster.destinations.forEach((destination) => markers.set(destination.id, marker));
    markerMeshes.push(marker);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "globe-marker";
    button.textContent = cluster.destinations.length > 1
      ? String(cluster.destinations.length)
      : "✳";
    button.setAttribute("aria-pressed", "false");
    button.userData = {
      destinationIds: marker.userData.destinationIds,
      destinations: cluster.destinations
    };
    button.addEventListener("click", () => {
      const selectedIndex = button.userData.destinationIds.indexOf(selectedId);
      const nextIndex = (selectedIndex + 1) % button.userData.destinationIds.length;
      onSelect(button.userData.destinationIds[nextIndex]);
    });
    markerLayer.append(button);
    markerButtons.set(marker, button);
  });

  const initialRotation = { x: globe.rotation.x, y: globe.rotation.y };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let selectedId = null;
  let dragStart = null;
  let dragging = false;
  let visible = false;
  let frameId = 0;
  let lastFrame = 0;
  let lastMarkerUpdate = 0;

  function updateMarkerButtons() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    const cameraDirection = camera.position.clone().normalize();
    const worldPosition = new Vector3();
    const projectedPosition = new Vector3();
    const projectedMarkers = [];
    markerMeshes.forEach((marker) => {
      const button = markerButtons.get(marker);
      marker.getWorldPosition(worldPosition);
      const isOnVisibleSide = worldPosition.clone().normalize().dot(cameraDirection) > 0.08;
      projectedPosition.copy(worldPosition).project(camera);
      button.hidden = true;
      if (isOnVisibleSide && projectedPosition.z >= -1 && projectedPosition.z <= 1) {
        projectedMarkers.push({
          marker,
          x: ((projectedPosition.x + 1) / 2) * rect.width,
          y: ((1 - projectedPosition.y) / 2) * rect.height
        });
      }
    });

    const groups = [];
    projectedMarkers.forEach((candidate) => {
      const overlappingGroups = groups.filter((group) =>
        group.members.some((member) =>
          Math.abs(member.x - candidate.x) < 42 &&
          Math.abs(member.y - candidate.y) < 42
        )
      );
      if (!overlappingGroups.length) {
        groups.push({ members: [candidate] });
        return;
      }
      const [group, ...mergedGroups] = overlappingGroups;
      group.members.push(candidate);
      mergedGroups.forEach((mergedGroup) => {
        group.members.push(...mergedGroup.members);
        groups.splice(groups.indexOf(mergedGroup), 1);
      });
    });

    groups.forEach(({ members }) => {
      const representative = markerButtons.get(members[0].marker);
      const groupedDestinations = members.flatMap(({ marker }) =>
        marker.userData.destinations
      );
      representative.userData.destinations = groupedDestinations;
      representative.userData.destinationIds = groupedDestinations.map(({ id }) => id);
      representative.textContent = groupedDestinations.length > 1
        ? String(groupedDestinations.length)
        : "✳";
      representative.hidden = false;
      const x = Math.round(members.reduce((sum, member) => sum + member.x, 0) / members.length);
      const y = Math.round(members.reduce((sum, member) => sum + member.y, 0) / members.length);
      representative.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      updateMarkerLabel(representative);
      representative.setAttribute(
        "aria-pressed",
        String(representative.userData.destinationIds.includes(selectedId))
      );
    });
  }

  function updateMarkerLabel(button) {
    const names = button.userData.destinations.map((destination) =>
      destination.name[language]
    );
    const action = language === "fr"
      ? "Cliquer pour sélectionner ou parcourir."
      : "Click to select or cycle through destinations.";
    const category = names.length > 1
      ? language === "fr" ? "destinations proches" : "nearby destinations"
      : language === "fr" ? "destination" : "destination";
    const label = `${names.join(", ")} — ${category}. ${action}`;
    button.setAttribute("aria-label", label);
    button.title = label;
  }

  function draw() {
    if (visible && !document.hidden) {
      updateMarkerButtons();
      renderer.render(scene, camera);
    }
  }

  function tick(time = 0) {
    frameId = 0;
    if (visible && !document.hidden) {
      const delta = lastFrame ? Math.min((time - lastFrame) / 1000, 0.05) : 0;
      lastFrame = time;
      if (!reducedMotion.matches && !dragging) globe.rotation.y += delta * 0.025;
      if (time - lastMarkerUpdate >= 100) {
        lastMarkerUpdate = time;
        updateMarkerButtons();
      }
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(tick);
    }
  }

  function startRendering() {
    if (visible && !document.hidden && !frameId) {
      frameId = window.requestAnimationFrame(tick);
    }
  }

  function stopRendering() {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrame = 0;
  }

  function resize() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    draw();
  }

  function handlePointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true;
    dragStart = {
      x: event.clientX,
      y: event.clientY,
      rotationX: globe.rotation.x,
      rotationY: globe.rotation.y
    };
    canvas.setPointerCapture?.(event.pointerId);
  }

  function handlePointerMove(event) {
    if (!dragging || !dragStart) return;
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 5) {
      globe.rotation.y = dragStart.rotationY + deltaX * 0.006;
      globe.rotation.x = MathUtils.clamp(
        dragStart.rotationX + deltaY * 0.004,
        -1.1,
        1.1
      );
      draw();
    }
  }

  function handlePointerUp(event) {
    if (!dragging) return;
    dragging = false;
    canvas.releasePointerCapture?.(event.pointerId);
    dragStart = null;
  }

  function select(id) {
    selectedId = id;
    new Set(markers.values()).forEach((marker) => {
      const isSelected = marker.userData.destinationIds.includes(selectedId);
      marker.scale.setScalar(isSelected ? 1.65 : marker.userData.baseScale);
      marker.material.color.set(isSelected ? 0xffffff : 0xf3d27e);
      marker.material.emissiveIntensity = isSelected ? 1.5 : 0.8;
    });
    markerButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.userData.destinationIds.includes(selectedId))
      );
    });
    draw();
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    markerButtons.forEach(updateMarkerLabel);
    markerLayer.setAttribute(
      "aria-label",
      language === "fr" ? "Marqueurs de destinations" : "Destination markers"
    );
  }

  function reset() {
    gsap.to(globe.rotation, {
      x: initialRotation.x,
      y: initialRotation.y,
      duration: reducedMotion.matches ? 0 : 0.6,
      ease: "power2.out",
      onUpdate: draw
    });
  }

  function handleContextLost(event) {
    event.preventDefault();
    stopRendering();
    canvas.parentElement.classList.remove("is-ready");
    markerLayer.hidden = true;
    document.querySelector("#globe-fallback").classList.remove("is-hidden");
    document.querySelector(".fallback-caption").textContent =
      document.documentElement.lang === "fr"
        ? "Le contexte graphique a été interrompu. La liste des destinations reste accessible."
        : "The graphics context was interrupted. The destination list remains accessible.";
  }

  function handleContextRestored() {
    resize();
    markerLayer.hidden = false;
    canvas.parentElement.classList.add("is-ready");
    document.querySelector("#globe-fallback").classList.add("is-hidden");
    startRendering();
  }

  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointermove", handlePointerMove);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointercancel", handlePointerUp);
  canvas.addEventListener("webglcontextlost", handleContextLost);
  canvas.addEventListener("webglcontextrestored", handleContextRestored);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    if (visible) startRendering();
    else stopRendering();
  });
  intersectionObserver.observe(canvas);

  const handleVisibilityChange = () => {
    if (document.hidden) stopRendering();
    else startRendering();
  };
  document.addEventListener("visibilitychange", handleVisibilityChange);
  setLanguage(language);
  resize();

  return {
    select,
    setLanguage,
    reset,
    dispose() {
      stopRendering();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      markerLayer.replaceChildren();
      texture.dispose();
      const disposedGeometries = new Set();
      scene.traverse((object) => {
        if (object.geometry && !disposedGeometries.has(object.geometry)) {
          disposedGeometries.add(object.geometry);
          object.geometry.dispose();
        }
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer.dispose();
    }
  };
}
