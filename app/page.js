// app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* SECTION ACCUEIL */}
      <section className="home section" id="home">
        <div className="container home__container">
          <div className="home__content">
            <h1>D&amp;D Prime</h1>
            <p>
              Décoration d&apos;intérieur &amp; événementiel sur-mesure
              pour créer des moments inoubliables.
            </p>
            <div className="home__buttons">
              <Link href="/decoration-interieur" className="home__btn home__btn--outline">
                Décoration d&apos;intérieur
              </Link>
              <Link href="/decoration-evenementielle" className="home__btn home__btn--outline">
                Décoration événementielle
              </Link>
              <Link href="/wedding-planner" className="home__btn home__btn--outline">
                Wedding &amp; planner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION A PROPOS SUR LA MÊME PAGE */}
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
            <h2 className="section__title about__title">
              À propos de D&amp;D Prime
            </h2>
            <span className="section__subtitle about__subtitle">
              Votre décoratrice et organisatrice d&apos;événements
            </span>

            <p className="about__description">
              D&amp;D Prime est née de la passion pour la décoration élégante
              et les événements inoubliables. Nous transformons vos idées en
              réalité, que ce soit pour sublimer un intérieur ou organiser le
              plus beau jour de votre vie.
            </p>

            <div className="about__highlights">
              <div className="about__highlight">🎉 +50 événements réalisés</div>
              <div className="about__highlight">🏠 Décoration intérieure personnalisée</div>
              <div className="about__highlight">✨ Créativité &amp; professionnalisme</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
