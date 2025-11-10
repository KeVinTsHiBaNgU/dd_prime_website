// app/wedding-planner/page.js
export default function WeddingPlannerPage() {
  return (
    <section className="prestations section" id="wedding">
      <h2 className="section__title">Wedding planner</h2>
      <span className="section__subtitle">
        Un accompagnement complet pour le plus beau jour de votre vie
      </span>

      <div className="prestations__container container">
        {/* Organisation complète */}
        <div className="prestation__card">
          <div className="prestation__icon">💍</div>
          <h3 className="prestation__title">Organisation complète</h3>
          <p className="prestation__description">
            De la première idée jusqu&apos;au dernier invité, nous orchestrons
            chaque détail pour un mariage fluide et serein.
          </p>
          <ul className="prestation__list">
            <li>Accompagnement de A à Z</li>
            <li>Recherche et gestion des prestataires</li>
            <li>Construction du budget et du planning</li>
            <li>Suivi jusqu&apos;au jour J</li>
          </ul>
        </div>

        {/* Coordination jour J */}
        <div className="prestation__card">
          <div className="prestation__icon">📅</div>
          <h3 className="prestation__title">Coordination du jour J</h3>
          <p className="prestation__description">
            Profitez pleinement de votre journée, nous gérons le timing,
            les prestataires et les imprévus en coulisses.
          </p>
          <ul className="prestation__list">
            <li>Présence le jour J</li>
            <li>Gestion des prestataires</li>
            <li>Respect du planning</li>
            <li>Accueil et orientation des invités</li>
          </ul>
        </div>

        {/* Décoration de mariage */}
        <div className="prestation__card">
          <div className="prestation__icon">🌸</div>
          <h3 className="prestation__title">Décoration de mariage</h3>
          <p className="prestation__description">
            Une scénographie complète : cérémonie, cocktail, salle, tables,
            coin photo, détails floraux et lumineux.
          </p>
          <ul className="prestation__list">
            <li>Scénographie personnalisée</li>
            <li>Décoration de la cérémonie</li>
            <li>Décoration de la salle &amp; des tables</li>
            <li>Coin photo &amp; détails déco</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
