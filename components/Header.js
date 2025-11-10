// components/Header.js
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo">
          D&amp;D <h4>Prime</h4>
        </Link>

        <div className={`nav__menu ${open ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            <li>
              <Link
                href="/#home"
                className="nav__link"
                onClick={() => setOpen(false)}
              >
                Accueil
              </Link>
            </li>

            <li>
              <Link
                href="/decoration-interieur"
                className="nav__link"
                onClick={() => setOpen(false)}
              >
                Décoration d&apos;intérieur
              </Link>
            </li>

            <li>
              <Link
                href="/decoration-evenementielle"
                className="nav__link"
                onClick={() => setOpen(false)}
              >
                Décoration événementielle
              </Link>
            </li>

            <li>
              <Link
                href="/wedding-planner"
                className="nav__link"
                onClick={() => setOpen(false)}
              >
                Wedding planner
              </Link>
            </li>

            <li>
              <Link
                href="/realisations"
                className="nav__link"
                onClick={() => setOpen(false)}
              >
                Réalisations
              </Link>
            </li>

            <li>
              <Link
                href="/devis"
                className="nav__link"
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
