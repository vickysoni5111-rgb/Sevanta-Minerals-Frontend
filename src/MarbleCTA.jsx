import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './MarbleCTA.css';

// Import your Enquiry Modal here
import EnquiryModal from './EnquiryModal';
import MarbalBg from './assets/marbal.png';

function MarbleCTA() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    "Consistent Quality",
    "Technical Expertise",
    "On-Time Delivery",
    "Customer-Focused Approach"
  ];

  return (
    <>
      <div className="marble-cta-wrapper">
        <div className="about-container">
          <motion.div
            className="marble-cta-card"
            style={{ backgroundImage: `url(${MarbalBg})` }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Content Side */}
            <div className="marble-cta__left">
              <h2 className="marble-cta__title">
                Let's Build Stronger,<br />Brighter Solutions Together
              </h2>
              <p className="marble-cta__desc">
                Partner with us for reliable quartz solutions tailored to your industry's unique needs.
              </p>

              <div className="marble-cta__actions">
                {/* Opens the Enquiry Modal popup */}
                <button className="btn-request" onClick={() => setIsModalOpen(true)}>
                  Request a Quote
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                {/* Navigates directly to the contact page */}
                <button className="btn-contact" onClick={() => navigate('/contact')}>
                  Contact Us
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Floating List Side */}
            <div className="marble-cta__right">
              <div className="why-choose-box">
                <h3 className="why-choose-box__title">Why Choose Us?</h3>
                <ul className="why-choose-box__list">
                  {features.map((text, idx) => (
                    <li key={idx} className="why-choose-box__item">
                      <div className="check-icon-wrap">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="why-choose-box__text">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controlled Popup Portal Context */}
      <AnimatePresence>
        {isModalOpen && (
          <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default MarbleCTA;