// components/SliderWithLightbox.js
"use client";

import { useCallback, useEffect, useState } from "react";

export default function SliderWithLightbox({ images = [] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i) => {
    if (!images.length) return;
    setIndex(i % images.length);
    setOpen(true);
  };

  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  // clavier: ESC / flèches
  const onKey = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <>
      {/* Slider défilant en continu */}
      <div className="wp__slider">
        <div className="wp__slide-track wp__no-gap">
          {images.concat(images).map((src, i) => (
            <button
              key={i}
              className="wp__slide-btn"
              onClick={() => openAt(i)}
              aria-label="Voir l’image en grand"
            >
              <img
                src={src}
                alt={`Wedding slide ${i + 1}`}
                className="wp__slide-image wp__no-gap"
                draggable="false"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div className="lightbox" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <img
            src={images[index]}
            alt=""
            className="lightbox__img"
            onClick={(e) => e.stopPropagation()}
            draggable="false"
          />
          <button
            className="lightbox__close"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
          >
            &times;
          </button>
          <button
            className="lightbox__nav lightbox__prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Image précédente"
          >
            ‹
          </button>
          <button
            className="lightbox__nav lightbox__next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Image suivante"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
