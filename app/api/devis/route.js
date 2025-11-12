// app/api/devis/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // important pour utiliser nodemailer

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@ddprime.fr";
const OWNER_EMAIL = process.env.DEVIS_OWNER_EMAIL || "contact@ddprime.fr";

// Transporter Nodemailer
const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      })
    : null;

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, phone, prestation, message } = body || {};

    if (!email || !prestation) {
      return NextResponse.json(
        { error: "Email et prestation sont obligatoires." },
        { status: 400 }
      );
    }

    // 1) Enregistrement dans Strapi
    let devisId = null;
    try {
      const strapiRes = await fetch(`${CMS_URL}/api/devis-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            email,
            phone,
            prestation,
            message,
          },
        }),
      });

      const strapiJson = await strapiRes.json();

      if (!strapiRes.ok) {
        console.error("Erreur Strapi:", strapiRes.status, strapiJson);
        return NextResponse.json(
          { error: "Erreur lors de l'enregistrement du devis." },
          { status: 500 }
        );
      }

      devisId = strapiJson?.data?.id ?? null;
    } catch (err) {
      console.error("Exception Strapi:", err);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement du devis." },
        { status: 500 }
      );
    }

    // 2) Envoi des emails
    let emailErrors = null;
    if (!transporter) {
      console.warn("Transporter Nodemailer non configuré.");
      emailErrors = "SMTP non configuré";
    } else {
      try {
        await Promise.all([
          transporter.sendMail({
            from: FROM_EMAIL,
            to: OWNER_EMAIL,
            subject: `Nouvelle demande de devis - ${prestation}`,
            html: `
              <h2>Nouvelle demande de devis</h2>
              <p><strong>Email client :</strong> ${email}</p>
              <p><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
              <p><strong>Prestation :</strong> ${prestation}</p>
              <p><strong>Message :</strong></p>
              <p>${message || "(aucun message)"}</p>
              ${devisId ? `<p><small>ID Strapi : ${devisId}</small></p>` : ""}
            `,
          }),
          transporter.sendMail({
            from: FROM_EMAIL,
            to: email,
            subject: "Votre demande de devis - D&D Prime",
            html: `
              <h2>Merci pour votre demande ✨</h2>
              <p>Bonjour,</p>
              <p>Nous avons bien reçu votre demande de devis pour la prestation : <strong>${prestation}</strong>.</p>
              <p>Nous vous recontacterons au <strong>${phone || "numéro indiqué"}</strong> ou par mail avec une réponse personnalisée.</p>
              ${
                message
                  ? `<p><strong>Rappel de votre message :</strong></p><p>${message}</p>`
                  : ""
              }
              <br/>
              <p>À très bientôt,<br/><strong>D&D Prime</strong></p>
            `,
          }),
        ]);
      } catch (err) {
        console.error("Erreur envoi email:", err);
        emailErrors = "Erreur lors de l'envoi des emails.";
      }
    }

    // 3) Réponse finale
    return NextResponse.json(
      {
        ok: true,
        id: devisId,
        emailStatus: emailErrors ? "partial" : "ok",
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
