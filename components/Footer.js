// components/Footer.js
import Link from "next/link";
import { getFooterData } from "@/lib/cms";

export default async function Footer() {
  const {
    tagline,
    locationText,
    phoneDisplay,
    phoneLink,
    emailDisplay,
    emailLink,
    instagramUrl,
    snapchatUrl,
    tiktokUrl,
    copyrightText,
    creditText,
  } = await getFooterData();

  return (
    <footer className="footer">
      <div className="container footer__container">
        {/* Colonne 1 : Marque */}
        <div className="footer__col footer__brand">
          <h3 className="footer__logo">
            D&amp;D <span>Prime</span>
          </h3>
          <p className="footer__tagline">{tagline}</p>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div className="footer__col">
          <h4 className="footer__title">Navigation</h4>
          <ul className="footer__links">
            <li>
              <Link href="/#home">Accueil</Link>
            </li>
            <li>
              <Link href="/decoration-interieur">
                Décoration d&apos;intérieur
              </Link>
            </li>
            <li>
              <Link href="/decoration-evenementielle">
                Décoration événementielle
              </Link>
            </li>
            <li>
              <Link href="/wedding-planner">Wedding planner</Link>
            </li>
            <li>
              <Link href="/realisations">Réalisations</Link>
            </li>
            <li>
              <Link href="/devis">Devis</Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Contact & réseaux */}
        <div className="footer__col">
          <h4 className="footer__title">Contact</h4>
          <p className="footer__contact">{locationText}</p>

          {phoneDisplay && (
            <p className="footer__contact">
              📞 <a href={`tel:${phoneLink.replace(/\s/g, "")}`}>{phoneDisplay}</a>
            </p>
          )}

          {emailDisplay && (
            <p className="footer__contact">
              ✉️ <a href={`mailto:${emailLink}`}>{emailDisplay}</a>
            </p>
          )}

          <div className="footer__socials">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <i className="uil uil-instagram" />
              </a>
            )}

            {snapchatUrl && (
              <a
                href={snapchatUrl}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="Snapchat"
              >
                <i className="uil uil-snapchat-ghost" />
              </a>
            )}

            {tiktokUrl && (
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
                aria-label="TikTok"
              >
                <i className="uil uil-music-note" />
              </a>
            )}

            {emailLink && (
              <a
                href={`mailto:${emailLink}`}
                className="footer__social-link"
                aria-label="Email"
              >
                <i className="uil uil-envelope" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>{copyrightText}</p>
          <p className="footer__credit">{creditText}</p>
        </div>
      </div>
    </footer>
  );
}
