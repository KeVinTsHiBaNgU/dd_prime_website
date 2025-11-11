// lib/cms.js
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";

async function fetchFromCMS(path) {
  const res = await fetch(`${CMS_URL}${path}`, {
    cache: "no-store", // pratique en dev, pas de cache
  });

  if (!res.ok) {
    console.error("Erreur CMS:", res.status, res.statusText);
    throw new Error(`Erreur CMS sur ${path}`);
  }

  const json = await res.json();
  return json;
}

/* -------- HEADER -------- */
export async function getHeaderData() {
  try {
    const [navJson, headerJson] = await Promise.all([
      fetchFromCMS("/api/nav-items?sort=order"),
      fetchFromCMS("/api/headers"),
    ]);

    const rawItems = Array.isArray(navJson?.data)
      ? navJson.data // cas Strapi standard
      : Array.isArray(navJson)
      ? navJson // cas où l'API renvoie directement un tableau
      : [];

    const navItems = rawItems.map((item) => {
      const attrs = item.attributes || item; // si pas de attributes, on prend l’objet lui-même

      return {
        id: item.id || attrs.id,
        label: attrs.label || "",
        href: attrs.href || "#",
        order: attrs.order ?? 0,
      };
    });

    const headerAttrs = headerJson?.data?.attributes || {};
    const brand = {
      line1: headerAttrs.brandLine1 || "D&D",
      line2: headerAttrs.brandLine2 || "Prime",
    };

    return { brand, navItems };
  } catch (error) {
    console.error("Erreur getHeaderData():", error);

    return {
      brand: { line1: "D&D", line2: "Prime" },
      navItems: [], // on laisse Header.js décider s'il remplace ou pas
    };
  }
}

/**
 * Récupère les prestations wedding (Organisation complète, Coordination, etc.)
 */
export async function getWeddingPrestations() {
  const json = await fetchFromCMS("/api/wedding-prestations?sort=order");

  return json.data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    bullets: item.bullets,
    icon: item.icon,
    order: item.order,
  }));
}

/**
 * Récupère les prestations d'intérieures
 */
export async function getInteriorPrestations() {
  const json = await fetchFromCMS("/api/interior-prestations?sort=order");

  const items = Array.isArray(json?.data) ? json.data : [];

  const prestations = items.map((item) => {
    const src = item.attributes || item;

    return {
      id: item.id,
      title: src.title,
      description: src.description,
      bullets: src.bullets,
      icon: src.icon,
      order: src.order,
    };
  });

  // On prend les champs de section sur la première entrée (si présents)
  const first = items[0]?.attributes || items[0] || {};
  const sectionTitle =
    first.sectionTitle || "Décoration d'intérieur";
  const sectionSubtitle =
    first.sectionSubtitle ||
    "Des services sur-mesure pour sublimer vos intérieurs";

  return { sectionTitle, sectionSubtitle, prestations };
}

/**
 * Récupère les prestations évenementielles
 */
export async function getEventPrestations() {
  const json = await fetchFromCMS("/api/event-prestations?sort=order");

  return json.data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    bullets: item.bullets,
    icon: item.icon,
    order: item.order,
  }));
}

/* -------- DEVIS -------- */
export async function getDevisPage() {
  const json = await fetchFromCMS("/api/devis-pages");

  const item = Array.isArray(json?.data) ? json.data[0] : json?.data;

  if (!item) {
    // valeurs par défaut si aucun contenu
    return {
      sectionTitle: "Demander un devis",
      sectionSubtitle:
        "Parlez-nous de votre projet, nous reviendrons vers vous avec une proposition personnalisée.",
      introText:
        "Que ce soit pour une décoration d'intérieur, un événement privé ou votre mariage, nous vous accompagnons du premier échange jusqu'au jour J.",
      bullets: [],
      emailExemple: "exemple@adresse.com",
      email: "",
      phone: "",
      contactTitle: "Suivez & contactez D&D Prime :",
      callButtonLabel: "Appeler maintenant",
      instagram: "",
      snapchat: "",
      tiktok: "",
    };
  }

  // tu as nommé les champs bulle1/bulle2/bulle3
  const bullets = [item.bulle1, item.bulle2, item.bulle3].filter(Boolean);

  return {
    sectionTitle: item.sectionTitle || "Demander un devis",
    sectionSubtitle: item.sectionSubtitle || "",
    introText: item.introText || "",
    bullets,
    emailExemple: item.emailExemple || "",
    email: item.email || "",
    phone: item.phone || "",
    contactTitle: item.contactTitle || "Suivez & contactez D&D Prime :",
    callButtonLabel: item.callButtonLabel || "Appeler maintenant",
    instagram: item.instagram || "",
    snapchat: item.snapchat || "",
    tiktok: item.tiktok || "",
  };
}


/* -------- FOOTER -------- */

export async function getFooterData() {
  try {
    const json = await fetchFromCMS("/api/footers"); // ou /api/footers si c'est ton endpoint

    // Ici json.data est un tableau, on prend le premier élément
    const raw = Array.isArray(json?.data) ? json.data[0] : json?.data;

    if (!raw) {
      throw new Error("Footer: pas de données dans la réponse CMS");
    }

    // Dans ton JSON, les champs sont directement sur l'objet (pas de .attributes)
    const attrs = raw;

    const currentYear = new Date().getFullYear();

    // On sépare ce qu'on affiche de ce qu'on utilise pour les liens
    const displayPhone = attrs.phone || "";
    
    const phoneForLink =
    displayPhone.replace(/[^\d+]/g, "") || "+33612345678"; // nettoie pour le tel:

    const displayEmail = attrs.email || "";
    const emailMatch = displayEmail.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    const emailForLink = emailMatch ? emailMatch[0] : "contact@ddprime.fr";

    return {
      tagline:
        attrs.tagline ||
        "Décoration d'intérieur & événementielle sur-mesure, pour des moments élégants et inoubliables.",
      locationText:
        attrs.locationText ||
        "Basée à Montpellier et alentours. Disponible pour vos projets en Occitanie et au-delà.",

      // affichage
      phoneDisplay: displayPhone,
      emailDisplay: displayEmail,

      // pour les liens href
      phoneLink: phoneForLink,
      emailLink: emailForLink,

      instagramUrl: attrs.instagramUrl || "https://instagram.com/",

      snapchatUrl: attrs.snapchatUrl || "",

      tiktokUrl: attrs.tiktokUrl || "",

      copyrightText:
        attrs.copyrightText || `© ${currentYear} D&D Prime. Tous droits réservés.`,
      creditText:
        attrs.creditText || "Design & développement — D&D Prime.",
    };
  } catch (error) {
    console.error("Erreur getFooterData():", error);

    const currentYear = new Date().getFullYear();

    return {
      tagline:
        "Décoration d'intérieur & événementielle sur-mesure, pour des moments élégants et inoubliables.",
      locationText:
        "Basée à Montpellier et alentours. Disponible pour vos projets en Occitanie et au-delà.",
      phoneDisplay: "📞 +33 6 12 34 56 78",
      emailDisplay: "✉️ contact@ddprime.fr",
      phoneLink: "+33612345678",
      emailLink: "contact@ddprime.fr",
      instagramUrl: "https://instagram.com/",
      snapchatUrl: "",
      tiktokUrl: "",
      copyrightText: `© ${currentYear} D&D Prime. Tous droits réservés.`,
      creditText: "Design & développement — D&D Prime.",
    };
  }
}


