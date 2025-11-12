// app/api/devis/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // nécessaire pour nodemailer

/* ================== CONFIG ================== */
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@ddprime.fr";
const OWNER_EMAIL = process.env.DEVIS_OWNER_EMAIL || "contact@ddprime.fr";

/* ====== Branding (tu peux ajuster les couleurs et logo) ====== */
const BRAND_NAME = "D&D Prime";
const BRAND_COLOR = "#d9a441";
const BRAND_TEXT = "#1e1e1e";
const BRAND_MUTED = "#6b6b6b";
const BRAND_BG = "#f7f6f2";
const BRAND_LOGO =
  process.env.BRAND_LOGO_URL ||
  "https://dummyimage.com/140x40/d9a441/ffffff&text=D%26D+Prime";
/* ====== Réseaux sociaux ====== */
const SOCIALS = {
  instagram:
    process.env.INSTAGRAM_URL || "https://instagram.com/ddprime_interior_event",
  snapchat:
    process.env.SNAPCHAT_URL ||
    "https://snapchat.com/add/ddprime_interior_event",
  tiktok:
    process.env.TIKTOK_URL || "https://tiktok.com/@ddprime_interior_event",
};

/* ================== HELPERS ================== */

// supprime toutes les balises html et trim
function sanitizeInput(text = "") {
  return String(text)
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

function socialsFooterHtml() {
  return `
    <div style="text-align:center;margin-top:16px;">
      <p style="margin-bottom:8px;font-family:Segoe UI,Arial,sans-serif;color:${BRAND_MUTED};font-size:13px;">
        Suivez & contactez <strong>${BRAND_NAME}</strong> :
      </p>
      <div>
        ${
          SOCIALS.instagram
            ? `<a href="${SOCIALS.instagram}" style="text-decoration:none;margin:0 6px;display:inline-block;">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                     width="20" height="20" alt="Instagram"
                     style="filter: invert(56%) sepia(93%) saturate(474%) hue-rotate(17deg) brightness(92%) contrast(88%);" />
              </a>`
            : ""
        }
        ${
          SOCIALS.snapchat
            ? `<a href="${SOCIALS.snapchat}" style="text-decoration:none;margin:0 6px;display:inline-block;">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/snapchat.svg"
                     width="20" height="20" alt="Snapchat"
                     style="filter: invert(56%) sepia(93%) saturate(474%) hue-rotate(17deg) brightness(92%) contrast(88%);" />
              </a>`
            : ""
        }
        ${
          SOCIALS.tiktok
            ? `<a href="${SOCIALS.tiktok}" style="text-decoration:none;margin:0 6px;display:inline-block;">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg"
                     width="20" height="20" alt="TikTok"
                     style="filter: invert(56%) sepia(93%) saturate(474%) hue-rotate(17deg) brightness(92%) contrast(88%);" />
              </a>`
            : ""
        }
      </div>
    </div>
  `;
}

// layout table-based compatible Gmail/Outlook
function emailLayout({ title, intro, contentHtml, footerNote }) {
  return `
  <!doctype html>
  <html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width" />
    <title>${BRAND_NAME}</title>
  </head>
  <body style="margin:0;background:${BRAND_BG};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BRAND_BG};padding:32px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,.08);">
            <tr>
              <td style="background:${BRAND_COLOR};padding:18px 24px;" align="left">
                <img src="${BRAND_LOGO}" height="40" alt="${BRAND_NAME}" style="display:block;border:0;outline:none;">
              </td>
            </tr>

            <tr>
              <td style="padding:28px 24px 8px 24px;font-family:Segoe UI,Arial,sans-serif;color:${BRAND_TEXT}">
                <h1 style="margin:0 0 6px 0;font-size:22px;line-height:1.35;">${title}</h1>
                ${
                  intro
                    ? `<p style="margin:0 0 8px 0;color:${BRAND_MUTED};font-size:14px;line-height:1.6;">${intro}</p>`
                    : ``
                }
              </td>
            </tr>

            <tr>
              <td style="padding:0 24px 20px 24px;font-family:Segoe UI,Arial,sans-serif;color:${BRAND_TEXT};font-size:15px;line-height:1.65;">
                ${contentHtml}
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px 24px 24px;font-family:Segoe UI,Arial,sans-serif;font-size:12px;color:${BRAND_MUTED}">
                ${footerNote || ""}
                <p style="margin:8px 0 0 0;">© ${new Date().getFullYear()} ${BRAND_NAME}. Tous droits réservés.</p>
              </td>
            </tr>
          </table>

          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:600px;max-width:100%;margin-top:12px;">
            <tr>
              <td style="padding:16px 24px 24px 24px;font-family:Segoe UI,Arial,sans-serif;font-size:12px;color:${BRAND_MUTED}">
                ${socialsFooterHtml()}
                ${footerNote || ""}
                <p style="margin:8px 0 0 0;">© ${new Date().getFullYear()} ${BRAND_NAME}. Tous droits réservés.</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

// email client (confirmation)
function clientEmailHtml({ prestation, safeMessage, phone }) {
  const content = `
    <p>Bonjour,</p>
    <p>Nous avons bien reçu votre demande de devis pour la prestation <strong>${prestation}</strong>.</p>
    ${
      safeMessage
        ? `<div style="margin:14px 0;padding:12px 14px;border:1px solid #eee;border-radius:10px;background:#fafafa">
      <div style="color:${BRAND_MUTED};font-size:13px;margin-bottom:4px">Votre message :</div>
      <div style="white-space:pre-wrap">${safeMessage}</div>
    </div>`
        : ``
    }
    ${
      phone
        ? `<p>Nous vous recontacterons au <strong>${phone}</strong>.</p>`
        : ``
    }
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:10px">
      <tr>
        <td>
          <a href="mailto:${OWNER_EMAIL}"
             style="display:inline-block;background:${BRAND_COLOR};color:#fff;text-decoration:none;border-radius:999px;padding:10px 16px;font-weight:600">
            Répondre à ${BRAND_NAME}
          </a>
        </td>
      </tr>
    </table>
    <p style="margin-top:16px;color:${BRAND_MUTED};font-size:13px">À très bientôt,<br><strong>${BRAND_NAME}</strong></p>
  `;
  return emailLayout({
    title: "Votre demande de devis a bien été envoyée ✨",
    intro: "Merci pour votre confiance.",
    contentHtml: content,
    footerNote: `<em>Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</em>`,
  });
}

// email admin (notification)
function adminEmailHtml({ email, prestation, safeMessage, phone, devisId }) {
  const content = `
    <p>Nouvelle demande de devis reçue.</p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;font-size:14px">
      <tr>
        <td style="padding:8px;border:1px solid #eee;background:#fafafa;width:160px">Email</td>
        <td style="padding:8px;border:1px solid #eee">${email}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #eee;background:#fafafa">Téléphone</td>
        <td style="padding:8px;border:1px solid #eee">${
          phone || "Non renseigné"
        }</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #eee;background:#fafafa">Prestation</td>
        <td style="padding:8px;border:1px solid #eee"><strong>${prestation}</strong></td>
      </tr>
      ${
        devisId
          ? `
      <tr>
        <td style="padding:8px;border:1px solid #eee;background:#fafafa">ID Strapi</td>
        <td style="padding:8px;border:1px solid #eee">${devisId}</td>
      </tr>`
          : ``
      }
    </table>

    ${
      safeMessage
        ? `
      <div style="margin-top:14px;padding:12px 14px;border:1px dashed ${BRAND_COLOR};border-radius:10px;background:#fffdf6">
        <div style="color:${BRAND_MUTED};font-size:13px;margin-bottom:4px">Message du client :</div>
        <div style="white-space:pre-wrap">${safeMessage}</div>
      </div>`
        : ``
    }

    <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top:14px">
      <tr>
        <td>
          <a href="mailto:${email}"
             style="display:inline-block;background:${BRAND_COLOR};color:#fff;text-decoration:none;border-radius:999px;padding:10px 16px;font-weight:600">
            Répondre au client
          </a>
        </td>
      </tr>
    </table>
  `;
  return emailLayout({
    title: "Nouvelle demande de devis",
    intro: "Résumé des informations saisies par le client.",
    contentHtml: content,
    footerNote: `<em>Ce message est destiné à l’équipe ${BRAND_NAME}.</em>`,
  });
}

/* ================== TRANSPORTER SMTP ================== */
const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

/* ================== HANDLER ================== */
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

    // Sanitize + limite de taille côté serveur
    const safeMessage = sanitizeInput(message || "").slice(0, 1000);

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
            message: safeMessage, // ✅ on stocke la version nettoyée
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

    // 2) Envoi des emails (brandés)
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
            subject: `Nouvelle demande de devis — ${prestation}`,
            html: adminEmailHtml({
              email,
              prestation,
              safeMessage,
              phone,
              devisId,
            }),
          }),
          transporter.sendMail({
            from: FROM_EMAIL,
            to: email,
            subject: "Confirmation de votre demande — D&D Prime",
            html: clientEmailHtml({
              prestation,
              safeMessage,
              phone,
            }),
          }),
        ]);
      } catch (err) {
        console.error("Erreur envoi email:", err);
        emailErrors = "Erreur lors de l'envoi des emails.";
      }
    }

    // 3) Réponse
    return NextResponse.json(
      { ok: true, id: devisId, emailStatus: emailErrors ? "partial" : "ok" },
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
