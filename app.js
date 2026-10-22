import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const translations = {
  fr: {
    pageTitle: "LE TOURISTOLOGUE — La Côte d’Ivoire se découvre autrement",
    pageDescription: "Découvrez la Côte d’Ivoire autrement avec LE TOURISTOLOGUE : circuits à San Pedro, expériences culturelles et voyages sur mesure.",
    ogDescription: "Des voyages qui rapprochent des paysages, des histoires et des communautés de Côte d’Ivoire.",
    heroAlt: "Photographie d’illustration d’un littoral tropical au coucher du soleil",
    dayTripAlt: "Photographie d’illustration d’une plage bordée de palmiers",
    coastAlt: "Photographie d’illustration de la côte et de la mer",
    natureAlt: "Photographie d’illustration d’un paysage naturel tropical",
    weekendAlt: "Photographie d’illustration d’un paysage côtier à la lumière du matin",
    historyAlt: "Photographie d’illustration d’une architecture patrimoniale",
    cityAlt: "Photographie d’illustration d’un paysage urbain",
    riverAlt: "Photographie d’illustration d’une rivière traversant un paysage verdoyant",
    meetingAlt: "Photographie d’illustration d’un moment de rencontre et de partage",
    galleryAlt1: "Photographie d’illustration d’une plage tropicale",
    galleryAlt2: "Photographie d’illustration d’un paysage naturel verdoyant",
    galleryAlt3: "Photographie d’illustration de végétation tropicale",
    globeEyebrow: "UN MONDE D’EXPÉRIENCES",
    globeTitle: "Explorez la Côte d’Ivoire<br />et <em>le monde.</em>",
    globeIntro: "Des plages de San Pedro aux destinations internationales, partez à la découverte de nouvelles expériences.",
    globeReset: "Réinitialiser la vue",
    globeHint: "Faites glisser pour explorer",
    globeAttribution: "Globe illustratif · Contours Natural Earth (données du domaine public) · Repères <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStreetMap contributors (ODbL)</a>. Les lieux proches peuvent être regroupés.",
    globeLoading: "Le globe interactif se prépare…",
    globeUnavailable: "Globe indisponible sur cet appareil. La liste des destinations reste accessible.",
    globeFailed: "Le globe n’a pas pu se charger. La liste des destinations reste accessible.",
    globeMarkerGroup: "destinations proches",
    detailKicker: "VOTRE PROCHAINE ÉTAPE",
    detailDefaultTitle: "À vous de choisir.",
    detailDefaultDescription: "Sélectionnez un lieu sur le globe ou parcourez la liste pour explorer les destinations.",
    destinationCta: "Imaginer un voyage ici",
    destinationListTitle: "CHOISISSEZ UNE DESTINATION",
    destinationListAria: "Destinations disponibles",
    destinationLoadError: "Impossible de charger les destinations pour le moment.",
    detailCountry: "Destination · ",
    destinationPrefill: "Destination souhaitée : ",
    locationProxy: "Le repère indique Monrovia.",
    navTrips: "Nos circuits", navDestinations: "Destinations", navCulture: "Nos valeurs", navContact: "Contact", navCta: "Créer mon voyage",
    heroEyebrow: "VOTRE HISTOIRE COMMENCE ICI", heroTitle: "La Côte d’Ivoire<br />se découvre <em>autrement.</em>",
    heroBody: "Des rivages de San Pedro aux rencontres qui marquent, vivez des voyages authentiques, au rythme des lieux et de ceux qui les font.",
    heroButton: "Explorer les circuits", heroStory: "Notre histoire", heroNoteStrong: "Petits groupes, grandes rencontres.", heroNote: "Au départ de San Pedro, Côte d’Ivoire.",
    heroPhotoLabel: "L’APPEL DU GRAND BLEU", photoIllustration: "Photographie d’illustration", scroll: "DÉFILER POUR EXPLORER",
    strip1: "FAIT AVEC LE CŒUR, EN CÔTE D’IVOIRE", strip2: "DES ITINÉRAIRES QUI ONT DU SENS", strip3: "DES RENCONTRES, PAS JUSTE DES VISITES",
    tripsEyebrow: "PRENEZ LE TEMPS DE VOIR", tripsTitle: "Des escapades qui<br /><em>vous ressemblent.</em>", tripsAside: "Un grand bol d’air, un week-end au bord de l’eau ou une immersion culturelle : choisissez votre façon de voyager.",
    filterAll: "Tous les circuits", filterNature: "Nature & mer", filterCulture: "Culture & histoire",
    tagDay: "À LA JOURNÉE", tag3Days: "3 JOURS", tagCulture: "IMMERSION", tagWeekend: "WEEK-END", tagHistory: "HISTOIRE", tagCity: "VILLE & PATRIMOINE",
    metaSanPedro: "SAN PEDRO · GRAND-BÉRÉBY", metaCoast: "MONOGAGA · GRAND-BÉRÉBY · TRAHÉ", metaBereby: "GRAND-BÉRÉBY · RENCONTRE LOCALE",
    metaWeekend: "SAN PEDRO · MONOGAGA · GRAND-BÉRÉBY", metaHistory: "SAN PEDRO · SASSANDRA",
    trip1Title: "L’essentiel de San Pedro", trip1Desc: "Mini-zoo, Rocher des Amoureux, piscine naturelle ou grand marché : les étapes s’adaptent au temps disponible et à l’accès aux sites.",
    durationDay: "1 journée · Programme adaptable", discover: "Découvrir", trip2Title: "Mer & nature", trip2Desc: "De Monogaga à Trahé : plage, ancien site de La Langouste d’Or, singes aux nez blancs, palmier anaconda, piscine de Tabaoulé et cascade.",
    duration3Days: "3 jours · Tarif à confirmer", trip3Title: "Immersion en pays kroumen", trip3Desc: "Embouchure, débarcadère, rencontre au village, traditions et repas partagé, dans le respect de l’accord des communautés.",
    durationToConfirm: "Durée et modalités à confirmer", trip4Title: "Le week-end côté mer", trip4Desc: "Trois jours entre les plages de San Pedro, Monogaga et Grand-Béréby ; hébergements et activités seront confirmés.",
    durationWeekend: "Vendredi–dimanche · Options à confirmer", trip5Title: "Sur les traces de l’histoire", trip5Desc: "San Pedro–Sassandra : un itinéraire autour de lieux et de récits historiques, à documenter et valider avant publication.",
    historyToConfirm: "Contenu historique à valider", trip6Title: "San Pedro, histoire & modernité", trip6Desc: "Monument de la Paix, port depuis les points accessibles, rue des Banques, Séwéké, Grand-Bardot, stade Laurent Pokou et Rocher des Amoureux.",
    tripNote: "Les tarifs, horaires et disponibilités sont communiqués après validation de votre demande. Les itinéraires peuvent évoluer selon l’accès aux sites.",
    destEyebrow: "DES TERRES À EXPLORER", destTitle: "Un pays.<br />Mille façons de <em>s’émerveiller.</em>", destBody: "Des plages du Sud aux montagnes de l’Ouest, chaque région a son rythme, ses saveurs et ses histoires. Nous vous y emmenons avec curiosité et attention.",
    otherDestinations: "Et bien d’autres", destInternational: "Bientôt aussi au Liberia et au-delà.", destMoreLabel: "D’AUTRES HORIZONS À DÉCOUVRIR",
    tailorEyebrow: "VOTRE VOYAGE, VOS RÈGLES", tailorTitle: "Et si on partait<br /><em>à votre façon ?</em>",
    tailorBody: "Une envie précise, quelques jours de libres ou une grande occasion à célébrer ? Dites-nous ce qui vous fait rêver. Nous construirons ensemble un itinéraire à votre mesure.",
    perk1: "Vous partagez vos envies", perk2: "Nous imaginons votre itinéraire", perk3: "Vous recevez une proposition",
    formDisclaimer: "Votre envoi constitue une demande de renseignement, pas une réservation confirmée.", formKicker: "ON EN PARLE ?", formTitle: "Racontez-nous votre projet",
    labelType: "Type de demande", chooseOption: "Choisissez une option", optionStandard: "Circuit standard", optionCustom: "Voyage sur mesure", optionOther: "Autre renseignement",
    labelName: "Votre nom", labelEmail: "Votre e-mail", labelDate: "Dates envisagées", labelTravelers: "Nombre de voyageurs", selectLater: "À préciser",
    labelInterest: "Où souhaitez-vous aller ? Qu’aimez-vous faire ?", placeholderName: "Ex. Awa Koné", placeholderDate: "Ex. dates flexibles",
    placeholderInterest: "Une destination, la nature, la culture, un budget indicatif…", consentText: "J’accepte que LE TOURISTOLOGUE utilise ces informations pour répondre à ma demande.",
    submitRequest: "Préparer ma demande", privacyNote: "Vos informations restent confidentielles. Elles ne sont pas transmises depuis cette démo.",
    cultureEyebrow: "VOYAGER AVEC CURIOSITÉ, ET AVEC RESPECT", cultureTitle: "La plus belle rencontre,<br />c’est <em>celle qu’on partage.</em>",
    cultureBody: "Un voyage prend tout son sens quand il se vit avec les personnes qui font la richesse d’un lieu. Nous défendons des expériences préparées avec les communautés, dans le respect de leurs traditions, de leur consentement et de leur juste rémunération.",
    cultureLink: "Ce qui nous guide", cultureCaption: "ÉCOUTER · APPRENDRE · PARTAGER",
    galleryEyebrow: "UN AVANT-GOÛT DU VOYAGE", galleryTitle: "La beauté est <em>tout près.</em>",
    galleryNote: "Photographies d’illustration en attendant les images authentiques des circuits.",
    galleryCaption1: "L’appel de la côte", galleryCaption2: "Loin du quotidien", galleryCaption3: "Au cœur du vivant",
    quote: "Venez comme des inconnu(e)s<br />et repartez <em>ami(e)s.</em>", quoteBy: "L’ESPRIT LE TOURISTOLOGUE",
    contactEyebrow: "UN PROJET, UNE QUESTION ?", contactTitle: "On vous écoute.<br /><em>Vraiment.</em>",
    contactBody: "Parlez-nous de vos envies. Nous vous répondrons pour imaginer la suite ensemble.", contactButton: "Écrire à notre équipe",
    location: "Basés à San Pedro, Côte d’Ivoire", footerPromise: "La Côte d’Ivoire se découvre autrement.", backTop: "Retour en haut ↑",
    footerPhoto: "Images d’illustration · Coordonnées à compléter avant publication", footerContact: "Contact", floatingCta: "Parlons voyage",
    statusNoConfig: "Le formulaire est prêt, mais la réception des demandes n’est pas encore configurée. Contactez l’équipe par les coordonnées qui seront publiées ici.",
    statusInvalid: "Vérifiez les champs obligatoires et votre adresse e-mail.", statusSent: "Votre application e-mail va s’ouvrir pour envoyer votre demande."
  },
  en: {
    pageTitle: "LE TOURISTOLOGUE — Discover Côte d’Ivoire a different way",
    pageDescription: "Discover Côte d’Ivoire a different way with LE TOURISTOLOGUE: San Pedro trips, cultural experiences and tailor-made journeys.",
    ogDescription: "Journeys that bring you closer to the landscapes, stories and communities of Côte d’Ivoire.",
    heroAlt: "Illustrative photograph of a tropical coastline at sunset",
    dayTripAlt: "Illustrative photograph of a palm-lined beach",
    coastAlt: "Illustrative photograph of the coast and ocean",
    natureAlt: "Illustrative photograph of a tropical natural landscape",
    weekendAlt: "Illustrative photograph of a coastal landscape in the morning light",
    historyAlt: "Illustrative photograph of historic architecture",
    cityAlt: "Illustrative photograph of an urban landscape",
    riverAlt: "Illustrative photograph of a river winding through a green landscape",
    meetingAlt: "Illustrative photograph of a moment of connection and sharing",
    galleryAlt1: "Illustrative photograph of a tropical beach",
    galleryAlt2: "Illustrative photograph of a green natural landscape",
    galleryAlt3: "Illustrative photograph of tropical vegetation",
    globeEyebrow: "A WORLD OF EXPERIENCES",
    globeTitle: "Explore Côte d’Ivoire<br />and <em>the world.</em>",
    globeIntro: "From the shores of San Pedro to international destinations, discover new experiences.",
    globeReset: "Reset the view",
    globeHint: "Drag to explore",
    globeAttribution: "Illustrative globe · Natural Earth boundaries (public-domain data) · Markers from <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noopener noreferrer\">OpenStreetMap contributors (ODbL)</a>. Nearby places may be grouped.",
    globeLoading: "Preparing the interactive globe…",
    globeUnavailable: "The globe is unavailable on this device. The destination list remains accessible.",
    globeFailed: "The globe could not be loaded. The destination list remains accessible.",
    globeMarkerGroup: "nearby destinations",
    detailKicker: "YOUR NEXT STOP",
    detailDefaultTitle: "Choose a destination.",
    detailDefaultDescription: "Select a place on the globe or browse the list to explore destinations.",
    destinationCta: "Plan a trip here",
    destinationListTitle: "CHOOSE A DESTINATION",
    destinationListAria: "Available destinations",
    destinationLoadError: "Destinations could not be loaded right now.",
    detailCountry: "Destination · ",
    destinationPrefill: "Destination of interest: ",
    locationProxy: "The marker indicates Monrovia.",
    navTrips: "Our trips", navDestinations: "Destinations", navCulture: "Our values", navContact: "Contact", navCta: "Plan my trip",
    heroEyebrow: "YOUR STORY STARTS HERE", heroTitle: "Discover Côte d’Ivoire<br /><em>a different way.</em>",
    heroBody: "From the shores of San Pedro to the encounters that stay with you, experience authentic journeys at the pace of the places and people who make them.",
    heroButton: "Explore our trips", heroStory: "Our story", heroNoteStrong: "Small groups, meaningful encounters.", heroNote: "Starting from San Pedro, Côte d’Ivoire.",
    heroPhotoLabel: "THE CALL OF THE OCEAN", photoIllustration: "Illustrative photograph", scroll: "SCROLL TO EXPLORE",
    strip1: "MADE WITH HEART IN CÔTE D’IVOIRE", strip2: "JOURNEYS WITH MEANING", strip3: "REAL ENCOUNTERS, NOT JUST SIGHTSEEING",
    tripsEyebrow: "TAKE THE TIME TO SEE", tripsTitle: "Getaways that<br /><em>feel like you.</em>", tripsAside: "A breath of fresh air, a weekend by the water or a cultural immersion: choose your way to travel.",
    filterAll: "All trips", filterNature: "Nature & coast", filterCulture: "Culture & history",
    tagDay: "DAY TRIP", tag3Days: "3 DAYS", tagCulture: "IMMERSION", tagWeekend: "WEEKEND", tagHistory: "HISTORY", tagCity: "CITY & HERITAGE",
    metaSanPedro: "SAN PEDRO · GRAND-BÉRÉBY", metaCoast: "MONOGAGA · GRAND-BÉRÉBY · TRAHÉ", metaBereby: "GRAND-BÉRÉBY · LOCAL ENCOUNTER",
    metaWeekend: "SAN PEDRO · MONOGAGA · GRAND-BÉRÉBY", metaHistory: "SAN PEDRO · SASSANDRA",
    trip1Title: "San Pedro essentials", trip1Desc: "Mini-zoo, Lovers’ Rock, natural pool or main market: stops adapt to available time and site access.",
    durationDay: "1 day · Flexible itinerary", discover: "Explore", trip2Title: "Sea & nature", trip2Desc: "From Monogaga to Trahé: beach, the former Langouste d’Or site, white-nosed monkeys, anaconda palm, Tabaoulé natural pool and waterfall.",
    duration3Days: "3 days · Price to be confirmed", trip3Title: "Kroumen cultural immersion", trip3Desc: "Visit the estuary and landing, meet the village, and share local traditions and a meal with community consent.",
    durationToConfirm: "Duration and details to be confirmed", trip4Title: "A seaside weekend", trip4Desc: "Three days among the beaches of San Pedro, Monogaga and Grand-Béréby; accommodation and activities to be confirmed.",
    durationWeekend: "Friday–Sunday · Options to be confirmed", trip5Title: "Tracing the past", trip5Desc: "San Pedro–Sassandra: a route exploring historical places and stories, to be researched and validated before publication.",
    historyToConfirm: "Historical content to be verified", trip6Title: "San Pedro: history & modernity", trip6Desc: "Monument of Peace, accessible port viewpoints, Rue des Banques, Séwéké, Grand-Bardot, Laurent Pokou Stadium and Lovers’ Rock.",
    tripNote: "Prices, schedules and availability will be shared once your enquiry has been reviewed. Itineraries may change depending on site access.",
    destEyebrow: "LANDS TO EXPLORE", destTitle: "One country.<br />A thousand ways to <em>wonder.</em>", destBody: "From southern beaches to western mountains, every region has its own pace, flavours and stories. We’ll take you there with curiosity and care.",
    otherDestinations: "And many more", destInternational: "Coming soon to Liberia and beyond.", destMoreLabel: "MORE PLACES TO DISCOVER",
    tailorEyebrow: "YOUR TRIP, YOUR WAY", tailorTitle: "What if we travelled<br /><em>your way?</em>",
    tailorBody: "Have a specific idea, a few days free or a special occasion to celebrate? Tell us what inspires you. Together, we’ll shape an itinerary just for you.",
    perk1: "Share what you have in mind", perk2: "We shape an itinerary", perk3: "Receive a tailored proposal",
    formDisclaimer: "This form sends an enquiry, not a confirmed booking.", formKicker: "LET’S TALK", formTitle: "Tell us about your trip",
    labelType: "Enquiry type", chooseOption: "Choose an option", optionStandard: "Standard trip", optionCustom: "Custom trip", optionOther: "Other enquiry",
    labelName: "Your name", labelEmail: "Your email", labelDate: "Preferred dates", labelTravelers: "Number of travellers", selectLater: "To be confirmed",
    labelInterest: "Where would you like to go? What do you enjoy?", placeholderName: "e.g. Awa Koné", placeholderDate: "e.g. dates flexible",
    placeholderInterest: "A destination, nature, culture, an indicative budget…", consentText: "I agree that LE TOURISTOLOGUE may use this information to respond to my enquiry.",
    submitRequest: "Prepare my enquiry", privacyNote: "Your information stays private. It is not transmitted from this demo.",
    cultureEyebrow: "TRAVEL WITH CURIOSITY AND RESPECT", cultureTitle: "The best encounters<br />are the ones <em>we share.</em>",
    cultureBody: "Travel takes on meaning when shared with the people who make a place special. We believe in experiences shaped with local communities, respecting their traditions, consent and fair compensation.",
    cultureLink: "What guides us", cultureCaption: "LISTEN · LEARN · SHARE",
    galleryEyebrow: "A TASTE OF THE JOURNEY", galleryTitle: "Beauty is <em>closer than you think.</em>",
    galleryNote: "Illustrative photographs until authentic trip images are available.",
    galleryCaption1: "The call of the coast", galleryCaption2: "A change of pace", galleryCaption3: "Into the wild",
    quote: "Come as strangers<br />and leave as <em>friends.</em>", quoteBy: "THE LE TOURISTOLOGUE SPIRIT",
    contactEyebrow: "A QUESTION OR A TRIP IN MIND?", contactTitle: "We’re listening.<br /><em>Really.</em>",
    contactBody: "Tell us what you have in mind. We’ll get back to you and plan what comes next together.", contactButton: "Contact our team",
    location: "Based in San Pedro, Côte d’Ivoire", footerPromise: "Discover Côte d’Ivoire a different way.", backTop: "Back to top ↑",
    footerPhoto: "Illustrative images · Contact details to be added before launch", footerContact: "Contact", floatingCta: "Let’s talk travel",
    statusNoConfig: "The form is ready, but enquiry delivery has not been configured yet. Please use the contact details that will be published here.",
    statusInvalid: "Please check the required fields and your email address.", statusSent: "Your email app will open so you can send your enquiry."
  }
};

let currentLanguage = "fr";
let destinations = [];
const form = document.querySelector("#request-form");
const formStatus = document.querySelector("#form-status");
const contactEmail = document.querySelector('meta[name="contact-email"]').content.trim();
const whatsappNumber = document.querySelector('meta[name="whatsapp-number"]').content.replace(/\D/g, "");
const whatsappLink = document.querySelector(".floating-contact a");
let selectedDestination = null;
let globeInstance = null;

const destinationsPromise = fetch(`${import.meta.env.BASE_URL}data/destinations.json`)
  .then((response) => {
    if (!response.ok) throw new Error(`Destination data request failed with status ${response.status}.`);
    return response.json();
  })
  .then((entries) => {
    if (!Array.isArray(entries)) throw new Error("Destination data must be an array.");
    destinations = entries.filter((entry) =>
      entry &&
      typeof entry.id === "string" &&
      typeof entry.slug === "string" &&
      typeof entry.country === "string" &&
      typeof entry.published === "boolean" &&
      Number.isFinite(entry.latitude) &&
      entry.latitude >= -90 &&
      entry.latitude <= 90 &&
      Number.isFinite(entry.longitude) &&
      entry.longitude >= -180 &&
      entry.longitude <= 180 &&
      typeof entry.name?.fr === "string" &&
      typeof entry.name?.en === "string" &&
      typeof entry.shortDescription?.fr === "string" &&
      typeof entry.shortDescription?.en === "string" &&
      Object.hasOwn(entry, "image")
    );
    if (!destinations.length) throw new Error("No valid destination entries were found.");
    renderDestinationList();
    return destinations;
  })
  .catch((error) => {
    console.error("Could not load destination data.", error);
    const item = document.createElement("li");
    item.textContent = translations[currentLanguage].destinationLoadError;
    document.querySelector("#destination-list").replaceChildren(item);
    throw error;
  });

destinationsPromise.catch(() => {});

gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let context;

  const createAnimations = () => {
    context?.revert();
    context = undefined;
    if (motionPreference.matches) return;

    context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .from(".hero-copy .eyebrow", { autoAlpha: 0, y: 14, duration: 0.45 })
        .from(".hero h1", { autoAlpha: 0, y: 24, duration: 0.65 }, "-=0.2")
        .from(".hero-description", { autoAlpha: 0, y: 16, duration: 0.5 }, "-=0.34")
        .from(".hero-actions", { autoAlpha: 0, y: 12, duration: 0.4 }, "-=0.24")
        .from(".hero-note", { autoAlpha: 0, y: 10, duration: 0.35 }, "-=0.18")
        .from(".hero-visual > img", { scale: 1.04, duration: 1.2, ease: "power2.out" }, "-=1.1");

      gsap.utils.toArray(".section-heading, .destination-copy, .tailor-copy, .culture-content, .gallery-heading, .contact-section > div")
        .forEach((element) => {
          gsap.from(element, {
            autoAlpha: 0,
            y: 22,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true }
          });
        });

      gsap.from(".trip-card", {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".trip-grid", start: "top 84%", once: true }
      });

      gsap.from(".gallery-item", {
        autoAlpha: 0,
        y: 18,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: ".gallery-grid", start: "top 85%", once: true }
      });
    });
  };

  createAnimations();
  motionPreference.addEventListener("change", createAnimations);
  return () => {
    motionPreference.removeEventListener("change", createAnimations);
    context?.revert();
  };
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = translations[language][element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = translations[language][element.dataset.i18nPlaceholder];
    if (value) element.placeholder = value;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = translations[language][element.dataset.i18nAlt];
    if (value) element.alt = value;
  });
  document.title = translations[language].pageTitle;
  document.querySelector("#page-description").content = translations[language].pageDescription;
  document.querySelector("#og-title").content = translations[language].pageTitle;
  document.querySelector("#og-description").content = translations[language].ogDescription;
  globeInstance?.setLanguage(language);
  configureWhatsApp();
  renderDestinationList();
  updateSelectedDestination();
  const toggle = document.querySelector(".language-toggle");
  toggle.textContent = language === "fr" ? "EN" : "FR";
  toggle.setAttribute("aria-label", language === "fr" ? "Switch language to English" : "Passer le site en français");
  document.querySelector(".skip-link").textContent = language === "fr" ? "Aller au contenu" : "Skip to content";
  document.querySelector(".menu-toggle .sr-only").textContent = language === "fr" ? "Ouvrir le menu" : "Open menu";
  document.querySelector(".main-nav").setAttribute("aria-label", language === "fr" ? "Navigation principale" : "Main navigation");
  document.querySelector("#destination-list").setAttribute("aria-label", translations[language].destinationListAria);
  if (formStatus.dataset.message) showStatus(translations[language][formStatus.dataset.message], formStatus.classList.contains("is-error"));
  updateTripCount();
}

function showStatus(message, isError = false, key = "") {
  formStatus.textContent = message;
  formStatus.classList.toggle("is-error", isError);
  formStatus.dataset.message = key;
}

function updateTripCount() {
  const visibleTrips = [...document.querySelectorAll(".trip-card")].filter((card) => !card.hidden).length;
  document.querySelector(".trip-count").textContent = `${String(visibleTrips).padStart(2, "0")} ${currentLanguage === "fr" ? "EXPÉRIENCES" : "EXPERIENCES"}`;
}

function renderDestinationList() {
  const list = document.querySelector("#destination-list");
  list.replaceChildren();
  const publishedDestinations = destinations.filter((destination) =>
    destination.published &&
    Number.isFinite(destination.latitude) &&
    Number.isFinite(destination.longitude) &&
    destination.name?.fr &&
    destination.name?.en
  );

  publishedDestinations.forEach((destination) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const name = document.createElement("span");
    const country = document.createElement("small");
    button.type = "button";
    button.className = "destination-option";
    button.dataset.destinationId = destination.id;
    name.textContent = destination.name[currentLanguage];
    country.textContent = destination.country;
    button.append(name, country);
    button.addEventListener("click", () => selectDestination(destination.id, true));
    item.append(button);
    list.append(item);
  });

  document.querySelector("#destination-count").textContent =
    String(publishedDestinations.length).padStart(2, "0");
}

function updateSelectedDestination() {
  if (!selectedDestination) return;
  document.querySelector("#selected-destination-title").textContent =
    selectedDestination.name[currentLanguage];
  const proxyNote = selectedDestination.id === "liberia"
    ? ` ${translations[currentLanguage].locationProxy}`
    : "";
  document.querySelector("#selected-destination-description").textContent =
    `${translations[currentLanguage].detailCountry}${selectedDestination.country}. ${selectedDestination.shortDescription[currentLanguage]}${proxyNote}`;
  document.querySelectorAll(".destination-option").forEach((button) => {
    const isSelected = button.dataset.destinationId === selectedDestination.id;
    button.setAttribute("aria-pressed", String(isSelected));
  });
  globeInstance?.select(selectedDestination.id);
}

function selectDestination(id, setFormValue = false) {
  selectedDestination = destinations.find((destination) => destination.id === id && destination.published);
  if (!selectedDestination) return;
  updateSelectedDestination();
  if (setFormValue) {
    const prompt = `${translations[currentLanguage].destinationPrefill}${selectedDestination.name[currentLanguage]}. `;
    const textarea = document.querySelector("#interests");
    if (!textarea.value.includes(selectedDestination.name[currentLanguage])) {
      textarea.value = `${prompt}${textarea.value}`.trim();
    }
  }
}

async function initializeGlobe() {
  const fallbackCaption = document.querySelector(".fallback-caption");
  try {
    await destinationsPromise;
    const { createDestinationGlobe } = await import("./destination-globe.js");
    globeInstance = await createDestinationGlobe({
      canvas: document.querySelector("#destination-globe"),
      markerLayer: document.querySelector("#globe-markers"),
      destinations: destinations.filter((destination) =>
        destination.published &&
        Number.isFinite(destination.latitude) &&
        Number.isFinite(destination.longitude)
      ),
      language: currentLanguage,
      onSelect: (id) => selectDestination(id, false)
    });
    if (!globeInstance) {
      fallbackCaption.textContent = translations[currentLanguage].globeUnavailable;
      return;
    }
    document.querySelector("#globe-fallback").classList.add("is-hidden");
    document.querySelector("#globe-stage").classList.add("is-ready");
    document.querySelector("#globe-reset").addEventListener("click", () => globeInstance?.reset());
    if (selectedDestination) globeInstance.select(selectedDestination.id);
  } catch (error) {
    console.error("Destination globe could not be initialized.", error);
    fallbackCaption.textContent = translations[currentLanguage].globeFailed;
  }
}

function observeGlobe() {
  const section = document.querySelector("#globe-stage");
  if (!("IntersectionObserver" in window)) {
    initializeGlobe();
    return () => {};
  }
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      initializeGlobe();
    }
  }, { rootMargin: "250px 0px" });
  observer.observe(section);
  return () => observer.disconnect();
}

function configureWhatsApp() {
  if (!whatsappNumber) return;
  const greeting = currentLanguage === "fr"
    ? "Bonjour, je souhaite organiser un voyage avec LE TOURISTOLOGUE."
    : "Hello, I would like to plan a trip with LE TOURISTOLOGUE.";
  whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(greeting)}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
  whatsappLink.setAttribute("aria-label", currentLanguage === "fr"
    ? "Contacter LE TOURISTOLOGUE sur WhatsApp"
    : "Contact LE TOURISTOLOGUE on WhatsApp");
}

document.querySelector(".language-toggle").addEventListener("click", () => {
  setLanguage(currentLanguage === "fr" ? "en" : "fr");
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".trip-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
    updateTripCount();
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("is-open");
}));

document.querySelector("#destination-cta").addEventListener("click", () => {
  if (!selectedDestination) return;
  selectDestination(selectedDestination.id, true);
  document.querySelector("#request-type").value = "custom";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) {
    showStatus(translations[currentLanguage].statusInvalid, true, "statusInvalid");
    return;
  }
  if (!contactEmail) {
    showStatus(translations[currentLanguage].statusNoConfig, true, "statusNoConfig");
    return;
  }
  const data = new FormData(form);
  const subject = currentLanguage === "fr" ? "Demande de voyage — LE TOURISTOLOGUE" : "Travel enquiry — LE TOURISTOLOGUE";
  const body = [
    `Type: ${data.get("type")}`,
    `Name: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
    `Dates: ${data.get("dates") || "Not specified"}`,
    `Travellers: ${data.get("travelers") || "Not specified"}`,
    `Project: ${data.get("interests")}`
  ].join("\n");
  showStatus(translations[currentLanguage].statusSent, false, "statusSent");
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
configureWhatsApp();
renderDestinationList();
const disposeAnimations = initAnimations();
const stopObservingGlobe = observeGlobe();
window.addEventListener("pagehide", () => {
  disposeAnimations?.();
  stopObservingGlobe?.();
  globeInstance?.dispose();
}, { once: true });
updateTripCount();
