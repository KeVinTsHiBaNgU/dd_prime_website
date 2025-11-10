// app/decoration-interieur/page.js
export default function DecorationInterieurPage() {
  return (
    <section className="prestations section" id="prestations">
      <h2 className="section__title">Décoration d&apos;intérieur</h2>
      <span className="section__subtitle">
        Des services sur-mesure pour sublimer vos intérieurs
      </span>

      <div className="prestations__container container">
        {/* Bloc repris de prestations.html, adapté déco intérieure */}
        <div className="prestation__card">
          <div className="prestation__icon">🏡</div>
          <h3 className="prestation__title">Décoration d&apos;intérieur</h3>
          <p className="prestation__description">
            Créez un espace qui vous ressemble, harmonieux et fonctionnel. Nous
            vous accompagnons dans chaque étape.
          </p>
          <ul className="prestation__list">
            <li>Conseils personnalisés</li>
            <li>Coaching déco</li>
            <li>Home staging</li>
            <li>Projet clé en main</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
