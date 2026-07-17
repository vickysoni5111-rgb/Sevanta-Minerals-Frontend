import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logoImg from './assets/Logo.png';
import EnquiryModal from './EnquiryModal';
import './Navbar.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get Quote button -> opens EnquiryModal (isOpen / onClose props)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const navigate = useNavigate();

  // Dynamic Dropdown Data for SEO Friendly Routing
  const productItems = [
    { name: 'Quartz Powder 200 Mesh', path: '/products/quartz-powder-200-mesh' },
    { name: 'Quartz Powder 250 Mesh', path: '/products/quartz-powder-250-mesh' },
    { name: 'Quartz Powder 300 Mesh', path: '/products/quartz-powder-300-mesh' },
  ];

  const galleryItems = [
    { name: 'Mines View', path: '/gallery/mines' },
    { name: 'Machinery & Plant', path: '/gallery/machinery' },
    { name: 'Production Line', path: '/gallery/production' },
    { name: 'Packaging & Dispatch', path: '/gallery/packaging' },
  ];

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleGetQuoteClick = () => {
    setMobileMenuOpen(false);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      <nav className={`premium-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">

          {/* SEO Optimized Brand Logo */}
          <Link to="/" className="nav-logo-link" onClick={() => setMobileMenuOpen(false)}>
            <img src={logoImg} alt="Sevanta Overseas Logo" className="nav-logo" />
            <div className="logo-text">
              <span className="brand-main">Sevanta</span>
              <span className="brand-sub">Minerals</span>
            </div>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span></span><span></span><span></span>
          </button>

          {/* Backdrop overlay for mobile menu */}
          <div
            className={`nav-overlay ${mobileMenuOpen ? 'visible' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Navigation Links */}
          <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active-tab' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active-tab' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>About Us</NavLink>
            </li>

            {/* Dynamic Dropdown: Products */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle">
                Products <i className="chevron-icon"></i>
              </span>
              <ul className="dropdown-menu">
                {productItems.map((item, idx) => (
                  <li key={idx}>
                    <NavLink to={item.path} className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/quality" className={({ isActive }) => isActive ? 'nav-link active-tab' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>Quality</NavLink>
            </li>

            {/* Dynamic Dropdown: Gallery */}
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle">
                Gallery <i className="chevron-icon"></i>
              </span>
              <ul className="dropdown-menu">
                {galleryItems.map((item, idx) => (
                  <li key={idx}>
                    <NavLink to={item.path} className="dropdown-item" onClick={() => setMobileMenuOpen(false)}>
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active-tab' : 'nav-link'} onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
            </li>

            {/* CTA Get Quote Button inside Menu for Responsive Devices */}
            <li className="nav-item cta-mobile-only">
              <button className="nav-quote-btn" onClick={handleGetQuoteClick}>
                Get Quote
              </button>
            </li>
          </ul>

          {/* Action Button for Desktop Layout */}
          <div className="nav-actions">
            <button className="nav-quote-btn desktop-only" onClick={handleGetQuoteClick}>
              Get Quote
            </button>
          </div>

        </div>
      </nav>

      <EnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}

export default Navbar;