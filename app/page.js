// app/page.js
import Link from "next/link";
import { getWhySection, getHomePage } from "@/lib/cms";
import Reveal from "@/components/Reveal";

export default async function HomePage() {
  const why = await getWhySection();
  const {
    title,
    subtitle,
    buttons,
    backgrounds,
    aboutTitle,
    aboutSubtitle,
    aboutDescription,
    highlights,
    aboutImages,
  } = await getHomePage();

  return (
    <>
      {/* SECTION ACCUEIL */}
      <section className="home section" id="home">
        {/* Fond avec images qui se succèdent en fondu */}
        <div className="home__bg-fade">
          {backgrounds.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Décor ${i + 1}`}
              className={`home__bg-image home__bg-image--${i + 1}`}
              style={{ animationDelay: `${i * 6}s` }} // 6s par image si tu veux lisser
            />
          ))}
        </div>

        <div className="container home__container">
          <div className="home__content">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div className="home__buttons">
              {buttons.map((btn) => (
                <Link
                  key={btn.id}
                  href={btn.url}
                  className="home__btn home__btn--outline"
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION A PROPOS SUR LA MÊME PAGE */}
      <section className="about section" id="about">
        <div className="container about__container">
          <div className="about__image-wrapper">
            <div className="about__slider">
              <div className="about__slide-track">
                {aboutImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Décoratrice ${i + 1}`}
                    className="about__image"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="about__content">
            <h2 className="section__title about__title">{aboutTitle}</h2>
            <span className="section__subtitle about__subtitle">
              {aboutSubtitle}
            </span>

            <p className="about__description">{aboutDescription}</p>

            <div className="about__highlights">
              {highlights.map((h) => (
                <div key={h.id} className="about__highlight">
                  {h.icon} {h.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION POURQUOI NOUS CHOISIR - version dynamique */}
      <section className="why section" id="why-us">
        <div className="container">
          <Reveal>
            <h2 className="section__title">{why.sectionTitle}</h2>
          </Reveal>
          <Reveal delay={0.2}>
            {why.sectionSubtitle && (
              <span className="section__subtitle">{why.sectionSubtitle}</span>
            )}
          </Reveal>

          <div className="why__container">
            {why.items.length === 0 && (
              <p style={{ textAlign: "center", width: "100%" }}>
                (Aucun argument configuré pour l’instant dans Strapi.)
              </p>
            )}

            {why.items.map((item) => (
              <article className="why__card" key={item.id}>
                {/* Icône : soit emoji, soit classe d’icône Unicons */}
                {item.icon && item.icon.startsWith("uil ") ? (
                  <i className={`why__icon ${item.icon}`}></i>
                ) : item.icon ? (
                  <span className="why__icon">{item.icon}</span>
                ) : null}

                <h3 className="why__title">{item.title}</h3>
                {item.description && (
                  <p className="why__description">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
