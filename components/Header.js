// components/Header.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // petite fonction utilitaire pour appliquer la classe active
  const linkClass = (href) =>
    `nav__link ${pathname === href ? "active-link" : ""}`;

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo" onClick={() => setOpen(false)}>
          D&amp;D <h5>Prime</h5>
        </Link>

        <div className={`nav__menu ${open ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li>
              <Link
                href="/#home"
                className={linkClass("/")}
                onClick={() => setOpen(false)}
              >
                Accueil
              </Link>
            </li>

            <li>
              <Link
                href="/decoration-interieur"
                className={linkClass("/decoration-interieur")}
                onClick={() => setOpen(false)}
              >
                Décoration d&apos;intérieur
              </Link>
            </li>

            <li>
              <Link
                href="/decoration-evenementielle"
                className={linkClass("/decoration-evenementielle")}
                onClick={() => setOpen(false)}
              >
                Décoration événementielle
              </Link>
            </li>

            <li>
              <Link
                href="/wedding-planner"
                className={linkClass("/wedding-planner")}
                onClick={() => setOpen(false)}
              >
                Wedding planner
              </Link>
            </li>

            <li>
              <Link
                href="/realisations"
                className={linkClass("/realisations")}
                onClick={() => setOpen(false)}
              >
                Réalisations
              </Link>
            </li>

            <li>
              <Link
                href="/devis"
                className={linkClass("/devis")}
                onClick={() => setOpen(false)}
              >
                Devis
              </Link>
            </li>
          </ul>

          <span
            className="nav__close"
            id="nav-close"
            onClick={() => setOpen(false)}
          >
            &times;
          </span>
        </div>

        <div
          className="nav__toggle"
          id="nav-toggle"
          onClick={() => setOpen(!open)}
        >
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
}
