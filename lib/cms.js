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

