import React from "react";
import { motion } from "framer-motion";
import "./KeyHighlights.css";

import PrecisionAtScale from "./assets/Precision-at-Scale.png";
import ReliableSupply from "./assets/reliable-supply.png";
import ApplicationDriven from "./assets/Application-Driven.png";
import ConsistentPurity from "./assets/Consistent-Purity.png";
import TechnicalLeadership from "./assets/technical-leadership.png";
import FoundryRefractories from "./assets/foundry-and-refractories.png";

const highlights = [
  {
    image: PrecisionAtScale,
    title: "Precision at Scale",
    description:
      "Fully integrated plant with advanced European grinding and classification systems.",
  },
  {
    image: ReliableSupply,
    title: "Reliable Supply",
    description:
      "25+ TPH across product streams ensuring unmatched consistency and scalability.",
  },
  {
    image: ApplicationDriven,
    title: "Application-Driven",
    description:
      "Products tailored to the specific performance needs of industries worldwide.",
  },
  {
    image: ConsistentPurity,
    title: "Consistent Purity",
    description:
      "Fe\u2082O\u2083 consistently <0.01%, with further reduction through advanced beneficiation.",
  },
  {
    image: TechnicalLeadership,
    title: "Technical Leadership",
    description:
      "Decades of expertise across mineral processing, beneficiation, and industrial applications.",
  },
  {
    image: FoundryRefractories,
    title: "Foundry & Refractories",
    description:
      "Specialized grades engineered for high-temperature foundry and refractory applications.",
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function KeyHighlights() {
  return (
    <section className="keyhighlights-wrapper">
      <div className="keyhighlights">
        <motion.div
          className="keyhighlights__header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="keyhighlights__eyebrow">Why Sevanta Minerals</p>
          <h2 className="keyhighlights__heading">
            Built on Precision, Trusted for Scale
          </h2>
        </motion.div>

        <div className="keyhighlights__grid">
          {highlights.map((item, index) => (
            <motion.div
              className="keyhighlights__card"
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="keyhighlights__imagewrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="keyhighlights__img"
                />
                <div className="keyhighlights__overlay" />
                <div className="keyhighlights__content">
                  <h3 className="keyhighlights__title">{item.title}</h3>
                  <p className="keyhighlights__desc">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}