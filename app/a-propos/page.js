// app/a-propos/page.js
export default function AProposPage() {
  return (
    <section className="about section" id="about">
      <div className="container about__container">
        <div className="about__image-wrapper">
          <img
            src="/assets/img/about/profil.jpg"
            alt="Décoratrice"
            className="about__image"
          />
        </div>

        <div className="about__content">
          <h2 className="section__title about__title">À propos de D&amp;D Prime</h2>
          <span className="section__subtitle about__subtitle">
            Votre décoratrice et organisatrice d&apos;événements
          </span>

          <p className="about__description">
            D&amp;D Prime est née de la passion pour la décoration élégante et les
            événements inoubliables. Nous transformons vos idées en réalité, que
            ce soit pour sublimer un intérieur ou organiser le plus beau jour de
            votre vie.
          </p>

          <div className="about__highlights">
            <div className="about__highlight">🎉 +50 événements réalisés</div>
            <div className="about__highlight">🏠 Décoration intérieure personnalisée</div>
            <div className="about__highlight">✨ Créativité &amp; professionnalisme</div>
          </div>
        </div>
      </div>
    </section>
  );
}
