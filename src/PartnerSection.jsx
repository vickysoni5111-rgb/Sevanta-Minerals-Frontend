import React, { useState } from "react";
import { motion } from "framer-motion";
import "./PartnerSection.css";
import EnquiryModal from "./EnquiryModal";

import AsianQuartzBg from "./assets/asian-quartz.png";

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export default function PartnerSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      className="partner-section"
      style={{ backgroundImage: `url(${AsianQuartzBg})` }}
    >
      <motion.div
        className="partner-section__overlay"
        variants={overlayVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      />

      <div className="partner-section__content">
        <motion.h2
          className="partner-section__heading"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          Partner with Us for
          <br />
          High-Performance Quartz Solutions
        </motion.h2>

        <motion.button
          className="partner-section__btn"
          variants={buttonVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsModalOpen(true)}
        >
          Enquiry
        </motion.button>
      </div>

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}