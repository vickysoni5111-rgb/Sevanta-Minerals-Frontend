import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import "./ContactPage.css";

// 👇 Apne assets folder ke hisaab se path adjust kar lena
import gutti from "./assets/gutti.png";
import contactdown from "./assets/Precision-at-Scale.png";
import Card1 from "./Card1";

const countryCodes = [
  { code: "+91", flag: "🇮🇳", label: "India" },
  { code: "+1", flag: "🇺🇸", label: "USA" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+971", flag: "🇦🇪", label: "UAE" },
  { code: "+1", flag: "🇨🇦", label: "Canada" },
  { code: "+61", flag: "🇦🇺", label: "Australia" },
];

const serviceOptions = [
  "Quartz Grains",
  "Fine Quartz Powder",
  "Specialized Quartz Fractions",
  "SilQ™ Series",
  "General Enquiry",
];

const budgetOptions = ["₹10K - ₹50K", "₹50K - ₹1L", "₹1L+"];

const initialFormState = {
  name: "",
  email: "",
  countryCode: "+91",
  phone: "",
  company: "",
  service: "",
  budget: "",
  details: "",
};

// ---------- ANIMATION VARIANTS ----------
const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const formContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const formItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

// 🎯 PRODUCTION FIX: localhost hardcoded nahi, ab .env se live backend URL uthega.
// Agar VITE_API_URL set nahi hai (local dev me) to localhost:5000 pe fallback hoga.
// ✅ EXTRA FIX: trailing slash (agar Vercel env var ke end mein "/" ho) ko
// automatically strip kar diya jaata hai, taaki kabhi double slash (//api/...) na bane.
const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

export default function ContactPage() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // 🎯 FIX: hardcoded localhost hataya, ab live backend URL use hoga
      const response = await fetch(`${API_BASE_URL}/api/send-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          countryCode: formData.countryCode,
          phone: formData.phone,
          companyName: formData.company,
          service: formData.service,
          budget: formData.budget,
          projectDetails: formData.details,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setFormData(initialFormState);
        setShowThankYou(true);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrorMsg("Failed to send. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* 🎯 SEO — Contact page title/description */}
      <Helmet>
        <title>Contact Us | Sevanta Minerals - Quartz Powder Supplier</title>
        <meta
          name="description"
          content="Get in touch with Sevanta Minerals for quartz powder inquiries, bulk orders, and export requirements. Our team responds within 24 hours."
        />
        <link rel="canonical" href="https://YOURDOMAIN.com/contact" />
        <meta property="og:title" content="Contact Sevanta Minerals" />
        <meta property="og:description" content="Reach out for quartz powder inquiries, bulk orders and export requirements." />
      </Helmet>

      {/* ---------- HERO SECTION (full-width image with overlay content) ---------- */}
      <section className="contact-hero">
        <motion.img
          src={gutti}
          alt="Get in touch"
          className="contact-hero__image"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="contact-hero__overlay" />

        <motion.div
          className="contact-hero__content"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
       
          <motion.h1 className="contact-hero__title" variants={heroItem}>
            Let's Build Something Strong Together
          </motion.h1>
          <motion.p className="contact-hero__text" variants={heroItem}>
            From premium quartz grains to specialized fine powders, our team
            is ready to understand your requirement and deliver quality that
            speaks for itself. Reach out to us and let's start the
            conversation.
          </motion.p>
        </motion.div>
      </section>

      {/* ---------- FORM SECTION ---------- */}
      <section className="contact-form-section">
        {!showThankYou ? (
          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="contact-form-card__header"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="contact-form-card__title">Send Us a Message</h2>
              <p className="contact-form-card__subtitle">
                Fill out the form and we'll get back to you within 24 hours
              </p>
            </motion.div>

            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              variants={formContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              <motion.div className="contact-form__field" variants={formItem}>
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div className="contact-form__field" variants={formItem}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div className="contact-form__field" variants={formItem}>
                <label>Phone Number *</label>
                <div className="contact-form__phone-row">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="contact-form__country-select"
                  >
                    {countryCodes.map((c, i) => (
                      <option key={i} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="contact-form__phone-input"
                  />
                </div>
              </motion.div>

              <motion.div className="contact-form__field" variants={formItem}>
                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />
              </motion.div>

              <motion.div className="contact-form__field" variants={formItem}>
                <label>Service Interested In</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  {serviceOptions.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div className="contact-form__field" variants={formItem}>
                <label>Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                >
                  <option value="">Select Budget</option>
                  {budgetOptions.map((b, i) => (
                    <option key={i} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div className="contact-form__field" variants={formItem}>
                <label>Project Details</label>
                <textarea
                  name="details"
                  rows="4"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell us more about your requirement..."
                />
              </motion.div>

              {errorMsg && (
                <motion.p
                  className="contact-form__error"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMsg}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="contact-form__submit"
                disabled={isSubmitting}
                variants={formItem}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>
          </motion.div>
        ) : (
          <motion.div
            className="contact-form-card contact-form-card--thankyou"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="contact-form-card__thankyou-icon"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: 0.15 }}
            >
              ✓
            </motion.div>
            <h2 className="contact-form-card__title">
              Thanks for Connecting with Our Team
            </h2>
            <p className="contact-form-card__subtitle">
              We've received your enquiry and will get back to you within 24
              hours.
            </p>
            <motion.button
              className="contact-form__submit contact-form__submit--outline"
              onClick={() => setShowThankYou(false)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Another Message
            </motion.button>
          </motion.div>
        )}
        
      </section>
  <Card1/>
      {/* ---------- BOTTOM IMAGE CARD (full width, light golden) ---------- */}
      <section className="contact-bottom-section">
        <motion.div
          className="contact-bottom-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
        >
          <motion.img
            src={contactdown}
            alt="Reach out to us"
            className="contact-bottom-card__image"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      
      </section>
    </div>
  );
}