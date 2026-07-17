import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet'; // 👈 SEO Helmet Imported
import './Home.css';
import Workers from './assets/workers.png';
import PaintsAndCoatings from './assets/paints-and-coatings.png';
import FineQuartzPowder from './assets/fine-quartz-powder.png';
import Guttiye from './assets/gutti.png';
import GundImage from './assets/gund.png';
import SpecializedFractions from './assets/specialized-fractions.png';
import Applications from './Applications';
import KeyHighlights from './KeyHighlights';
import ProductRange from './ProductRange';
import PartnerSection from './PartnerSection';

const heroImages = [
  PaintsAndCoatings,
  FineQuartzPowder,
  Guttiye,
  GundImage,
  SpecializedFractions,
];
const HERO_SLIDE_DURATION = 5000;

const promiseFeatures = [
  {
    title: 'Responsibly Mined',
    desc: 'Ethically sourced from our own company-owned reserves.',
  },
  {
    title: 'European Grinding Technology',
    desc: 'Precision-engineered to meet global industrial standards.',
  },
  {
    title: 'Consistent Purity',
    desc: 'Every batch tested and benchmarked for uniform quality.',
  },
];

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none">
    <path
      d="M4 10.5l4 4 8-9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const heroTextVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const heroButtonVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Array of explicit SEO friendly alt texts matching slideshow images for Image SEO
const heroAltTexts = [
  "Premium paints and coatings minerals by Sevanta Minerals",
  "Super fine white quartz powder production India",
  "High grade quartz gutti for industrial processing",
  "Premium processed quartz grits and mineral deposits",
  "Specialized quartz fractions for industrial applications"
];

function Home() {
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, HERO_SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page-wrapper">
      {/* 🧠 Helmet Component Updates Dynamic Metadata on Load */}
      <Helmet>
        <title>Sevanta Minerals | Quartz Powder, Grits & Industrial Silica Supplier</title>
        <meta name="description" content="Discover India's leading source of premium quartz grits & powders. Engineered with European grinding technology for advanced B2B industrial applications." />
        <link rel="canonical" href="https://sevantaminerals.com/" />
      </Helmet>

      {/* ---------- HERO BANNER ---------- */}
      <header className="hero-banner-section">
        <div className="hero-bg-layer">
          <AnimatePresence mode="sync">
            <motion.img
              key={heroImages[heroIndex]}
              src={heroImages[heroIndex]}
              alt={heroAltTexts[heroIndex]} // 👈 Perfect Image SEO Alt Tag
              className="hero-bg-image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>

        <div className="hero-overlay-darkener"></div>

        <div className="section-container">
          <motion.div
            className="hero-container-content-left"
            initial="hidden"
            animate="visible"
          >
            {/* Changed to h2 for hierarchical balance */}
            <motion.h2
              className="banner-small-title"
              variants={heroTextVariants}
            >
              Super White. Super Pure.
            </motion.h2>

            {/* 👑 Golden Rule of SEO: ONLY ONE H1 Tag Per Page containing main target keyword */}
            <motion.h1
              className="banner-main-title"
              variants={heroTextVariants}
              transition={{ delay: 0.15 }}
            >
              High-purity quartz grits and powders engineered for{' '}
              <span className="gold-accent-text">
                advanced industrial applications.
              </span>
            </motion.h1>

            <motion.div className="hero-actions" variants={heroButtonVariants}>
              <button
                className="gold-action-btn"
                onClick={() => navigate('/about')}
              >
                Explore
              </button>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ---------- WHO WE ARE / OUR PROMISE SECTION ---------- */}
      <motion.section
        className="whoweare"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
      >
        <div className="whoweare__inner">
          <motion.div className="whoweare__stats" variants={itemVariants}>
            <div className="whoweare__mark" aria-hidden="true">
              <svg viewBox="0 0 60 54" fill="none">
                <path
                  d="M30 4 L54 46 H6 Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="30"
                  cy="34"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p className="whoweare__eyebrow">Our Promise</p>
            <h3 className="whoweare__stats-heading">Purity You Can Trust</h3>

            <ul className="whoweare__features">
              {promiseFeatures.map((feature) => (
                <li className="feature" key={feature.title}>
                  <span className="feature__icon">
                    <CheckIcon />
                  </span>
                  <div>
                    <p className="feature__title">{feature.title}</p>
                    <p className="feature__desc">{feature.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="whoweare__content" variants={itemVariants}>
            <div className="whoweare__text">
              {/* Semantic H2 tag for section clarity */}
              <h2 className="whoweare__heading">
                Who <span>We</span> Are
              </h2>
              <p className="whoweare__desc">
                Sevanta Minerals is a{' '}
                <strong>
                  leading producer of high-purity quartz grits and powders
                </strong>{' '}
                engineered for the world's most demanding industrial
                applications. Headquartered in Rajasthan with a fully
                integrated 150,000 sq. meter facility, we combine
                responsible mining, precision beneficiation, and
                world-class European grinding technology to deliver
                consistent, globally benchmarked silica solutions.
              </p>
              <a href="/about" className="whoweare__link">
                Know More
                <svg viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="whoweare__media">
              <img src={Workers} alt="Sevanta Minerals professional manufacturing team at the Rajasthan facility" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Applications />
      <ProductRange />
      <KeyHighlights />
      <PartnerSection />
    </div>
  );
}

export default Home;