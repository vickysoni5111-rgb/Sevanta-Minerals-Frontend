import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsSection.css';

// Custom CountUp hook for the scroll animation numbers
const AnimatedCounter = ({ from = 0, to, duration = 2, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Smooth easing out formula
      const easeProgress = 1 - Math.pow(1 - progress, 3); 
      const currentCount = easeProgress * (to - from) + from;
      
      setCount(currentCount.toFixed(decimals));

      if (progress < 1) {
        window.requestAnimationFrame(animate);
      }
    };

    window.requestAnimationFrame(animate);
  }, [isInView, to, from, duration, decimals]);

  return <span ref={ref}>{count}{suffix}</span>;
};

function StatsSection() {
  const statsData = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34M12 2a5 5 0 0 0-5 5v3c0 2.2 1.8 4 4 4h2c2.2 0 4-1.8 4-4V7a5 5 0 0 0-5-5z"/>
        </svg>
      ),
      countComp: <AnimatedCounter to={25} suffix="+" />,
      label: "Years of Experience"
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 2h4M19 22H5c-1.1 0-1.8-1.2-1.2-2.1L9 10.5V5h6v5.5l5.2 9.4c.6.9-.1 2.1-1.2 2.1zM6.5 18h11M11 13h2"/>
        </svg>
      ),
      countComp: <AnimatedCounter to={99.9} decimals={1} suffix="%" />,
      label: "High Purity"
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" />
        </svg>
      ),
      countComp: <AnimatedCounter to={40} suffix="+" />,
      label: "Countries Served"
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M17 21v-4a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v4M12 3l4 4 4-4M16 7v14M9 7H3M9 11H3M23 21v-2a3 3 0 0 0-3-3h-2" />
        </svg>
      ),
      countComp: <AnimatedCounter to={1000} suffix="+" />,
      label: "Satisfied Clients"
    }
  ];

  return (
    <div className="stats-section-wrapper">
      <div className="about-container">
        <motion.div 
          className="stats-container-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {statsData.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="stats-item-node">
                <div className="stats-item-node__icon-wrap">
                  {item.icon}
                </div>
                <div className="stats-item-node__info">
                  <h3 className="stats-item-node__number">
                    {item.countComp}
                  </h3>
                  <p className="stats-item-node__label">{item.label}</p>
                </div>
              </div>
              {index < statsData.length - 1 && <div className="stats-divider-line" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default StatsSection;