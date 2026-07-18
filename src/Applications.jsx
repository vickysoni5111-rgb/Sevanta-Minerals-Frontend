import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Applications.css";

import CeramicsSanitaryware from "./assets/c1.png";
import CeramicsSanitaryware2 from "./assets/c.png";
import EngineeredStone from "./assets/engineered-stone.png";
import QuartzImg from "./assets/Quartz.png";
import FineQuartzPowder from "./assets/fine-quartz-powder.png";
import OurCore from "./assets/ourcore.png";

const slides = [
  {
    image: CeramicsSanitaryware,
    tag: "Application",
    title: "Ceramics & Sanitaryware",
    description:
      "High-purity quartz powders engineered for ceramic tiles and sanitaryware, delivering superior whiteness, consistent particle size, and reliable glazing performance.",
  },
  {
    image: CeramicsSanitaryware2,
    tag: "Application",
    title: "Sanitaryware Fixtures",
    description:
      "Fine-graded silica formulated for vitreous china and sanitaryware fixtures, supporting smooth finishes and dependable strength batch after batch.",
  },
  {
    image: EngineeredStone,
    tag: "Application",
    title: "Engineered Stone",
    description:
      "Precision-sized quartz grits built for engineered stone slabs, giving fabricators the clarity, hardness, and colour consistency premium surfaces demand.",
  },
  {
    image: QuartzImg,
    tag: "Product",
    title: "Quartz Grits",
    description:
      "Responsibly mined and beneficiated quartz grits, processed on European grinding lines to meet globally benchmarked purity and grain standards.",
  },
  {
    image: FineQuartzPowder,
    tag: "Product",
    title: "Fine Quartz Powder",
    description:
      "Ultra-fine quartz powder milled for tight particle-size distribution, suited to industrial fillers, coatings, and specialty formulations.",
  },
  {
    image: OurCore,
    tag: "Company",
    title: "Our Core",
    description:
      "From responsible mining to precision processing, our integrated facility keeps quality, consistency, and sustainability at the centre of everything we produce.",
  },
];

// Slide changes every 2 seconds, always running.
const AUTO_SLIDE_INTERVAL = 2000;

export default function Applications() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isPausedRef = useRef(false);

  // Single interval, created once, runs for the component's entire lifetime.
  // It checks isPausedRef on every tick instead of being torn down/rebuilt,
  // which is what was causing the slides to stall before.
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPausedRef.current) return;
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const goTo = (next) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const pause = () => {
    isPausedRef.current = true;
  };
  const resume = () => {
    isPausedRef.current = false;
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const active = slides[index];

  return (
    <motion.section
      className="applications"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="applications__header">
        <p className="applications__eyebrow">What We Deliver</p>
        <h2 className="applications__heading">One Material.
Infinite Applications.</h2>
      </div>

      <div className="applications__carousel">
        <button
          className="applications__arrow applications__arrow--prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="applications__viewport">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              className="applications__card"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="applications__media">
                <img src={active.image} alt={active.title} />
              </div>
              <div className="applications__content">
                <span className="applications__tag">{active.tag}</span>
                <h3 className="applications__title">{active.title}</h3>
                <p className="applications__desc">{active.description}</p>
                <Link to="/gallery/production" className="applications__link">
             
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="applications__arrow applications__arrow--next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="applications__dots">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            className={`applications__dot ${i === index ? "is-active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to ${slide.title}`}
          />
        ))}
      </div>
    </motion.section>
  );
}