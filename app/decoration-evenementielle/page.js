// app/decoration-evenementielle/page.js
export default function DecorationEvenementiellePage() {
  return (
    <section className="prestations section" id="evenementiel">
      <h2 className="section__title">Décoration événementielle</h2>
      <span className="section__subtitle">
        Des décors sur-mesure pour tous vos événements
      </span>

      <div className="prestations__container container">
        {/* Événements privés */}
        <div className="prestation__card">
          <div className="prestation__icon">🎉</div>
          <h3 className="prestation__title">Événements privés</h3>
          <p className="prestation__description">
            Anniversaires, baby showers, fiançailles, soirées à thème…
            Nous créons une ambiance unique pour chaque occasion.
          </p>
          <ul className="prestation__list">
            <li>Scénographie globale</li>
            <li>Décoration de table &amp; de salle</li>
            <li>Coin photo / backdrop</li>
            <li>Personnalisation selon votre thème</li>
          </ul>
        </div>

        {/* Événements d'entreprise */}
        <div className="prestation__card">
          <div className="prestation__icon">🏢</div>
          <h3 className="prestation__title">Événementiel d&apos;entreprise</h3>
          <p className="prestation__description">
            Séminaires, inaugurations, soirées d&apos;entreprise…
            Une décoration professionnelle et chaleureuse pour marquer les esprits.
          </p>
          <ul className="prestation__list">
            <li>Mise en valeur de votre image</li>
            <li>Décors adaptés au lieu</li>
            <li>Ambiances sur-mesure</li>
            <li>Coordination de la décoration le jour J</li>
          </ul>
        </div>

        {/* Ballon Designer */}
        <div className="prestation__card">
          <div className="prestation__icon">🎈</div>
          <h3 className="prestation__title">Ballon designer</h3>
          <p className="prestation__description">
            Des créations originales en ballons pour émerveiller vos invités
            et sublimer vos événements.
          </p>
          <ul className="prestation__list">
            <li>Arches et colonnes</li>
            <li>Murs décoratifs</li>
            <li>Thèmes enfants &amp; adultes</li>
            <li>Personnalisations sur demande</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
