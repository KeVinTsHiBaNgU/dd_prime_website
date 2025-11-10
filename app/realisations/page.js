// app/realisations/page.js
export default function RealisationsPage() {
  return (
    <section className="realisations section" id="realisations">
      <h2 className="section__title">Réalisations</h2>
      <span className="section__subtitle">
        Quelques-unes de nos créations les plus marquantes
      </span>

      <div className="realisations__container container">
        {/* Projet 1 */}
        <div className="project-card">
          <img
            src="/assets/img/galerie/galerie1.jpg"
            alt="Mariage bohème chic"
            className="project-img"
          />
          <div className="project-content">
            <h3 className="project-title">Mariage Bohème - Lyon</h3>
            <p className="project-description">
              Un mariage champêtre avec des tons beige, des fleurs séchées et une
              ambiance chaleureuse en plein air.
            </p>
            <p className="project-details">
              Lieu : Domaine des Cèdres | Juin 2025
            </p>
            <blockquote className="project-quote">
              &quot;Merci D&amp;D Prime, vous avez sublimé notre journée !&quot;
            </blockquote>
          </div>
        </div>

        {/* Projet 2 */}
        <div className="project-card">
          <img
            src="/assets/img/galerie/galerie2.jpg"
            alt="Anniversaire Jungle"
            className="project-img"
          />
          <div className="project-content">
            <h3 className="project-title">Anniversaire Jungle</h3>
            <p className="project-description">
              Une fête d&apos;anniversaire pour enfant aux couleurs tropicales,
              avec des décors de lianes, feuilles exotiques et ballons.
            </p>
            <p className="project-details">Lieu : Montpellier | Mai 2025</p>
            <blockquote className="project-quote">
              &quot;Mon fils était aux anges ! Une jungle en vrai !&quot;
            </blockquote>
          </div>
        </div>

        {/* Projet 3 */}
        <div className="project-card">
          <img
            src="/assets/img/galerie/galerie3.jpg"
            alt="Décoration Intérieure"
            className="project-img"
          />
          <div className="project-content">
            <h3 className="project-title">Rénovation Salon Scandinave</h3>
            <p className="project-description">
              Refonte d&apos;un espace de vie avec un design épuré, du mobilier
              clair et une ambiance lumineuse et moderne.
            </p>
            <p className="project-details">Lieu : Toulouse | Mars 2025</p>
            <blockquote className="project-quote">
              &quot;Un vrai cocon, je m&apos;y sens tellement bien maintenant !&quot;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
