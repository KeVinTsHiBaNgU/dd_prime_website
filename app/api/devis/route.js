// app/api/devis/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

/* ===== ENV ===== */
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || "no-reply@ddprime.fr";
const OWNER_EMAIL = process.env.DEVIS_OWNER_EMAIL || "contact@ddprime.fr";
const EXTRA_FORM_URL = process.env.DEVIS_EXTRA_FORM_URL || null;

/* ===== BRANDING LUXE BEIGE/OR ===== */
const BRAND_NAME = "D&D Prime";
const BRAND_COLOR = "#d4b574";
const BRAND_COLOR_DARK = "#b8944c";
const BRAND_TEXT = "#2e2b26";
const BRAND_MUTED = "#7a746c";
const BRAND_BG = "#f8f5ef";
const BRAND_SOFT = "#fbf7f1";

const BRAND_LOGO =
  process.env.BRAND_LOGO_URL ||
  "https://dummyimage.com/160x50/d4b574/ffffff&text=D%26D+Prime";

/* ===== RESEAUX (CID) ===== */
const SOCIALS = {
  instagram:
    process.env.INSTAGRAM_URL || "https://instagram.com/ddprime_interior_event",
  snapchat:
    process.env.SNAPCHAT_URL ||
    "https://snapchat.com/add/ddprime_interior_event",
  tiktok:
    process.env.TIKTOK_URL || "https://tiktok.com/@ddprime_interior_event",
};

const socialIconsCID = [
  {
    filename: "instagram.png",
    path: `${process.cwd()}/public/assets/img/email/instagram.png`,
    cid: "icon-instagram",
  },
  {
    filename: "snapchat.png",
    path: `${process.cwd()}/public/assets/img/email/snapchat.png`,
    cid: "icon-snapchat",
  },
  {
    filename: "tiktok.png",
    path: `${process.cwd()}/public/assets/img/email/tiktok.png`,
    cid: "icon-tiktok",
  },
];

/* ===== HELPERS ===== */
function sanitizeInput(text = "") {
  return String(text)
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

function socialsFooterHtmlCID() {
  const filter =
    "filter: saturate(0) brightness(0) sepia(1) hue-rotate(345deg) saturate(5) brightness(0.95);";

  const icon = (href, cid, alt) =>
    href
      ? `
      <a href="${href}" style="text-decoration:none;margin:0 8px;display:inline-block;">
        <img src="cid:${cid}" width="22" alt="${alt}" style="${filter}border:0;">
      </a>`
      : "";

  return `
  <div style="text-align:center;margin-top:20px;">
    <p style="font-family:Segoe UI,Arial,sans-serif;color:${BRAND_MUTED};font-size:13px;margin-bottom:10px;">
      Suivez <strong>${BRAND_NAME}</strong> :
    </p>
    ${icon(SOCIALS.instagram, "icon-instagram", "Instagram")}
    ${icon(SOCIALS.snapchat, "icon-snapchat", "Snapchat")}
    ${icon(SOCIALS.tiktok, "icon-tiktok", "TikTok")}
  </div>`;
}

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

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND_BG};padding:32px 0;font-family:Segoe UI, Arial, sans-serif;">
      <tr>
        <td align="center">

          <!-- ===== CARD PRINCIPALE ===== -->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0"
            style="
              width:600px;
              max-width:100%;
              background:#ffffff;
              border-radius:20px;
              overflow:hidden;
              box-shadow:0 10px 32px rgba(0,0,0,0.08);
            "
          >

            <!-- ===== HEADER LUXE ===== -->
            <tr>
              <td
                style="
                  padding:24px 26px;
                  
                  background: linear-gradient(
                    135deg,
                    #f7f2e8 0%,
                    #f0e6d6 35%,
                    #e8dcc5 65%,
                    #e2d3b6 100%
                  );
                  border-bottom:1px solid rgba(170, 145, 100, 0.25);
                "
              >
                <table width="100%" role="presentation">
                  <tr>
                    <td align="left">
                      <img src="${BRAND_LOGO}"
                        height="48"
                        alt="${BRAND_NAME}"
                        style="display:block;border:0;"
                      >
                    </td>

                    <td align="right" style="text-align:right;">
                      <span
                        style="
                          display:inline-block;
                          padding:6px 14px;
                          border-radius:999px;
                          background:rgba(255, 255, 255, 0.6);
                          border:1px solid rgba(212,181,116,0.35);
                          color:${BRAND_COLOR_DARK};
                          font-size:12px;
                          font-weight:600;
                          backdrop-filter:blur(4px);
                        "
                      >
                        Interior • Event • Wedding
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- ===== TITRE ===== -->
            <tr>
              <td style="padding:30px 28px 10px;color:${BRAND_TEXT};">
                <h1
                  style="
                    margin:0;
                    font-size:22px;
                    font-weight:600;
                    line-height:1.35;
                  "
                >
                  ${title}
                </h1>

                ${
                  intro
                    ? `
                      <p
                        style="
                          margin:10px 0 0;
                          color:${BRAND_MUTED};
                          font-size:14px;
                          line-height:1.7;
                        "
                      >
                        ${intro}
                      </p>
                    `
                    : ""
                }

                <!-- Séparateur élégant -->
                <div
                  style="
                    margin-top:18px;
                    width:72px;
                    height:3px;
                    border-radius:2px;
                    background:linear-gradient(
                      to right,
                      ${BRAND_COLOR},
                      rgba(212,181,116,0.3)
                    );
                  "
                ></div>
              </td>
            </tr>

            <!-- ===== CONTENU ===== -->
            <tr>
              <td
                style="
                  padding:4px 28px 28px;
                  color:${BRAND_TEXT};
                  font-size:15px;
                  line-height:1.75;
                "
              >
                ${contentHtml}
              </td>
            </tr>

          </table>

          <!-- ===== FOOTER ===== -->
          <table role="presentation"
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="width:600px;max-width:100%;margin-top:16px;"
          >
            <tr>
              <td
                style="
                  padding:18px 24px 26px;
                  color:${BRAND_MUTED};
                  font-size:12px;
                  text-align:center;
                "
              >
                ${socialsFooterHtmlCID()}

                ${
                  footerNote
                    ? `<p style="margin:14px 0 0;font-style:italic;">${footerNote}</p>`
                    : ""
                }

                <p style="margin:10px 0 0;">© ${new Date().getFullYear()} ${BRAND_NAME}. Tous droits réservés.</p>
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

/* ===== EMAILS ===== */
function clientEmailHtml({ prestation, safeMessage, phone, firstName }) {
  const extraBlock = EXTRA_FORM_URL
    ? `
    <div style="margin-top:22px;padding:18px 20px;border-radius:18px;background:${BRAND_SOFT};border:1px solid #eadfcb;">
      <p style="margin:0 0 10px;color:${BRAND_MUTED};font-size:14px;">
        Pour nous permettre de vous proposer une réponse parfaitement adaptée,
        nous vous invitons à compléter quelques informations complémentaires.
      </p>
      <a href="${EXTRA_FORM_URL}" style="
        display:inline-block;
        margin-top:8px;
        background:linear-gradient(135deg, #d4b574, #b8944c);
        color:#fff;
        padding:10px 18px;
        border-radius:999px;
        text-decoration:none;
        font-weight:600;
        box-shadow:0 5px 20px rgba(212,181,116,0.35);
      ">
        Compléter mes informations
      </a>
    </div>`
    : "";

  const content = `
    <p>Bonjour <strong>${firstName || ""}</strong>,</p>

    <p>
      Nous vous remercions chaleureusement pour votre demande de devis concernant
      la prestation <strong>${prestation}</strong>.
      Nous reviendrons vers vous très prochainement.
    </p>

    ${
      safeMessage
        ? `
        <div style="margin:18px 0;padding:16px;border-radius:16px;background:${BRAND_SOFT};border:1px solid #eadfcb;">
          <div style="color:${BRAND_MUTED};font-size:13px;margin-bottom:6px;">Votre message :</div>
          <div style="white-space:pre-wrap;">${safeMessage}</div>
        </div>`
        : ""
    }

    ${
      phone
        ? `<p>Nous vous recontacterons très prochainement au <strong>${phone}</strong> ou par retour d’email pour vous proposer une réponse personnalisée.</p>`
        : `<p>Nous vous recontacterons très prochainement par retour d’email pour vous proposer une réponse personnalisée.</p>`
    }

    ${extraBlock}

    <p style="margin-top:20px;">
      Très belle journée à vous,<br/>
      <strong>${BRAND_NAME}</strong>
    </p>
  `;

  return emailLayout({
    title: "Votre demande de devis a bien été reçue ✨",
    intro: "Merci pour votre confiance.",
    contentHtml: content,
    footerNote:
      "<em>Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</em>",
  });
}

function adminEmailHtml({
  firstName,
  lastName,
  email,
  prestation,
  safeMessage,
  phone,
  devisId,
}) {
  const content = `
    <p><strong>Nouvelle demande de devis reçue.</strong></p>

    <table cellspacing="0" cellpadding="0" style="width:100%;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:8px;background:${BRAND_SOFT};border:1px solid #eadfcb;width:150px;">Prénom</td><td style="padding:8px;border:1px solid #eadfcb;">${firstName}</td></tr>
      <tr><td style="padding:8px;background:${BRAND_SOFT};border:1px solid #eadfcb;">Nom</td><td style="padding:8px;border:1px solid #eadfcb;">${lastName}</td></tr>
      <tr><td style="padding:8px;background:${BRAND_SOFT};border:1px solid #eadfcb;">Email</td><td style="padding:8px;border:1px solid #eadfcb;">${email}</td></tr>
      <tr><td style="padding:8px;background:${BRAND_SOFT};border:1px solid #eadfcb;">Téléphone</td><td style="padding:8px;border:1px solid #eadfcb;">${
    phone || "Non renseigné"
  }</td></tr>
      <tr><td style="padding:8px;background:${BRAND_SOFT};border:1px solid #eadfcb;">Prestation</td><td style="padding:8px;border:1px solid #eadfcb;"><strong>${prestation}</strong></td></tr>
      ${
        devisId
          ? `<tr><td style="padding:8px;background:${BRAND_SOFT};border:1px solid #eadfcb;">ID Strapi</td><td style="padding:8px;border:1px solid #eadfcb;">${devisId}</td></tr>`
          : ""
      }
    </table>

    ${
      safeMessage
        ? `
        <div style="margin-top:20px;padding:16px;border-radius:14px;background:${BRAND_SOFT};border:1px dashed ${BRAND_COLOR};">
          <div style="color:${BRAND_MUTED};font-size:13px;margin-bottom:6px;">Message du client :</div>
          <div style="white-space:pre-wrap;">${safeMessage}</div>
        </div>`
        : ""
    }
  `;

  return emailLayout({
    title: "Nouvelle demande de devis",
    intro: "Résumé des informations envoyées par le client.",
    contentHtml: content,
    footerNote: `<em>Ce message est destiné à l’équipe ${BRAND_NAME}.</em>`,
  });
}

/* ===== TRANSPORTER SMTP ===== */
const transporter =
  SMTP_HOST && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

/* ===== ROUTE POST ===== */
export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, prestation, message } =
      body || {};

    if (!firstName || !lastName || !email || !prestation) {
      return NextResponse.json(
        { error: "Nom, prénom, email et prestation sont obligatoires." },
        { status: 400 }
      );
    }

    const safeMessage = sanitizeInput(message || "").slice(0, 2000);

    // 1) Enregistrement Strapi
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
            firstName,
            lastName,
            email,
            phone,
            prestation,
            message: safeMessage,
          },
        }),
      });

      const json = await strapiRes.json();
      if (!strapiRes.ok) {
        console.error("Erreur Strapi:", strapiRes.status, json);
        return NextResponse.json(
          { error: "Erreur lors de l'enregistrement du devis." },
          { status: 500 }
        );
      }

      devisId = json?.data?.id || null;
    } catch (err) {
      console.error("Exception Strapi:", err);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement du devis." },
        { status: 500 }
      );
    }

    // 2) Emails (mais on ne casse pas tout si ça plante)
    let emailStatus = "skipped";

    if (!transporter) {
      console.warn("SMTP non configuré, emails non envoyés.");
      emailStatus = "not_configured";
    } else {
      try {
        await Promise.all([
          transporter.sendMail({
            from: FROM_EMAIL,
            to: OWNER_EMAIL,
            subject: `Nouvelle demande — ${prestation}`,
            html: adminEmailHtml({
              firstName,
              lastName,
              email,
              prestation,
              safeMessage,
              phone,
              devisId,
            }),
            attachments: socialIconsCID,
          }),
          transporter.sendMail({
            from: FROM_EMAIL,
            to: email,
            subject: "Votre demande à D&D Prime ✨",
            html: clientEmailHtml({
              prestation,
              safeMessage,
              phone,
              firstName,
            }),
            attachments: socialIconsCID,
          }),
        ]);
        emailStatus = "ok";
      } catch (err) {
        console.error("Erreur envoi email:", err);
        emailStatus = "error";
      }
    }

    return NextResponse.json(
      { ok: true, id: devisId, emailStatus },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erreur API /api/devis:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
