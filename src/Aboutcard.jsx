import React from 'react';
import './AboutCard.css';

/*
  Images are hosted directly (Unsplash CDN) — no local files needed,
  no import errors. Jab tumhare paas apni real photos ho jayein,
  bas neeche defaultProps me primaryImage / badgeImage ki value
  apne image path se replace kar dena (e.g. './assets/plant.jpg').
*/
const DEFAULT_PRIMARY_IMG =
  'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=1200&q=80';
const DEFAULT_BADGE_IMG =
  'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&w=800&q=80';

/*
  Usage:
  <AboutCard
    eyebrow="ABOUT SEVANTA MINERALS"
    heading="Mines Owner & Minerals Processing Company in Rajasthan"
    description="We are committed to delivering world-class mineral powders with high purity, consistency, and reliability backed by advanced technology and a skilled team."
    ctaText="Know More About Us"
    ctaHref="/about"
  />

  Sab props optional hain — agar nahi doge to default content dikhega jo neeche defaultProps me hai.
*/

const defaultFeatures = [
  {
    title: 'Advanced Processing\nTechnology',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M4.2 7.5l2.6 1.5M17.2 15l2.6 1.5M4.2 16.5l2.6-1.5M17.2 9l2.6-1.5" />
      </svg>
    ),
  },
  {
    title: 'Sustainable\nPractices',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3c-4 3-6 6-6 10a6 6 0 0 0 12 0c0-4-2-7-6-10Z" />
        <path d="M12 13v6" />
      </svg>
    ),
  },
  {
    title: 'Global Quality\nStandards',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="9" r="5" />
        <path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5" />
      </svg>
    ),
  },
];

function AboutCard({
  eyebrow = 'ABOUT SEVANTA MINERALS',
  heading = 'Mines Owner & Minerals Processing Company in Rajasthan',
  description = "We are committed to delivering world-class mineral powders with high purity, consistency, and reliability backed by advanced technology and a skilled team.",
  features = defaultFeatures,
  ctaText = 'Know More About Us',
  ctaHref = '/about',
  primaryImage = DEFAULT_PRIMARY_IMG,
  badgeImage = DEFAULT_BADGE_IMG,
  primaryImageAlt = 'Processing plant and mineral stockpiles',
  badgeImageAlt = 'Quality testing in lab',
}) {
  return (
    <section className="about-card">
      <div className="about-card__media">
        <div className="about-card__primary-wrap">
          <img
            src={primaryImage}
            alt={primaryImageAlt}
            className="about-card__primary-img"
          />
        </div>
        <div className="about-card__badge-wrap">
          <img
            src={badgeImage}
            alt={badgeImageAlt}
            className="about-card__badge-img"
          />
        </div>
      </div>

      <div className="about-card__content">
        <span className="about-card__eyebrow">{eyebrow}</span>
        <h2 className="about-card__heading">{heading}</h2>
        <p className="about-card__description">{description}</p>

        <ul className="about-card__features">
          {features.map((f, idx) => (
            <li className="about-card__feature" key={idx}>
              <span className="about-card__feature-icon">{f.icon}</span>
              <span className="about-card__feature-title">
                {f.title.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < f.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            </li>
          ))}
        </ul>

        <a href={ctaHref} className="about-card__cta">
          {ctaText}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="about-card__cta-arrow">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}

export default AboutCard;