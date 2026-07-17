import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Footer.css";

import Logo from "./assets/Logo.png";
import CertifiedLogo from "./assets/certifiedlogo.png";

/* ---------------- Animation ---------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* ---------------- Footer Links ---------------- */

const quickLinks = [
  { label: "Services" },
  { label: "Products" },
  { label: "Portfolio" },
  { label: "About Us" },
];

const companyLinks = [
  { label: "Careers" },
  { label: "Blog" },
  { label: "Terms of Service" },
  { label: "Contact Us" },
];

/* ---------------- Scroll Top ---------------- */

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/* ---------------- Icons ---------------- */

const MailIcon = () => (
  <svg
    className="footer__icon"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M4 6.5L12 13L20 6.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="footer__icon"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6.5 3h2.2c.4 0 .77.28.87.67l.86 3.3a.9.9 0 0 1-.24.87L8.6 9.4a13 13 0 0 0 6 6l1.56-1.6a.9.9 0 0 1 .87-.23l3.3.86c.4.1.67.47.67.87v2.2c0 1-.83 1.8-1.83 1.72C11.4 18.7 5.3 12.6 4.8 4.83 4.73 3.83 5.5 3 6.5 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* -------- NEW LOCATION ICON -------- */

const LocationIcon = () => (
  <svg
    className="footer__icon"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 21s-6-5.33-6-11a6 6 0 1 1 12 0c0 5.67-6 11-6 11Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="12"
      cy="10"
      r="2.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
    >
      <div className="footer__inner">
                {/* ================= Brand ================= */}

        <motion.div
          className="footer__col footer__brand"
          variants={itemVariants}
        >
          <img
            src={Logo}
            alt="Sevanta Minerals"
            className="footer__logo"
            loading="lazy"
            width="130"
            height="130"
          />

          <p className="footer__tagline">
            Fine Powder. Superior Quality.
          </p>
        </motion.div>

        {/* ================= Contact ================= */}

        <motion.div
          className="footer__col"
          variants={itemVariants}
        >
          <h4 className="footer__heading">
            Contact
          </h4>

          <ul className="footer__contact">

            <li>
              <MailIcon />

              <a href="mailto:Sevantaminerals@gmail.com">
              Sevantaminerals@gmail.com
              </a>
            </li>

            <li>
              <PhoneIcon />

              <a href="tel:+919829219159">
                +91 8302099553
              </a>
            </li>

          </ul>
        </motion.div>

        {/* ================= Quick Links ================= */}

        <motion.div
          className="footer__col"
          variants={itemVariants}
        >
          <h4 className="footer__heading">
            Quick Links
          </h4>

          <ul className="footer__links">

            {quickLinks.map((item) => (

              <li key={item.label}>

                <Link
                  to={item.href}
                  onClick={scrollToTop}
                >
                  {item.label}
                </Link>

              </li>

            ))}

          </ul>

        </motion.div>
                {/* ================= Company ================= */}

        <motion.div
          className="footer__col"
          variants={itemVariants}
        >
          <h4 className="footer__heading">
            Company
          </h4>

          <ul className="footer__links">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  onClick={scrollToTop}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ================= Registered Office ================= */}

        <motion.div
          className="footer__col"
          variants={itemVariants}
        >
          <h4 className="footer__heading">
            Regd. Office
          </h4>

          <div className="footer__office">

            <div className="footer__office-item">

              <LocationIcon />

              <div className="footer__address">

                <strong>Sevanta Minerals</strong>

                <span>
               Plot No. 15, Nandawat
                </span>

                <span>
                  Behind Shree Ram Industries,
                  Near Dwarkadhish Hotel
                </span>

                <span>
                  Nandawat, Bhim
                </span>

                <span>
                  District : Rajsamand
                </span>

                <span>
                  Rajasthan - 305921
                </span>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ================= Bottom Bar ================= */}

      <motion.div
        className="footer__bottom"
        variants={itemVariants}
      >

        <div className="footer__bottom-inner">

          <p className="footer__copyright">
            {new Date().getFullYear()} Sevanta Minerals Always With Your Aim
          </p>

          <div className="footer__certified">

            <img
              src={CertifiedLogo}
              alt="ISO Certified"
              className="footer__certified-logo"
              loading="lazy"
            />

          </div>

        </div>

      </motion.div>

    </motion.footer>
  );
}
   