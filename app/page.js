// app/page.js
import Link from "next/link";
import { getWhySection, getHomePage } from "@/lib/cms";
import Reveal from "@/components/Reveal";
import HoverScale from "@/components/motion/HoverScale";
import FadeIn from "@/components/motion/FadeIn";
import SlideUp from "@/components/motion/SlideUp";

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
          <SlideUp y={20} duration={0.6}>
            <div className="home__content">
              {/* Titre */}
              <FadeIn delay={0.1}>
                <h1>{title}</h1>
              </FadeIn>

              {/* Sous-titre */}
              <FadeIn delay={0.25}>
                <p>{subtitle}</p>
              </FadeIn>

              {/* Boutons */}
              <div className="home__buttons">
                {buttons.map((btn, index) => (
                  <FadeIn delay={0.35 + index * 0.15} key={btn.id}>
                    <Link
                      href={btn.url}
                      className="home__btn home__btn--outline"
                    >
                      {btn.label}
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* SECTION A PROPOS SUR LA MÊME PAGE */}
      <section className="about section" id="about">
        <div className="container about__container">
          {/* Bloc image / slider */}
          <SlideUp className="about__image-wrapper" y={30} duration={0.7}>
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
          </SlideUp>

          {/* Bloc texte */}
          <SlideUp
            className="about__content"
            y={30}
            delay={0.15}
            duration={0.7}
          >
            {/* Titre */}
            <FadeIn delay={0.2}>
              <h2 className="section__title about__title">{aboutTitle}</h2>
            </FadeIn>

            {/* Sous-titre */}
            {aboutSubtitle && (
              <FadeIn delay={0.3}>
                <span className="section__subtitle about__subtitle">
                  {aboutSubtitle}
                </span>
              </FadeIn>
            )}

            {/* Description */}
            {aboutDescription && (
              <FadeIn delay={0.4}>
                <p className="about__description">{aboutDescription}</p>
              </FadeIn>
            )}

            {/* Highlights en légère cascade */}
            {highlights?.length > 0 && (
              <div className="about__highlights">
                {highlights.map((h, index) => (
                  <FadeIn key={h.id} delay={0.5 + index * 0.1}>
                    <div className="about__highlight">
                      {h.icon} {h.text}
                    </div>
                  </FadeIn>
                ))}
              </div>
            )}
          </SlideUp>
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

            {why.items.map((item, index) => (
              <HoverScale key={item.id}>
                <FadeIn delay={index * 0.15}>
                  <article className="why__card">
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
                </FadeIn>
              </HoverScale>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
