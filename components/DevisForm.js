"use client";

import { useState } from "react";
import Swal from "sweetalert2"; // ✅ import du pop-up stylé
import DOMPurify from "dompurify";
import FadeIn from "@/components/motion/FadeIn";
import ZoomIn from "@/components/motion/ZoomIn";
import FadeRight from "@/components/motion/FadeRight";
import Reveal from "@/components/Reveal";

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

  const emailExemple = content.emailExemple || "exemple@adresse.com";
  const phone = content.phone || "+33 6 12 34 56 78";

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget; // ✅ on garde une référence avant tout

    if (!prestation) {
      Swal.fire({
        icon: "warning",
        title: "Attention",
        text: "Veuillez sélectionner une prestation avant d’envoyer le formulaire.",
        confirmButtonColor: "#d9a441",
      });
      return;
    }

    const formData = new FormData(form);
    const firstName = (formData.get("firstName") || "").toString().trim();
    const lastName = (formData.get("lastName") || "").toString().trim();
    const emailValue = formData.get("email");
    const phone = formData.get("phone");
    const rawMessage = formData.get("message");
    const messageValue = DOMPurify.sanitize(rawMessage, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
    const prestationValue = formData.get("prestation");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: emailValue,
          phone: phone,
          prestation: prestationValue,
          message: messageValue,
        }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) {
        throw new Error("Erreur lors de l’envoi du devis");
      }

      // await Swal.fire({
      //   icon: "success",
      //   title: "Demande envoyée 🎉",
      //   text: "Votre demande de devis a bien été enregistrée. Nous vous répondrons rapidement.",
      //   confirmButtonColor: "#d9a441",
      // });

      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Demande envoyée 🎉",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

      form.reset(); // ✅ on utilise la référence locale
      setPrestation(""); // ✅ on réinitialise le select
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oups !",
        text: "Une erreur est survenue lors de l’envoi. Veuillez réessayer plus tard.",
        confirmButtonColor: "#d9a441",
      });
    }
  }

  return (
    <section className="devis section" id="devis">
      <div className="container devis__container">
        <div className="devis__intro">
          <FadeIn>
            <h2 className="section__title">{content.sectionTitle}</h2>
          </FadeIn>

          <Reveal>
            {content.sectionSubtitle && (
              <span className="section__subtitle">
                {content.sectionSubtitle}
              </span>
            )}
          </Reveal>

          <ZoomIn>
            {content.introText && (
              <p className="devis__text">{content.introText}</p>
            )}
          </ZoomIn>

          <FadeRight>
            {content.bullets?.length > 0 && (
              <ul className="devis__highlights">
                {content.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </FadeRight>
        </div>

        <div className="devis__form-wrapper">
          <form className="devis__form" onSubmit={handleSubmit}>
            <div className="devis__field">
              <label htmlFor="firstName" className="devis__label">
                Votre prénom *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="devis__input"
                placeholder="Marie"
                required
              />
            </div>

            <div className="devis__field">
              <label htmlFor="lastName" className="devis__label">
                Votre nom *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="devis__input"
                placeholder="Dupont"
                required
              />
            </div>

            {/* Email */}
            <div className="devis__field">
              <label htmlFor="email" className="devis__label">
                Votre email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="devis__input"
                placeholder={emailExemple}
                required
              />
            </div>

            {/* Téléphone */}
            <div className="devis__field">
              <label htmlFor="phone" className="devis__label">
                Votre numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="devis__input"
                placeholder="+33 6 12 34 56 78"
                // pattern="^\\+33\\s?0?[67](\\s?\\d{2}){4}$|^\\+33[67]\\d{8}$"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>

            {/* Type de prestation */}
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
                name="message"
                className="devis__textarea"
                rows={5}
                placeholder="Parlez-nous de votre projet : date, lieu, nombre d'invités, style souhaité..."
              />
            </div>

            <button type="submit" className="devis__submit">
              Envoyer ma demande
            </button>
          </form>

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
