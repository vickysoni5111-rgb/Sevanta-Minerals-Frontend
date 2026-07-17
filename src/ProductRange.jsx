import React from "react";
import { motion } from "framer-motion";
import "./ProductRange.css";

import Pic1 from "./assets/pic1.png";
import Pic2 from "./assets/pic2.png";
import Pic3 from "./assets/pic3.png";
import Marbal from "./assets/marbal.png";
import Refractories from "./assets/refractories.png";
import SpecializedFractions from "./assets/specialized-fractions.png";
import Salt from "./assets/salt.png";
import Rocks from "./assets/rocks.png";
import FineQuartzPowder from "./assets/fine-quartz-powder.png";

const products = [
  {
    image: Pic1,
    title: "Quartz Grits",
   
    description:
      "High-purity, snow-white grains for engineered stone and ceramics.",
  },
  {
    image: Pic2,
    title: "Micronized Silica",

    description:
      "Free-flowing micronized silica for paints, adhesives, and specialty fillers.",
  },
  {
    image: FineQuartzPowder,
    title: "Fine Quartz Powder",
  
    description:
      "Ultra-fine, consistent powder for coatings and high-performance formulations.",
  },
  {
    image: Pic3,
    title: "Application-Specific Blends",
  
    description:
      "Custom-formulated blends engineered to match specific industry requirements.",
  },
  {
    image: Marbal,
    title: "Marble Aggregates",
   
    description:
      "Calibrated marble grits and powder for terrazzo, flooring, and decorative finishes.",
  },
  {
    image: Refractories,
    title: "Refractory Grade Silica",
  
    description:
      "Engineered silica grades built to withstand extreme thermal and mechanical stress.",
  },
  {
    image: SpecializedFractions,
    title: "Specialized Fractions",
   
    description:
      "Precision-engineered size ranges optimized for resin flow and compaction.",
  },
  {
    image: Salt,
    title: "Industrial Salt Grades",

    description:
      "Processed salt grades suited for water treatment, de-icing, and chemical applications.",
  },
  {
    image: Rocks,
    title: "Quartz Rocks & Lumps",
  
    description:
      "Raw quartz lumps sourced for crushing, grinding, and further beneficiation.",
  },
];

/* ---------- Smooth premium animation ---------- */
const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ProductRange() {
  return (
    <section className="productrange-wrapper">
      <div className="productrange">
        <motion.div
          className="productrange__header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <p className="productrange__eyebrow">Our Product Range</p>
          <h2 className="productrange__heading">
            Engineered Grades for Every Application
          </h2>
        </motion.div>

        <div className="productrange__grid">
          {products.map((item, index) => (
            <motion.div
              className="productrange__card"
              key={item.title}
              custom={index % 3}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.15,
                margin: "0px 0px -80px 0px",
              }}
            >
              <div className="productrange__imagewrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="productrange__img"
                />
    
              </div>

              <div className="productrange__body">
                <h3 className="productrange__title">{item.title}</h3>
                <p className="productrange__desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}