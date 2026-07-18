import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import './About.css';
import MarbleCTA from'./MarbleCTA';
// Existing Top Banner & Base Assets
import ApplicationBanner from './assets/application-banner.png';
import Marbal from './assets/marbal.png';
import EnvironmentalPolicy from './EnvironmentalPolicy';
// Industry Showcase Asset (replaces old Leadership section)
import IndustryShowcase from './assets/industry.png';
// Engineered Purity Card Asset
import PurityImage from './assets/consistent-performance.png';

// Industry Section Assets
import Plastics from './assets/plastics.png';
import Oilfield from './assets/oilfield-and-hydraulic-fracturing.png';
import Fiberglass from './assets/fiberglass.png';
import Glass from './assets/glass.png';
import QualityAssurance from './assets/quality-assurance.png';
import Construction from './assets/construction.png';
import IndustryGeneric from './assets/industry.png';
import EpoxyFlooring from './assets/epoxy-flooring-and-grouts.png';
import PaintsCoatings from './assets/paints-and-coatings.png';
import StatsSection from './StatsSection';
const aboutData = {
  hero: {
    title: "Industries We Serve",
    desc: "High purity quartz solutions engineered to perform in the world's most demanding industrial applications.",
    btnText: "Explore Industries"
  },
  foundation: {
    eyebrow: "THE SECRET INGREDIENT",
    title: "The Foundation of Performance",
    paragraphs: [
      "In every flawless stone surface, every high-gloss ceramic tile, every clear glass application, there is an element that rarely gets noticed—but makes all the difference... that element is QUARTZ.",
      "Our products are designed to be the quiet constant in complex industrial processes - the ingredient that ensures definite product performance.",
      "With high purity, controlled particle size distribution, and reliable supply, our quartz solutions support industries where strength, aesthetics, process stability, and chemical integrity are critical."
    ],
    btnText: "Learn More About Us",
    features: [
      { 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>, 
        label: "High Purity Assured" 
      },
      { 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>, 
        label: "Controlled Particle Size" 
      },
      { 
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="3" width="15" height="13" rx="2" ry="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, 
        label: "Reliable Global Supply" 
      }
    ]
  },
  industries: {
    eyebrow: "INDUSTRIES WE SERVE",
    title: "Powering Performance Across Industries",
    subtitle: "Click on any sector image to unlock industrial specs, performance parameters, and specialized application details.",
    sectors: [
      { 
        id: 1, 
        title: "Glass & Specialty Glass", 
        img: Glass,
        details: "Ultra-low iron silica structure ensuring unmatched optical clarity, high transmission rates, and thermal shocking defense for high-end container and solar glass setups."
      },
      { 
        id: 2, 
        title: "Fiberglass & Insulation", 
        img: Fiberglass,
        details: "Optimized particle distribution layout providing superior structural reinforcement filaments, high melting consistency, and premium moisture degradation barriers."
      },
      { 
        id: 3, 
        title: "Construction Chemicals", 
        img: Construction,
        details: "High mechanical bonding profile ideal for rendering chemical mortars, exterior protective coatings, heavy anchor setups, and high-load civil engineering matrices."
      },
      { 
        id: 4, 
        title: "Plastics, Rubber & Polymers", 
        img: Plastics,
        details: "Acts as an anti-blocking performance extender offering supreme abrasion protection, physical impact durability, and optimal electrical insulation tracking."
      },
      { 
        id: 5, 
        title: "Oilfield & Frac Fluids", 
        img: Oilfield,
        details: "Engineered proppants with supreme crush resistance metrics, maximizing downhole oil extraction rates and sustaining long-term crack conductivity profiles."
      },
      { 
        id: 6, 
        title: "Quality Control Engineering", 
        img: QualityAssurance,
        details: "Custom custom-mesh calibration protocols monitored continuously to guarantee zero-defect chemistry validation across automated manufacturing systems."
      },
      { 
        id: 7, 
        title: "Engineered Stones & Quartz", 
        img: IndustryGeneric,
        details: "Pure crystalline composition offering high hardness values for scratch-proof premium luxury countertops, commercial slab surfaces, and luxury floor tiles."
      },
      { 
        id: 8, 
        title: "Epoxy Flooring & Grouts", 
        img: EpoxyFlooring,
        details: "Chemical-resistant aggregate compositions designed for industrial seamless flooring, heavy traffic wear protection, and acid-proof quartz tile joints."
      },
      { 
        id: 9, 
        title: "Paints, Coatings & Inks", 
        img: PaintsCoatings,
        details: "Provides clean color reflection brightness parameters, extreme weather durability, high tinting power stability, and scrub-resistance additives."
      }
    ]
  }
};

/* --- Global Setup Dynamic Keyframes --- */
const fadeInUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

function About() {
  const [activeCard, setActiveCard] = useState(null);

  // Ref for the industries grid section — used to smooth-scroll on hero button click
  const industriesRef = useRef(null);

  const scrollToIndustries = () => {
    industriesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    
    <div className="about-page-wrapper">

    <Helmet>
      <title>About Us | Sevanta Minerals - Quartz Powder Manufacturer & Exporter</title>
      <meta 
        name="description" 
        content="Sevanta Minerals is a trusted manufacturer & exporter of high-purity Quartz Powder (200/250/300 Mesh) serving glass, ceramics, paints, construction & fiberglass industries worldwide." 
      />
      <link rel="canonical" href="https://YOURDOMAIN.com/about" />
      <meta property="og:title" content="About Sevanta Minerals - Quartz Powder Manufacturer" />
      <meta property="og:description" content="High purity quartz solutions for global industries." />
    </Helmet>

    {/* ---------- 1. HERO BANNER SECTION ---------- */}
    ...
      {/* ---------- 1. HERO BANNER SECTION ---------- */}
      <section className="about-hero" style={{ backgroundImage: `url(${ApplicationBanner})` }}>
        <div className="about-hero__overlay"></div>
        <div className="about-container">
          <motion.div 
            className="about-hero__content" 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
          >
            <motion.h1 className="about-hero__title" variants={fadeInUp}>
              {aboutData.hero.title}
            </motion.h1>
            <motion.p className="about-hero__desc" variants={fadeInUp}>
              {aboutData.hero.desc}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button className="about-hero__btn" onClick={scrollToIndustries}>
                {aboutData.hero.btnText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---------- 2. FULL FOUNDATION BOX SECTION ---------- */}
      <section className="about-foundation">
        <div className="about-container">
          <motion.div 
            className="about-foundation__grid" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.15 }} 
            variants={staggerContainer}
          >
            {/* Left Content Column */}
            <motion.div className="about-foundation__left" variants={fadeInUp}>
              <p className="about-foundation__eyebrow">{aboutData.foundation.eyebrow}</p>
              <h2 className="about-foundation__title">{aboutData.foundation.title}</h2>
              <div className="about-foundation__paragraphs">
                {aboutData.foundation.paragraphs.map((p, i) => (
                  <p key={i} className="about-foundation__p">{p}</p>
                ))}
              </div>
              <button className="about-foundation__btn">
                {aboutData.foundation.btnText}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </motion.div>

            {/* Right Side Media Constraints */}
            <motion.div className="about-foundation__right" variants={fadeInUp}>
              <div className="about-foundation__img-container">
                <div className="about-foundation__glow-bg"></div>
                <img src={Marbal} alt="Quartz Performance Mineral" className="about-foundation__img"/>
              </div>
              <div className="about-foundation__features-card">
                {aboutData.foundation.features.map((feat, idx) => (
                  <div className="feature-item" key={idx}>
                    <div className="feature-item__icon-wrap">{feat.icon}</div>
                    <p className="feature-item__label">{feat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <StatsSection/>
      </section>

      {/* ---------- 2.5 ENGINEERED PURITY SHOWCASE CARD ---------- */}
      <section className="purity-section">
        <div className="about-container">
          <motion.div 
            className="purity-showcase"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.15 }} 
            variants={fadeInUp}
          >
            <div className="purity-showcase__img-wrap">
              <img src={PurityImage} alt="Consistent Performance Quartz" className="purity-showcase__img" />
            </div>
            <div className="purity-showcase__content">
              <p className="purity-showcase__eyebrow">ENGINEERED PURITY FOR</p>
              <h2 className="purity-showcase__title">Consistent Performance</h2>
              <p className="purity-showcase__desc">
                Sevanta Minerals is a trusted exporter of premium-quality Quartz Powder from India. We specialize in supplying high-purity Quartz Powder in 200 Mesh, 250 Mesh, and 300 Mesh grades to industries worldwide.

With a strong focus on quality, consistency, and customer satisfaction, we source our raw materials from carefully selected mines and process them using advanced manufacturing techniques. Our products are widely used in glass, ceramics, paints, coatings, construction materials, and other industrial applications.

At  Sevanta Minerals, we are committed to delivering reliable products, competitive pricing, and timely shipments to our global customers. Our goal is to build long-term partnerships through excellence, transparency, and dependable service.

 Sevanta Minerals – Delivering Purity, Quality, and Trust Across Borders.
</p>
<p className="purity-showcase__desc">
                At Sevanta Minerals , we manufacture quartz grits and powders that deliver purity, consistency, and reliable performance for various industrial applications. Our products are designed to integrate seamlessly into stone, ceramics, glass, and specialty manufacturing processes.
              </p>
              <p className="purity-showcase__desc">
                Each grain is carefully sourced, precisely processed, and rigorously tested to meet defined specifications. Controlled particle sizing, high whiteness, and low impurities ensure predictable behaviour - batch after batch, at scale.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- 3. DYNAMIC INTERACTIVE INDUSTRIAL GRID ---------- */}
      <section className="ind-serve-section" ref={industriesRef}>
        <div className="about-container">
          <div className="ind-serve__header">
            <p className="ind-serve__eyebrow">{aboutData.industries.eyebrow}</p>
            <h2 className="ind-serve__title">{aboutData.industries.title}</h2>
            <p className="ind-serve__subtitle">{aboutData.industries.subtitle}</p>
          </div>

          <motion.div 
            className="ind-serve__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.05 }}
            variants={staggerContainer}
          >
            {aboutData.industries.sectors.map((sector) => {
              const isSelected = activeCard === sector.id;
              const isAnySelected = activeCard !== null;
              
              let stateClass = "";
              if (isAnySelected) {
                stateClass = isSelected ? "state-bright-active" : "state-dimmed-blur";
              }

              return (
                <motion.div 
                  className={`ind-card ${stateClass}`}
                  key={sector.id}
                  variants={fadeInUp}
                  onClick={() => setActiveCard(isSelected ? null : sector.id)}
                >
                  <div className="ind-card__img-wrap">
                    <img src={sector.img} alt={sector.title} className="ind-card__img" />
                    
                    {/* Interactive Glassmorphic Details Overlay Panel */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div 
                          className="ind-card__overlay-content"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="overlay-header">
                            <span className="overlay-tag">TECHNICAL SPECIFICATIONS</span>
                            <div className="close-indicator">✕</div>
                          </div>
                          <p className="overlay-desc">{sector.details}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="ind-card__bar">
                    <div className="ind-card__icon-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <span className="ind-card__name">{sector.title}</span>
                    <div className="ind-card__arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ---------- 4. INDUSTRY SHOWCASE CARD (replaces old Leadership section) ---------- */}
      <section className="about-leadership">
        <div className="about-container">
          <motion.div 
            className="industry-showcase"
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: false, amount: 0.15 }} 
            variants={fadeInUp}
          >
            <div className="industry-showcase__img-wrap">
              <img src={IndustryShowcase} alt="Industrial Operations" className="industry-showcase__img" />
            </div>
            <div className="industry-showcase__content">
              <p className="industry-showcase__eyebrow">ENGINEERED FOR SCALE</p>
              <h2 className="industry-showcase__title">Built on Industrial Excellence</h2>
              <p className="industry-showcase__desc">
                Our processing facility stands as a benchmark of precision engineering and operational discipline, where raw mineral potential is transformed into consistent, industrial-grade quartz through carefully controlled beneficiation and grinding systems.
              </p>
              <p className="industry-showcase__desc">
                Every stage of production — from selective extraction to fine particle calibration — is governed by strict quality protocols, ensuring each batch meets exacting purity, gradation, and consistency standards demanded by our global clientele.
              </p>
              <p className="industry-showcase__desc">
                Backed by decades of combined technical and operational expertise, our infrastructure is built not just for output, but for reliability — enabling us to serve glass, ceramics, construction, and specialty chemical industries with unwavering supply confidence.
              </p>
            </div>
          </motion.div>
        </div>
        <MarbleCTA/>
        <EnvironmentalPolicy/>
        
      </section>

    </div>
  );
}

export default About;