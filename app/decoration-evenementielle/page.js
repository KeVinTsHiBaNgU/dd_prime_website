// app/decoration-evenementielle/page.js
import { getEventPrestations } from "@/lib/cms";

export const dynamic = "force-dynamic"; // pour voir tout de suite les changements du CMS

export default async function DecorationEvenementiellePage() {
  let prestations = [];

  try {
    prestations = await getEventPrestations();
  } catch (e) {
    console.error(e);
  }

  return (
    <section className="prestations section" id="evenementiel">
      <h2 className="section__title">Décoration événementielle</h2>
      <span className="section__subtitle">
        Des décors sur-mesure pour tous vos événements
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
