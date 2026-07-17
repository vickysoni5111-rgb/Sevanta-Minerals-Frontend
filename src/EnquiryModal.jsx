import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./EnquiryModal.css";

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

export default function EnquiryModal({ isOpen, onClose }) {
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
      const response = await fetch("http://localhost:5000/api/send-lead", {
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

  const handleFinalClose = () => {
    setShowThankYou(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && !showThankYou && (
        <motion.div
          className="enquiry-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="enquiry-modal"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="enquiry-modal__close" onClick={onClose}>
              ×
            </button>

            <div className="enquiry-modal__header">
              <h2 className="enquiry-modal__title">Send Us a Message</h2>
              <p className="enquiry-modal__subtitle">
                Fill out the form and we'll get back to you within 24 hours
              </p>
            </div>

            <form className="enquiry-modal__form" onSubmit={handleSubmit}>
              <div className="enquiry-modal__field">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />
              </div>

              <div className="enquiry-modal__field">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="enquiry-modal__field">
                <label>Phone Number *</label>
                <div className="enquiry-modal__phone-row">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="enquiry-modal__country-select"
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
                    className="enquiry-modal__phone-input"
                  />
                </div>
              </div>

              <div className="enquiry-modal__field">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />
              </div>

              <div className="enquiry-modal__field">
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
              </div>

              <div className="enquiry-modal__field">
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
              </div>

              <div className="enquiry-modal__field">
                <label>Project Details</label>
                <textarea
                  name="details"
                  rows="4"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Tell us more about your requirement..."
                />
              </div>

              {errorMsg && (
                <p className="enquiry-modal__error">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="enquiry-modal__submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {isOpen && showThankYou && (
        <motion.div
          className="enquiry-modal__backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleFinalClose}
        >
          <motion.div
            className="enquiry-modal enquiry-modal--thankyou"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="enquiry-modal__close"
              onClick={handleFinalClose}
            >
              ×
            </button>

            <div className="enquiry-modal__thankyou-icon">✓</div>
            <h2 className="enquiry-modal__title">
              Thanks for Connecting with Our Team
            </h2>
            <p className="enquiry-modal__subtitle">
              We've received your enquiry and will get back to you within 24
              hours.
            </p>

            <button
              className="enquiry-modal__submit"
              onClick={handleFinalClose}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}