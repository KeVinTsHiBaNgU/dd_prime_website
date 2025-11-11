// app/api/devis/route.js
import { NextResponse } from "next/server";

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, prestation, message } = body || {};

    if (!email || !prestation) {
      return NextResponse.json(
        { error: "Email et prestation sont obligatoires." },
        { status: 400 }
      );
    }

    // Appel à Strapi pour créer une entrée DevisRequest
    const res = await fetch(`${CMS_URL}/api/devis-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          email,
          prestation,
          message,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Erreur Strapi DevisRequest:", res.status, text);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement du devis." },
        { status: 500 }
      );
    }

    const json = await res.json();

    return NextResponse.json(
      {
        ok: true,
        id: json?.data?.id ?? null,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erreur API /api/devis:", err);
    return NextResponse.json(
      { error: "Erreur serveur interne." },
      { status: 500 }
    );
  }
}
