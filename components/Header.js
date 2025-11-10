// components/Header.js
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getHeaderData } from "@/lib/cms";

const defaultNavItems = [
  { id: "local-1", label: "Accueil", href: "/#home", order: 1 },
  {
    id: "local-2",
    label: "Décoration d'intérieur",
    href: "/decoration-interieur",
    order: 2,
  },
  {
    id: "local-3",
    label: "Décoration événementielle",
    href: "/decoration-evenementielle",
    order: 3,
  },
  {
    id: "local-4",
    label: "Wedding planner",
    href: "/wedding-planner",
    order: 4,
  },
  {
    id: "local-5",
    label: "Réalisations",
    href: "/realisations",
    order: 5,
  },
  { id: "local-6", label: "Devis", href: "/devis", order: 6 },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const [brand, setBrand] = useState({ line1: "D&D", line2: "Prime" });
  const [navItems, setNavItems] = useState(defaultNavItems);

  useEffect(() => {
    async function loadHeader() {
      try {
        const data = await getHeaderData();

        if (data?.brand) {
          setBrand({
            line1: data.brand.line1 || "D&D",
            line2: data.brand.line2 || "Prime",
          });
        }

        // ⚠️ On ne remplace le menu QUE si on a vraiment des éléments
        if (Array.isArray(data?.navItems) && data.navItems.length > 0) {
          setNavItems(data.navItems);
        }
      } catch (error) {
        console.error("Erreur chargement header CMS :", error);
        // on garde les valeurs par défaut
      }
    }

    loadHeader();
  }, []);

  const linkClass = (href) => {
    const cleanHref = (href || "/").split("#")[0] || "/";
    return `nav__link ${cleanHref === pathname ? "active-link" : ""}`;
  };

  return (
    <header className="header" id="header">
      <nav className="nav container">
        <Link href="/" className="nav__logo" onClick={() => setOpen(false)}>
          {brand.line1} <h5>{brand.line2}</h5>
        </Link>

        <div className={`nav__menu ${open ? "show-menu" : ""}`} id="nav-menu">
          <ul className="nav__list">
            {navItems
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={linkClass(item.href)}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>

          <span className="nav__close" onClick={() => setOpen(false)}>
            &times;
          </span>
        </div>

        <div className="nav__toggle" onClick={() => setOpen(!open)}>
          <i className="uil uil-apps"></i>
        </div>
      </nav>
    </header>
  );
}
