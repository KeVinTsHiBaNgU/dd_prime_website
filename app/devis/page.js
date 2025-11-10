// app/devis/page.js
"use client";

import { useState } from "react";

const prestationsOptions = [
  { value: "", label: "Sélectionnez une prestation" },
  { value: "interieur", label: "Décoration d'intérieur" },
  { value: "evenementielle", label: "Décoration événementielle" },
  { value: "wedding", label: "Wedding planner" },
  { value: "autre", label: "Autre / Sur-mesure" },
];

export default function DevisPage() {
  const [prestation, setPrestation] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  return (
    <section className="devis section" id="devis">
      <div className="container devis__container">
        <div className="devis__intro">
          <h2 className="section__title">Demander un devis</h2>
          <span className="section__subtitle">
            Parlez-nous de votre projet, nous reviendrons vers vous avec une
            proposition personnalisée.
          </span>

          <p className="devis__text">
            Que ce soit pour une décoration d&apos;intérieur, un événement privé
            ou votre mariage, nous vous accompagnons du premier échange
            jusqu&apos;au jour J.
          </p>

          <ul className="devis__highlights">
            <li>💌 Réponse sous 48h</li>
            <li>📍 Basé à Montpellier et alentours</li>
            <li>🎉 Prestations sur-mesure selon votre budget</li>
          </ul>
        </div>

        <div className="devis__form-wrapper">
          <form
            className="devis__form"
            onSubmit={(e) => {
              e.preventDefault();
              // ici tu pourras ajouter l'envoi réel plus tard
            }}
          >
            {/* Email */}
            <div className="devis__field">
              <label htmlFor="email" className="devis__label">
                Votre email *
              </label>
              <input
                type="email"
                id="email"
                className="devis__input"
                placeholder="exemple@adresse.com"
                required
              />
            </div>

            {/* Type de prestation - CUSTOM SELECT */}
            <div className="devis__field">
              <label className="devis__label">
                Type de prestation *
              </label>

              <div
                className={`custom-select ${openSelect ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="custom-select__button"
                  onClick={() => setOpenSelect((o) => !o)}
                >
                  <span>
                    {
                      prestationsOptions.find(
                        (opt) => opt.value === prestation
                      )?.label || "Sélectionnez une prestation"
                    }
                  </span>
                  <i className="uil uil-angle-down"></i>
                </button>

                {openSelect && (
                  <ul className="custom-select__list">
                    {prestationsOptions.map((opt) => (
                      <li
                        key={opt.value || "default"}
                        className={`custom-select__option ${
                          opt.value === prestation ? "is-selected" : ""
                        }`}
                        onClick={() => {
                          setPrestation(opt.value);
                          setOpenSelect(false);
                        }}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}

                {/* valeur réelle envoyée dans le formulaire */}
                <input
                  type="hidden"
                  name="prestation"
                  value={prestation}
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="devis__field">
              <label htmlFor="message" className="devis__label">
                Votre message
              </label>
              <textarea
                id="message"
                className="devis__textarea"
                rows="5"
                placeholder="Parlez-nous de votre projet : date, lieu, nombre d'invités, style souhaité..."
              ></textarea>
            </div>

            <button type="submit" className="devis__submit">
              Envoyer ma demande
            </button>
          </form>

          {/* Bouton d’appel direct */}
          <div className="devis__call">
            <a href="tel:+33612345678" className="devis__call-btn">
              <i className="uil uil-phone"></i>
              Appeler maintenant
            </a>
          </div>

          {/* Réseaux sociaux */}
          <div className="devis__socials">
            <p className="devis__socials-title">
              Suivez &amp; contactez D&amp;D Prime :
            </p>
            <div className="devis__socials-list">
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="devis__social-link"
              >
                <i className="uil uil-instagram"></i>
                <span>@ddprime_interior_event</span>
              </a>

              <a href="#" className="devis__social-link">
                <i className="uil uil-snapchat-ghost"></i>
                <span>@ddprime_snap</span>
              </a>

              <a href="#" className="devis__social-link">
                <i className="uil uil-music-note"></i>
                <span>@ddprime_tiktok</span>
              </a>

              <a href="tel:+33612345678" className="devis__social-link">
                <i className="uil uil-phone"></i>
                <span>+33 6 12 34 56 78</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
