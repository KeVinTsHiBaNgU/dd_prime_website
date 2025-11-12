// app/decoration-evenementielle/page.js
import { getEventConfig, getEventPrestations } from "@/lib/cms";
import SliderWithLightbox from "@/components/SliderWithLightbox";

export const dynamic = "force-dynamic"; // pour voir tout de suite les changements du CMS

export default async function DecorationEvenementiellePage() {
  const [{ sectionTitle, sectionSubtitle, sliderImages }, prestations] =
    await Promise.all([getEventConfig(), getEventPrestations()]);

  return (
    <section className="prestations section" id="evenementiel">
      <h2 className="section__title">{sectionTitle}</h2>
      {sectionSubtitle && (
        <span className="section__subtitle">{sectionSubtitle}</span>
      )}

      <div className="prestations__container container">
        {prestations.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            (Aucune prestation trouvée – vérifie que tes contenus Strapi sont
            bien publiés et que l’API est accessible.)
          </p>
        )}

        {prestations.map((presta) => (
          <article className="prestation__card" key={presta.id}>
            {presta.icon && (
              <div className="prestation__icon">{presta.icon}</div>
            )}

            <h3 className="prestation__title">{presta.title}</h3>

            {presta.description && (
              <p className="prestation__description">{presta.description}</p>
            )}

            {presta.bullets && (
              <ul className="prestation__list">
                {presta.bullets
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
              </ul>
            )}

            {/* 👇 Prix "à partir de ..." */}
            {presta.priceFrom != null && (
              <div className="prestation__price">
                à partir de {presta.priceFrom} €
              </div>
            )}
          </article>
        ))}
      </div>

      {/* 👇 Slider d’images en bas (défilement infini) */}
      {sliderImages.length > 0 && (
        <div className="wp__slider-wrapper">
          <SliderWithLightbox images={sliderImages} />
        </div>
      )}
    </section>
  );
}
