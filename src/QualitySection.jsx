import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./QualitySection.css";
import EnquiryModal from "./EnquiryModal";
// 👇 Apne assets folder ke hisaab se path adjust kar lena
import about from "./assets/about.png";
import bottom from "./assets/bottom.png";
import purityImg from "./assets/consistent-performance.png";
import Aboutcard from "./Aboutcard";
// ---------- ICONS (inline SVG, no external library needed) ----------
const IconCheckCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.2 2.2L15.5 9.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="12" height="9" rx="1" />
    <path d="M14 10h4l3 3v3h-7z" />
    <circle cx="6.5" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3z" />
  </svg>
);

const IconLeaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 20c9 0 14-5 14-14-9 0-14 5-14 14z" strokeLinejoin="round" />
    <path d="M5 20c3-5 6-8 12-11" strokeLinecap="round" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTarget = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.7" fill="currentColor" />
  </svg>
);

const IconBulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 21h4" strokeLinecap="round" />
    <path d="M12 3a6 6 0 00-3.6 10.8c.6.5.9 1.2.9 2.2h5.4c0-1 .3-1.7.9-2.2A6 6 0 0012 3z" strokeLinejoin="round" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

const badges = [
  { icon: <IconCheckCircle />, title: "High Purity", subtitle: "(Fe₂O₃ < 0.01%)" },
  { icon: <IconTruck />, title: "On-Time", subtitle: "Delivery" },
  { icon: <IconGlobe />, title: "Global", subtitle: "Supply Network" },
  { icon: <IconLeaf />, title: "Sustainable", subtitle: "Practices" },
];

const coreValues = [
  { icon: <IconShield />, title: "Integrity", description: "Transparent, responsible and ethical operations." },
  { icon: <IconTarget />, title: "Precision", description: "Consistency in every batch through technology-driven processing." },
  { icon: <IconBulb />, title: "Innovation", description: "Continuous improvement in beneficiation and application performance." },
  { icon: <IconLeaf />, title: "Sustainability", description: "Responsible mining and safety-first operations (Zero-Harm culture)." },
];

// ---------- PROPERTIES DATA ----------
const physicalProperties = [
  { label: "Humidity", value: "0.01 %" },
  { label: "Specific gravity", value: "2.8" },
  { label: "Bulk density", value: "1.35" },
  { label: "pH", value: "11" },
  { label: "State", value: "Solid" },
  { label: "LoI", value: "0.6 %" },
];

const chemicalProperties = [
  { label: "Silicon dioxide (SiO₂)", value: "99" },
  { label: "Aluminium oxide (Al₂O₃)", value: "0.25" },
  { label: "Iron oxide (Fe₂O₃)", value: "0.05" },
  { label: "Titanium oxide (TiO₂)", value: "0.03" },
];

// ---------- ANIMATION VARIANTS ----------
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ---------- TALK TO EXPERT MODAL ----------
// NOTE: Ye ek standard contact form hai (Name, Email, Phone, Message).
// Agar aapke ContactPage.jsx me alag fields / API call hai, wo file share karo
// to isko exactly usi ke mutabik replace kar denge.
function TalkToExpertModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👇 Yahan apna actual submit logic (API call / EmailJS / backend) laga dena
    console.log("Talk to Expert form submitted:", form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="quality-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="quality-modal__card"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="quality-modal__close" onClick={onClose} aria-label="Close">
              <IconClose />
            </button>

            <span className="quality-modal__label">Get In Touch</span>
            <h3 className="quality-modal__title">Talk To Our Expert</h3>
            <p className="quality-modal__subtitle">
              Share your requirement and our team will get back to you shortly.
            </p>

            {submitted ? (
              <div className="quality-modal__success">
                <IconCheckCircle />
                <p>Thank you! Your request has been submitted.</p>
              </div>
            ) : (
              <form className="quality-modal__form" onSubmit={handleSubmit}>
                <div className="quality-modal__field">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="quality-modal__field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="quality-modal__field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="quality-modal__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell us about your requirement..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="quality-btn quality-btn--filled quality-modal__submit">
                  Send Request <span aria-hidden="true">→</span>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------- PROPERTIES TABLE CARD ----------
function QualityProperties() {
  return (
    <section className="quality-properties">
      <motion.div
        className="quality-properties__heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="quality-values__label">Product Specification</span>
        <h2 className="quality-values__title">Properties Of Quartz Powder</h2>
        <span className="quality-values__underline" />
      </motion.div>

      <motion.div
        className="quality-properties__grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="quality-properties__card" variants={fadeUp}>
          <h3 className="quality-properties__card-title">Physical Properties Of Quartz Powder</h3>
          <table className="quality-properties__table">
            <thead>
              <tr>
                <th>Physical Characteristics</th>
                <th>Result&apos;s</th>
              </tr>
            </thead>
            <tbody>
              {physicalProperties.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div className="quality-properties__card" variants={fadeUp}>
          <h3 className="quality-properties__card-title">Chemical Properties Of Quartz Powder</h3>
          <table className="quality-properties__table">
            <thead>
              <tr>
                <th>Chemical Composition</th>
                <th>Content (%)</th>
              </tr>
            </thead>
            <tbody>
              {chemicalProperties.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>

      <motion.p
        className="quality-properties__note"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
       Sevanta Minerals provides silica powder in sizes as per the client&apos;s
        requirements. We always have all types of quartz grades available for
        immediate supply, ranging from glossy quartz to semi-grade quartz
        grits, making us India&apos;s best quartz powder supplier. Good quality
        quartz can have silica up to 99.90%. Quartz is stiff like a diamond.
        We provide quartz powder to customers based on their specifications.
      </motion.p>
    </section>
  );
}

// ---------- ENGINEERED PURITY CARD (image left, content right) ----------
function EngineeredPurity() {
  return (
    <section className="quality-purity">
      <div className="quality-purity__card">
        <motion.div
          className="quality-purity__image-wrap"
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <img
            src={purityImg}
            alt="Consistent quartz performance"
            className="quality-purity__image"
          />
        </motion.div>

        <motion.div
          className="quality-purity__text"
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <span className="quality-purity__label">Engineered Purity For</span>
          <h2 className="quality-purity__heading">Consistent Performance</h2>
          <p>
            At Sevanta Minerals, we manufacture quartz grits and powders that
            deliver purity, consistency, and reliable performance for various
            industrial applications. Our products are designed to integrate
            seamlessly into stone, ceramics, glass, and specialty
            manufacturing processes.
          </p>
          <p>
            Each grain is carefully sourced, precisely processed, and
            rigorously tested to meet defined specifications. Controlled
            particle sizing, high whiteness, and low impurities ensure
            predictable behaviour - batch after batch, at scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function QualitySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="quality-section">
      {/* ---------- HERO (text left, image right — fixed frame, no crop issues) ---------- */}
      <section className="quality-hero">
        <motion.div
          className="quality-hero__content"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className="quality-hero__title" variants={fadeUp}>
            Precision Powder Manufacturing.
            <br />
            Reliable Transportation.
            <br />
            <span className="quality-hero__title--accent">
              Delivered Across India.
            </span>
          </motion.h1>

          <motion.p className="quality-hero__text" variants={fadeUp}>
            High-purity mineral powders manufactured with advanced technology
            and transported safely to power industries across the globe.
          </motion.p>

          <motion.div className="quality-hero__actions" variants={fadeUp}>
            <Link to="/products/quartz-powder-200-mesh" className="quality-btn quality-btn--filled">
              Explore Our Products 
            </Link>
            <button
              type="button"
              className="quality-btn quality-btn--outline"
              onClick={() => setIsModalOpen(true)}
            >
              Talk To Expert
            </button>
          </motion.div>

          <motion.div className="quality-hero__badges" variants={fadeUp}>
            {badges.map((b, i) => (
              <div className="quality-badge" key={i}>
                <span className="quality-badge__icon">{b.icon}</span>
                <span className="quality-badge__text">
                  <strong>{b.title}</strong>
                  <span>{b.subtitle}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="quality-hero__image-frame"
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <img src={about} alt="Precision powder manufacturing" className="quality-hero__image" />
          <div className="quality-hero__frame-glow" />
        </motion.div>
      </section>

      {/* ---------- CORE VALUES ---------- */}
      <section className="quality-values">
        <motion.div
          className="quality-values__heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="quality-values__label">Our Core Values</span>
          <h2 className="quality-values__title">
            Built On Values.
            <br />
            Driven By Excellence.
          </h2>
          <span className="quality-values__underline" />
        </motion.div>

        <motion.div
          className="quality-values__grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {coreValues.map((v, i) => (
            <motion.div
              className="quality-value-card"
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
            >
              <span className="quality-value-card__icon">{v.icon}</span>
              <h3 className="quality-value-card__title">{v.title}</h3>
              <p className="quality-value-card__desc">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---------- BOTTOM BIG CARD (text left, image right) ---------- */}
      <section className="quality-bottom">
        <div className="quality-bottom__card">
          <motion.div
            className="quality-bottom__text"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <span className="quality-bottom__label">Quartz Powder</span>
            <h2 className="quality-bottom__heading">
              India's Trusted Source for Every Quartz Grade
            </h2>
            <p>
              According to the needs of the customer, Sevanta Minerals offers
              silica powder in different sizes. We are India's top supplier
              of quartz powder because we always have all varieties of
              quartz grades — from shiny quartz to semi-grades — available
              for fast supply. Silica content in high-quality quartz can
              reach 99.90%. Quartz is as rigid as a diamond. We supply
              customers with quartz powder based on their requirements.
            </p>
            <p>
              Quartz is utilized in a variety of different industries for
              both the primary product and the filler — including engineering
              stone, countertops, and quartz stone as the main component and
              filler.
            </p>
            <p>
              Available in 100,150,200,325 mesh sizes This  value is
              also supplied with quality control laboratory criteria. Our
              powder's whiteness will have a minimum 90+ value.
            </p>
          </motion.div>

          <motion.div
            className="quality-bottom__image-wrap"
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <img
              src={bottom}
              alt="Quartz powder quality"
              className="quality-bottom__image"
            />
          </motion.div>
        </div>
      </section>

      {/* ---------- PHYSICAL & CHEMICAL PROPERTIES TABLE ---------- */}
      <QualityProperties />

      {/* ---------- ENGINEERED PURITY FOR CONSISTENT PERFORMANCE (bottom-most card) ---------- */}
      <EngineeredPurity />

     {/* ---------- TALK TO EXPERT MODAL (aapka design) ---------- */}
<EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

<Aboutcard/>
    </div>
  );
}