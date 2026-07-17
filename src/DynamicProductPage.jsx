import './DynamicProductPage.css';
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async"; // ✨ SEO के लिए इम्पोर्ट किया
import { products } from "./products";
import EnquiryModal from "./EnquiryModal"; 

const scrollFadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.610, 0.355, 1] }
  }
};

const scrollSlideLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } 
};

const scrollSlideRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
};

// Ruler ticks for the V300 signature "micron scale" element.
const RULER_TICKS = Array.from({ length: 51 }, (_, i) => {
  if (i === 45) return { value: i, type: "marker" };
  if (i % 10 === 0) return { value: i, type: "major" };
  return { value: i, type: "minor" };
});

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products[slug];
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!product) {
    return (
      <div className="product-notfound">
        <h2>Product Not Found</h2>
        <Link to="/" className="product-notfound__link">Back to Home</Link>
      </div>
    );
  }

  // 🎯 डायनामिक SEO मेटा टैग्स का सेटअप (shyamclay.com की तरह कीवर्ड-रिच)
  const seoTitle = `${product.name} ${product.mesh ? product.mesh : ''} Supplier & Exporter | Sevanta Minerals`;
  const seoDesc = `Premium quality ${product.name} (${product.mesh ? product.mesh : 'Industrial Grade'}) from India. High SiO2 purity, low iron content, engineered for glass, ceramics, and coatings. Request a quote now!`;

  /* =============================================================
      MESH 200 THEME
  ============================================================= */
  if (product.isSpecial200Mesh) {
    return (
      <div className="product-page-wrapper mesh-200-theme">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDesc} />
          <meta name="keywords" content={`${product.name}, ${product.mesh}, Quartz Powder India, High Purity Quartz, Quartz Exporter`} />
        </Helmet>
        
        {/* HERO SECTION */}
        <section className="hero-200">
          <div className="hero-200__inner-grid">
            <motion.div 
              className="hero-200__content"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="hero-200__tag">Premium Industrial Grade</span>
              <h1>{product.name} <br/><span className="gold-text">{product.mesh}</span></h1>
              <h2 className="hero-200__tagline">{product.tagline}</h2>
              <div className="hero-200__specs-bar">
                <span className="spec-pill">100-700 µm</span>
                <span className="spec-pill">Fe₂O₃ &lt; 0.01%</span>
              </div>
              <p className="hero-200__desc">{product.description}</p>
              <button onClick={() => setIsModalOpen(true)} className="hero-200__btn">
                Enquire Now <span className="arrow">→</span>
              </button>
            </motion.div>
            <div className="hero-200__image-holder">
              <img src={product.fullHeroBg} alt={`${product.name} Purity Structure`} className="contain-img" />
            </div>
          </div>
        </section>

        {/* BOTTOM COUNTER STATS BAR */}
        <section className="hero-bottom-stats-bar">
          <div className="stats-bar-grid">
            <div className="stat-node">
              <h3>High Purity</h3>
              <p>99.5%+ SiO₂</p>
            </div>
            <div className="stat-node">
              <h3>Low Iron Content</h3>
              <p>Fe₂O₃ &lt; 0.01%</p>
            </div>
            <div className="stat-node">
              <h3>Optically Sorted</h3>
              <p>Premium Quality</p>
            </div>
          </div>
        </section>

        {/* SIZES & FEATURES SECTION */}
        <section className="sizes-feature-section">
          <div className="sizes-grid-container">
            <motion.div 
              className="sizes-card-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollSlideLeft}
            >
              <h3>Available Sizes</h3>
              <div className="sizes-list">
                <div className="size-pill-item"><span>0.1 - 0.4 mm</span></div>
                <div className="size-pill-item"><span>0.3 - 0.7 mm</span></div>
                <div className="size-pill-item"><span>0.6 - 1.2 mm</span></div>
                <div className="size-pill-item"><span>1.2 - 2.5 mm</span></div>
              </div>
            </motion.div>
            <div className="features-img-center-pane">
              <img src={product.secondSectionBg} alt={`Processed ${product.name}`} className="contain-img" />
            </div>
            <div className="features-cards-right">
              <motion.div className="sub-feature-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollFadeUp}>
                <div className="card-number">#1</div>
                <p>High reflectivity &amp; snow-white appearance</p>
              </motion.div>
              <motion.div className="sub-feature-card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollFadeUp}>
                <div className="card-number">#2</div>
                <p>Controlled Particle Size Distribution (PSD) for optimal resin flow</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* UNINTERRUPTED SUPPLY CHAIN SECTION */}
        <section className="hero-200 supply-chain-dark-section">
          <div className="hero-200__inner-grid">
            <motion.div 
              className="hero-200__content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollSlideLeft}
            >
              <span className="hero-200__tag">Global Logistics</span>
              <h2 className="supply-section-title">Uninterrupted Supply Chain &amp; Massive Scale Production</h2>
              <p className="hero-200__desc">
               We Interact  With vast mineral reserves ownership and state-of-the-art automatic processing lines in Gujarat And Rajasthan  Sevanta Minerals  maintain consistent delivery commitments for multi-ton heavy industrial contracts.
              </p>
              <p className="hero-200__desc">
                Our Rigorous logistics management, massive silo buffers, and zero-downtime mechanical packaging processes guarantee that your manufacturing ecosystem never faces an inventory bottleneck.
              </p>
              <button onClick={() => setIsModalOpen(true)} className="hero-200__btn gold-solid-btn">
                Secure Supply Chain Contract
              </button>
            </motion.div>
            <motion.div 
              className="hero-200__image-holder framed-padded"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollSlideRight}
            >
              <img src={product.reliableImg} alt="Global Logistics Supply Chain Setup" className="contain-img cropped-aspect" />
            </motion.div>
          </div>
        </section>

        {/* INDUSTRIAL APPLICATIONS INFINITE SLIDER */}
        <section className="infinite-slider-section">
          <div className="slider-section-heading">
            <h2>Industrial Applications</h2>
            <p>Our premium 200 Mesh processing serves dynamic manufacturing environments globally.</p>
          </div>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...product.sliderImages, ...product.sliderImages].map((img, index) => (
                <div className="marquee-slide-card" key={index}>
                  <img src={img} alt="Industrial Application Setup" />
                  <div className="slide-overlay-title"><span>Segment Application</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONSISTENT PERFORMANCE SECTION */}
        <section className="consistent-perf-section">
          <div className="consistent-grid">
            <motion.div className="consistent-content-left" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollSlideLeft}>
              <span className="sub-tag">Quality Assurance</span>
              <h2>Engineered Purity for <br/><span className="gold-text">Consistent Performance</span></h2>
              <p>Sevanta Overseas is a trusted exporter of premium-quality Quartz Powder from India. We specialize in supplying high-purity Quartz Powder in 200 Mesh, 250 Mesh, and 300 Mesh grades to industries worldwide. With a strong focus on quality, consistency, and customer satisfaction, we source our raw materials from carefully selected mines and process them using advanced manufacturing techniques.</p>
            </motion.div>
            <motion.div className="consistent-img-right" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scrollSlideRight}>
              <img src={product.consistentImg} alt="Engineered Mineral Purity Standards" className="contain-img" />
            </motion.div>
          </div>
        </section>

        <AnimatePresence>
          {isModalOpen && (
            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productName={`${product.name} - ${product.mesh}`} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* =============================================================
      MESH 250 CLEAN INTUITIVE THEME
  ============================================================= */
  if (product.isSpecial250Mesh) {
    return (
      <div className="product-page-wrapper v250-clean-layout">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDesc} />
          <meta name="keywords" content={`${product.name}, Fine Quartz Powder, Micronized Silica, Minerals Exporter India`} />
        </Helmet>
        
        {/* SECTION 1: FINE QUARTZ POWDER */}
        <section className="v250-split-hero">
          <div className="v250-content-container standard-grid-5050">
            <motion.div 
              className="v250-text-block-card"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="v250-mini-badge">Our Product</span>
              <h1 className="v250-title-main">Fine Quartz Powder</h1>
              
              <div className="v250-badge-row">
                <span className="v250-pill-static">High Whiteness</span>
                <span className="v250-pill-static">≤45 µm</span>
              </div>

              <p className="v250-description-paragraph">
                Manufactured using advanced secondary grinding circuits with dynamic air classification. 
                This powder offers high uniformity and chemical inertness.
              </p>
              
              <button onClick={() => setIsModalOpen(true)} className="v250-cta-button">
                Enquire Now <span className="v250-arrow">→</span>
              </button>
            </motion.div>

            <div className="v250-image-preview-frame">
              <img src={product.fineQuartzBg} alt="Premium Fine Quartz Powder Batch" className="v250-img-fluid" />
            </div>
          </div>
        </section>

        {/* SECTION 2: INDUSTRY GRID RE-INTEGRATED */}
        <section className="v250-gray-section">
          <div className="v250-content-container standard-grid-5050">
            <motion.div 
              className="v250-text-block-card plain-bg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollSlideLeft}
            >
              <span className="v250-mini-badge text-gold">Industrial Solution</span>
              <h2 className="v250-title-secondary">Empowering Global Heavy Industries</h2>
              <p className="v250-body-text-dark">
                Our advanced mineral grinding setups ensure precise processing of raw quartz into highly unified grain matrixes. 
                Engineered to handle structural demands, it serves as an optimal filler matrix across major production units.
              </p>
            </motion.div>

            <motion.div 
              className="v250-image-preview-frame shadowed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollSlideRight}
            >
              <img src={product.industryImg} alt="Heavy Industrial Mineral Processing Plant" className="v250-img-fluid" />
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: SILICA QUARTZ POWDER PROVIDER */}
        <section className="v250-split-hero white-inverse-bg">
          <div className="v250-content-container standard-grid-5050 flip-mobile-order">
            <div className="v250-image-preview-frame">
              <img src={product.silicaBg} alt="Silica Quartz Powder Logistics" className="v250-img-fluid" />
            </div>

            <motion.div 
              className="v250-text-block-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollFadeUp}
            >
              <span className="v250-mini-badge">Best Quality</span>
              <h2 className="v250-title-secondary">Best Quality Silica <br/>Sevanta Minerals...</h2>
              <p className="v250-description-paragraph">
               Sevanta Minerals stands at the pinnacle of pure mineral extraction. By controlling the complete supply ecosystem 
                from open-cast mines to multi-stage optical sortomatics.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: APPLICATIONS BANNER CARD & CAROUSEL */}
        <section className="v250-carousel-block-wrapper">
          <div className="v250-content-container">
            <motion.div 
              className="v250-gold-container-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollFadeUp}
            >
              <div className="v250-gold-card-text-header">
                <h2>Applications of Silica Quartz Powder</h2>
                <p>Silica Quartz Powder, with an exceptional SiO2 purity exceeding 99%, is a game-changer across industries.</p>
              </div>

              <div className="v250-marquee-viewport-window">
                <div className="v250-marquee-infinite-track">
                  {[...product.appCards, ...product.appCards].map((card, idx) => (
                    <div className="v250-product-node-card" key={idx}>
                      <div className="v250-node-img-box">
                        <img src={card.img} alt={`Silica Quartz application in ${card.title}`} />
                      </div>
                      <div className="v250-node-footer-label">
                        <h4>{card.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatePresence>
          {isModalOpen && (
            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productName={`${product.name} - ${product.mesh}`} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  /* =============================================================
      MESH 300 DATASHEET THEME
  ============================================================= */
  if (product.isSpecial300Mesh) {
    return (
      <div className="product-page-wrapper v300-datasheet-layout">
        <Helmet>
          <title>{seoTitle}</title>
          <meta name="description" content={seoDesc} />
          <meta name="keywords" content={`${product.name}, Micronized Quartz 300 Mesh, Sub-45 Micron Silica, Technical Grade Minerals`} />
        </Helmet>

        {/* SECTION 1: DATASHEET HERO */}
        <section className="v300-hero">
          <div className="v300-container v300-hero__grid">
            <motion.div
              className="v300-hero__card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="v300-eyebrow">Technical Datasheet</span>
              <h1 className="v300-title">
                {product.name} <span className="v300-accent-text">{product.mesh}</span>
              </h1>
              <p className="v300-tagline">{product.tagline}</p>

              <div className="v300-spec-rows">
                <div className="v300-spec-row"><span>Particle Size</span><span>Sub-45 µm</span></div>
                <div className="v300-spec-row"><span>Silica Content</span><span>SiO₂ 99%+</span></div>
                <div className="v300-spec-row"><span>Grade</span><span>Micronized</span></div>
              </div>

              <p className="v300-desc">{product.description}</p>

              <button onClick={() => setIsModalOpen(true)} className="v300-cta">
                Request Spec Sheet →
              </button>
            </motion.div>

            <motion.div
              className="v300-hero__visual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <img src={product.heroBg} alt={`Technical Specification Sheet for ${product.name}`} />
              <div className="v300-ruler">
                <div className="v300-ruler__label">Actual Particle Scale (µm)</div>
                <div className="v300-ruler__scale">
                  {RULER_TICKS.map((tick) => (
                    <div key={tick.value} className={`v300-ruler__tick ${tick.type}`} />
                  ))}
                </div>
                <div className="v300-ruler__caption">
                  <span>0µm</span>
                  <span>45µm marker</span>
                  <span>50µm</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: INDUSTRY APPLICATION FEATURE */}
        <section className="v300-feature">
          <div className="v300-container v300-feature__grid">
            <motion.div
              className="v300-feature__visual"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollSlideLeft}
            >
              <img src={product.industryImg} alt="Precision Micronized Grinding Factory Machine" />
            </motion.div>

            <motion.div
              className="v300-feature__text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollSlideRight}
            >
              <span className="v300-eyebrow">Built For Heavy Industry</span>
              <h2>Micronized For Precision Formulation</h2>
              <p>
                Secondary grinding and dynamic air classification bring every batch down to a
                consistent sub-45 micron profile, so it disperses evenly in resins, coatings and
                fillers without the coarse fraction that causes surface defects.
              </p>
            </motion.div>
          </div>
        </section>


        {/* SECTION 3: TECHNICAL PROFILE TILE GRID */}
        <section className="v300-profile">
          <div className="v300-container">
            <motion.div
              className="v300-profile__head"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollFadeUp}
            >
              <span className="v300-eyebrow">Technical Profile</span>
              <h2>What The Datasheet Says</h2>
              <p>Key figures buyers ask for first, laid out the way a spec-sheet would.</p>
            </motion.div>

            <motion.div
              className="v300-tile-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollFadeUp}
            >
              <div className="v300-tile">
                <div className="v300-tile__value">99%+</div>
                <div className="v300-tile__label">SiO₂ Content</div>
              </div>
              <div className="v300-tile">
                <div className="v300-tile__value">&lt;45µm</div>
                <div className="v300-tile__label">Particle Size</div>
              </div>
              <div className="v300-tile">
                <div className="v300-tile__value">High</div>
                <div className="v300-tile__label">Optical Whiteness</div>
              </div>
              <div className="v300-tile">
                <div className="v300-tile__value">Low</div>
                <div className="v300-tile__label">Chemical Reactivity</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: EXPORT SCALE BANNER */}
        <section className="v300-banner">
          <div className="v300-banner__media">
            <img src={product.bottomBannerImg} alt="Global Export Packing Facility & Logistics" />
          </div>
          <motion.div
            className="v300-banner__panel"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scrollFadeUp}
          >
            <span className="v300-eyebrow">Export Scale</span>
            <h2>Processed, Screened &amp; Packed For Global Dispatch</h2>
            <p>
              Every batch moves from grinding to classification to packaging under one
              roof, loaded directly into 25/50kg PP bags or jumbo bags.
            </p>
          </motion.div>
        </section>

        {/* SECTION 5: APPLICATION DOSSIER */}
        <section className="v300-dossier">
          <div className="v300-container">
            <motion.div
              className="v300-profile__head"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollFadeUp}
            >
              <span className="v300-eyebrow">Application Files</span>
              <h2>Where This Grade Goes To Work</h2>
              <p>Three cuts from the same purity line, read like files off the plant floor.</p>
            </motion.div>

            <div className="v300-dossier-card">
              <motion.div
                className="v300-dossier-card__media"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollSlideLeft}
              >
                <img src={product.gritsGrainsImg} alt="Coarse Quartz Grits and Grains Cut" />
              </motion.div>
              <motion.div
                className="v300-dossier-card__text"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollSlideRight}
              >
                <span className="v300-eyebrow">File 01 — Grits &amp; Grains</span>
                <h3>The Same Line, Coarser Cuts</h3>
                <p>
                  Alongside the 300 Mesh fines, our classifiers draw off coarser grits and
                  grains from the identical purity stream.
                </p>
              </motion.div>
            </div>

            <div className="v300-dossier-card reverse">
              <motion.div
                className="v300-dossier-card__media"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollSlideRight}
              >
                <img src={product.saltBenchmarkImg} alt="Whiteness Quality Check Control" />
              </motion.div>
              <motion.div
                className="v300-dossier-card__text"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollSlideLeft}
              >
                <span className="v300-eyebrow">File 02 — Whiteness Benchmark</span>
                <h3>Optical Whiteness, Checked Against Refined Salt</h3>
                <p>
                  Buyers in detergent and ceramic filler lines ask for one thing first —
                  brightness. Every batch is held against a refined-salt whiteness reference.
                </p>
              </motion.div>
            </div>

            <div className="v300-dossier-card">
              <motion.div
                className="v300-dossier-card__media"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollSlideLeft}
              >
                <img src={product.saltIndustryImg} alt="Brine Filtration and Salt Evaporation Process" />
              </motion.div>
              <motion.div
                className="v300-dossier-card__text"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scrollSlideRight}
              >
                <span className="v300-eyebrow">File 03 — Salt &amp; Brine Processing</span>
                <h3>Filtration Media For Salt Refining</h3>
                <p>
                  Graded quartz media filters brine ahead of evaporation, holding back
                  sediment while letting flow rate stay high.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CLOSING SHOWCASE */}
        <section className="v300-closing">
          <div className="v300-closing__media">
            <img src={product.texturedCoatingsImg} alt="Textured Architectural Facade Coating Application" />
          </div>
          <div className="v300-closing__panel">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scrollFadeUp}
            >
              <span className="v300-eyebrow">Final Application — Architectural Coatings</span>
              <h2>Textured &amp; Architectural Coatings</h2>
              <p>
                On exterior walls, this grade becomes the tooth in a textured render —
                the fine aggregate that lets a trowel drag, stipple, or comb a facade into
                a finish that holds its pattern through sun, rain, and repeated washing.
              </p>
              <button onClick={() => setIsModalOpen(true)} className="v300-cta light">
                Request Coatings Datasheet →
              </button>
            </motion.div>
          </div>
        </section>

        <AnimatePresence>
          {isModalOpen && (
            <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productName={`${product.name} - ${product.mesh}`} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="product-page-wrapper">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
      </Helmet>
      <section className="product-hero">
         <div className="product-hero__content">
            <h1 className="product-hero__title">{product.name} <span className="gold">{product.mesh}</span></h1>
            <p className="product-hero__desc">{product.description}</p>
         </div>
      </section>
    </div>
  );
}