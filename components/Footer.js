// components/Footer.js
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__container">
        {/* Colonne 1 : Marque */}
        <div className="footer__col footer__brand">
          <h3 className="footer__logo">
            D&amp;D <span>Prime</span>
          </h3>
          <p className="footer__tagline">
            Décoration d&apos;intérieur &amp; événementielle sur-mesure,
            pour des moments élégants et inoubliables.
          </p>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div className="footer__col">
          <h4 className="footer__title">Navigation</h4>
          <ul className="footer__links">
            <li>
              <Link href="/#home">Accueil</Link>
            </li>
            <li>
              <Link href="/decoration-interieur">Décoration d&apos;intérieur</Link>
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
          <p className="footer__contact">
            Basée à Montpellier et alentours.  
            Disponible pour vos projets en Occitanie et au-delà.
          </p>
          <p className="footer__contact">
            📞 <a href="tel:+33612345678">+33 6 12 34 56 78</a>
          </p>
          <p className="footer__contact">
            ✉️ <a href="mailto:contact@ddprime.fr">contact@ddprime.fr</a>
          </p>

          <div className="footer__socials">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="footer__social-link"
            >
              <i className="uil uil-instagram" />
            </a>
            <a
              href="#"
              className="footer__social-link"
            >
              <i className="uil uil-snapchat-ghost" />
            </a>
            <a
              href="#"
              className="footer__social-link"
            >
              <i className="uil uil-music-note" />
            </a>
            <a
              href="mailto:contact@ddprime.fr"
              className="footer__social-link"
            >
              <i className="uil uil-envelope" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {currentYear} D&amp;D Prime. Tous droits réservés.</p>
          <p className="footer__credit">
            Design &amp; développement — Kevin TSHIBANGU.
          </p>
        </div>
      </div>
    </footer>
  );
}
