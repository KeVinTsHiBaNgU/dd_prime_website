// app/decoration-interieur/page.js
import { getInteriorPrestations } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function DecorationInterieurPage() {
  let prestations = [];

  try {
    prestations = await getInteriorPrestations();
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="prestations section" id="prestations">
      <h2 className="section__title">Décoration d&apos;intérieur</h2>
      <span className="section__subtitle">
        Des services sur-mesure pour sublimer vos intérieurs
      </span>

      <div className="prestations__container container">
        {prestations.length === 0 && (
          <p style={{ textAlign: "center", width: "100%" }}>
            (Aucune prestation trouvée – vérifie que tes contenus Strapi sont bien
            publiés et que l’API est accessible.)
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
          </article>
        ))}
      </div>
    </section>
  );
}