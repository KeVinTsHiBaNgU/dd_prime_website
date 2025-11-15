// app/realisations/page.js
"use client";

import { useEffect, useState } from "react";
import { getRealisationsPage } from "@/lib/cms";
import FadeIn from "@/components/motion/FadeIn";
import Reveal from "@/components/Reveal";
import HoverScale from "@/components/motion/HoverScale";
import SlideUp from "@/components/motion/SlideUp";

export default function RealisationsPage() {
  const [data, setData] = useState({
    title: "Réalisations",
    subtitle: "",
    projects: [],
    sliderImages: [],
  });

  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await getRealisationsPage();
        setData(res);
      } catch (e) {
        console.error("Erreur chargement réalisations :", e);
      }
    }
    load();
  }, []);

  const { title, subtitle, projects, sliderImages } = data;

  console.log(projects);

  const openLightbox = (src) => setLightboxImage(src);
  const closeLightbox = () => setLightboxImage(null);

  // on duplique pour l'effet infini
  const infiniteSliderImages = sliderImages.concat(sliderImages);

  return (
    <>
      <section className="realisations section" id="realisations">
        <FadeIn>
          <h2 className="section__title">{title}</h2>
        </FadeIn>
        <Reveal delay={0.2}>
          {subtitle && <span className="section__subtitle">{subtitle}</span>}
        </Reveal>

        <div className="realisations__container container">
          {projects.map((p, index) => (
            <SlideUp key={p.id} delay={index * 0.12} y={30}>
              <FadeIn delay={index * 0.12 + 0.1}>
                <HoverScale scale={1.03}>
                  <div className="project-card">
                    {/* Image cliquable (lightbox) */}
                    {p.image && (
                      <div className="project-img-wrapper">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="project-img"
                          onClick={() => openLightbox(p.image)}
                        />
                      </div>
                    )}

                    <div className="project-content">
                      <h3 className="project-title">{p.title}</h3>

                      {p.description && (
                        <p className="project-description">{p.description}</p>
                      )}

                      {p.details && (
                        <p className="project-details">{p.details}</p>
                      )}

                      {p.quote && (
                        <blockquote className="project-quote">
                          &quot;{p.quote}&quot;
                        </blockquote>
                      )}
                    </div>
                  </div>
                </HoverScale>
              </FadeIn>
            </SlideUp>
          ))}
        </div>

        {/* SLIDER D’IMAGES EN BAS (infini + cliquable) */}
        {sliderImages.length > 0 && (
          <div className="realisations__slider-wrapper">
            <div className="realisations__slider">
              <div className="realisations__slide-track">
                {infiniteSliderImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Réalisation ${i + 1}`}
                    className="realisations__slide-image"
                    onClick={() => openLightbox(src)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* LIGHTBOX */}
      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div
            className="lightbox__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox__close"
              type="button"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <img
              src={lightboxImage}
              alt="Réalisation agrandie"
              className="lightbox__image"
            />
          </div>
        </div>
      )}
    </>
  );
}
