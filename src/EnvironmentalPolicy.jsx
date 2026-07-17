import React from 'react';
import { motion } from 'framer-motion';
import './EnvironmentalPolicy.css';

// Aapki image ka path yahan handle kijiye
import PolicyImg from './assets/earth2.png'; 

function EnvironmentalPolicy() {
  const policies = [
    {
      title: "Sustainable Mining",
      desc: "Selective extraction processes that maintain deposit integrity to maximize resource recovery and minimize waste generation."
    },
    {
      title: "Air Emission Control",
      desc: "State-of-the-art HIM Enviro dust collection and suppression systems to ensure zero fugitive emissions (Partner Tech)."
    },
    {
      title: "Waste Management",
      desc: "Strict segregation and responsible disposal or recycling of all industrial and hazardous waste."
    }
  ];

  return (
    <section className="env-policy-section">
      <div className="about-container">
        <div className="env-policy-grid">
          
          {/* Left Side: Premium Image Container */}
          <motion.div 
            className="env-policy__image-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={PolicyImg} alt="Environmental Policy" className="env-policy__img" />
            {/* Soft decorative border border layer to keep the luxury vibe */}
            <div className="env-policy__image-overlay" />
          </motion.div>

          {/* Right Side: Content Content Box */}
          <motion.div 
            className="env-policy__content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <span className="env-policy__badge">Our Commitment</span>
            <h2 className="env-policy__title">Environmental Policy</h2>
            
            <div className="env-policy__list">
              {policies.map((item, index) => (
                <div key={index} className="env-policy__card">
                  <div className="env-policy__card-number">0{index + 1}</div>
                  <div className="env-policy__card-body">
                    <h3 className="env-policy__card-title">{item.title}</h3>
                    <p className="env-policy__card-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default EnvironmentalPolicy;