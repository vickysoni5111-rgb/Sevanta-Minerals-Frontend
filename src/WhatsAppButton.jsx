import React from "react";
import { motion } from "framer-motion";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  const phoneNumber = "918302099553"; // country code ke saath, + aur spaces ke bina
  const message = "Hi! I'm interested in your quartz products. Can you share more details?";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Chat with us on WhatsApp"
    >
      <span className="whatsapp-float__pulse"></span>
      <svg viewBox="0 0 32 32" className="whatsapp-float__icon">
        <path
          fill="currentColor"
          d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.607 1.903 6.47L4 29l7.73-1.87A11.94 11.94 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3zm0 21.818a9.77 9.77 0 0 1-4.98-1.363l-.357-.213-4.59 1.11 1.127-4.47-.234-.366A9.78 9.78 0 0 1 6.182 15c0-5.42 4.4-9.818 9.819-9.818S25.818 9.58 25.818 15 21.42 24.818 16.001 24.818zm5.4-7.34c-.296-.148-1.75-.864-2.022-.963-.271-.099-.469-.148-.667.148-.198.296-.766.963-.94 1.161-.173.198-.346.223-.642.075-.296-.148-1.25-.461-2.382-1.47-.88-.785-1.474-1.755-1.647-2.051-.173-.296-.018-.456.13-.604.134-.133.296-.346.444-.519.148-.173.198-.296.296-.494.099-.198.05-.371-.025-.519-.074-.148-.667-1.607-.914-2.202-.24-.578-.485-.5-.667-.51-.173-.008-.371-.01-.568-.01a1.09 1.09 0 0 0-.79.371c-.271.296-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.073.148.198 2.096 3.2 5.08 4.489.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.75-.716 1.997-1.407.247-.692.247-1.285.173-1.408-.074-.123-.271-.198-.568-.346z"
        />
      </svg>
    </motion.a>
  );
}