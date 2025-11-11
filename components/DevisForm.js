// components/DevisForm.js
"use client";

import { useState } from "react";

const prestationsOptions = [
  { value: "", label: "Sélectionnez une prestation" },
  { value: "interieur", label: "Décoration d'intérieur" },
  { value: "evenementielle", label: "Décoration événementielle" },
  { value: "wedding", label: "Wedding planner" },
  { value: "autre", label: "Autre / Sur-mesure" },
];

export default function DevisForm({ content }) {
  const [prestation, setPrestation] = useState("");
  const [openSelect, setOpenSelect] = useState(false);

  const email = content.email || "contact@ddprime.fr";
  const emailExemple = content.emailExemple || "exemple@adresse.com";
  const phone = content.phone || "+33 6 12 34 56 78";

  return (
    <section className="devis section" id="devis">
      <div className="container devis__container">
        <div className="devis__intro">
          <h2 className="section__title">{content.sectionTitle}</h2>

          {content.sectionSubtitle && (
            <span className="section__subtitle">{content.sectionSubtitle}</span>
          )}

          {content.introText && (
            <p className="devis__text">{content.introText}</p>
          )}

          {content.bullets?.length > 0 && (
            <ul className="devis__highlights">
              {content.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="devis__form-wrapper">
          <form
            className="devis__form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!prestation) {
                alert(
                  "Veuillez sélectionner une prestation avant d’envoyer le formulaire."
                );
                return;
              }
              // ici tu pourras brancher un vrai envoi plus tard
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
                placeholder={emailExemple}
                required
              />
            </div>

            {/* Type de prestation - custom select */}
            <div className="devis__field">
              <label className="devis__label">Type de prestation *</label>

              <div className={`custom-select ${openSelect ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="custom-select__button"
                  onClick={() => setOpenSelect((o) => !o)}
                >
                  <span>
                    {prestation
                      ? prestationsOptions.find(
                          (opt) => opt.value === prestation
                        )?.label
                      : "Sélectionnez une prestation"}
                  </span>
                  <i
                    className={`uil ${
                      openSelect ? "uil-angle-up" : "uil-angle-down"
                    }`}
                  />
                </button>

                {openSelect && (
                  <ul className="custom-select__list">
                    {prestationsOptions
                      // on enlève l’option vide du rendu
                      .filter((opt) => opt.value !== "")
                      .map((opt) => (
                        <li
                          key={opt.value}
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

                {/* valeur réelle envoyée avec le formulaire */}
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
                rows={5}
                placeholder="Parlez-nous de votre projet : date, lieu, nombre d'invités, style souhaité..."
              />
            </div>

            <button type="submit" className="devis__submit">
              Envoyer ma demande
            </button>
          </form>

          {/* Contacts & réseaux */}
          {/* <div className="devis__socials">
            <p className="devis__socials-title">{content.contactTitle}</p>
            <div className="devis__socials-list">
              {phone && (
                <a href={`tel:${phone}`} className="devis__social-link">
                  <i className="uil uil-phone" />
                  <span>{phone}</span>
                </a>
              )}

              {email && (
                <a href={`mailto:${email}`} className="devis__social-link">
                  <i className="uil uil-envelope" />
                  <span>{email}</span>
                </a>
              )}

              {content.instagram && (
                <div className="devis__social-link">
                  <i className="uil uil-instagram" />
                  <span>{content.instagram}</span>
                </div>
              )}

              {content.snapchat && (
                <div className="devis__social-link">
                  <i className="uil uil-snapchat-ghost" />
                  <span>{content.snapchat}</span>
                </div>
              )}

              {content.tiktok && (
                <div className="devis__social-link">
                  <i className="uil uil-music-note" />
                  <span>{content.tiktok}</span>
                </div>
              )}
            </div>
          </div> */}

          {/* Bouton Appeler maintenant */}
          <div className="devis__call">
            {phone && (
              <a href={`tel:${phone}`} className="devis__call-btn">
                <i className="uil uil-phone" />
                {content.callButtonLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
