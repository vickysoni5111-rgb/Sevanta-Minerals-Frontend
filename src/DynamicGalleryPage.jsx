import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { galleryTypes } from './gallery';
import './DynamicGalleryPage.css';
import { Helmet } from 'react-helmet-async';
// Images src/assets/ folder me hain, aur ye component src/ me directly hai,
// isliye './assets/...' se import ho rahi hain.
import industryImg from './assets/industry.png';

// Sliding "Materials We Deliver" section
import engineeredStoneImg from './assets/engineered-stone.png';
import tableTopImg from './assets/table-top.png';
import detergentImg from './assets/detergent.png';
import ceramicsImg from './assets/ceramics.png';
import rocksImg from './assets/rocks.png';
import saltImg from './assets/salt.png';
import pic1Img from './assets/pic1.png';
import c1Img from './assets/c1.png';

// "Industries We Serve" cards
import constructionImg from './assets/construction.png';
import chemAdhesivesImg from './assets/construction-chemicals-and-adhesives.png';
import glassImg from './assets/glass.png';
import rubberImg from './assets/rubber.png';

// "Quality You Can Trust" cards
import retImg from './assets/ret.png';
import techLeadershipImg from './assets/technical-leadership.png';
import consistentPurityImg from './assets/Consistent-Purity.png';
import qualityAssuranceImg from './assets/quality-assurance.png';
import collectionImg from './assets/collection1.png';

// Final golden "Global" section
import globalseveImg from './assets/globalseve1.png';

// Machinery page — hero + service cards
import aboutImg from './assets/about.png';
import vechalImg from './assets/vechal.png';
import bottomImg from './assets/bottom.png';
import topcoatsImg from './assets/Industrial-topcoats.png';

// Machinery page — feature strip + import/export card
import refractoriesImg from './assets/refractories.png';
import specialtyAppImg from './assets/specility-application.png';
import paintsCoatingsImg from './assets/paints-coatings-and-inks.png';
import truckImg from './assets/truck11.png';

// Packaging page — hero, range grid, process, transport card
import guttiImg from './assets/gutti.png';
import landImg from './assets/land1.png';
import transportImg from './assets/transport.png';

// Packaging page — capability strip (plain image grid, no overlay text)
import foundryRefractoriesImg from './assets/foundry-and-refractories.png';

// Packaging page — closing 3-card section
import transport1Img from './assets/transport11.png';
import reliableSupplyImg from './assets/reliable-supply.png';

// Production page — full-height hero + industry detail cards
import mainPageImg from './assets/image.png';
import decoreImg from './assets/decore.png';
import engineeredStonesSurfaceImg from './assets/engineered-stones-surface.png';
import ceramicsDetailImg from './assets/c.png';
import paintsAndCoatingsDetailImg from './assets/paints-and-coatings.png';
import glassSpecialtyDetailImg from './assets/glass-and-specialty-glass.png';
import fiberglassImg from './assets/fiberglass-large1.png';
import constructionChemAdhesivesLargeImg from './assets/construction-chemicals-and-adhesives-large.png';
import plasticsImg from './assets/plastics.png';
import oilfieldHydraulicImg from './assets/oilfield-and-hydraulic-fracturing.png';

// 🎯 SEO — har gallery type ka apna unique title + description (Google ke liye zaroori)
const gallerySEO = {
  mines: {
    title: "Mines & Extraction Sites | Sevanta Minerals Quartz Mining",
    desc: "Explore Sevanta Minerals' active quartz mining sites in Rajasthan, delivering high-purity raw material for global industries."
  },
  machinery: {
    title: "Machinery & Plant Infrastructure | Sevanta Minerals",
    desc: "See the advanced processing machinery and plant infrastructure behind Sevanta Minerals' high-purity quartz powder production."
  },
  production: {
    title: "Production Line & Quartz Processing | Sevanta Minerals",
    desc: "From raw ore to refined quartz powder - explore Sevanta Minerals' full production process for 200/250/300 mesh grades."
  },
  packaging: {
    title: "Packaging & Dispatch | Sevanta Minerals Quartz Powder",
    desc: "Reliable packaging and on-time dispatch of quartz powder shipments by Sevanta Minerals, serving global industrial buyers."
  }
};

// Har gallery type ke liye alag hero content.
// Naya type add karna ho to yaha aur gallery.js dono me entry add karo.
const galleryContent = {
  mines: {
    tag: 'Extraction',
    heading: 'Mines View',
    desc: 'Real-time high resolution captures from our active mining sites — where raw material begins its journey to purity.',
  },
  machinery: {
    tag: 'Infrastructure',
    heading: 'Machinery & Plant',
    desc: 'A closer look at the heavy machinery and plant infrastructure that keeps our production running at scale.',
    desc2: 'From material handling to protective finishing, every piece of equipment is maintained to keep output consistent, safe, and on schedule — powering Sevanta Overseas from mine to market.',
  },
  production: {
    tag: 'Processing',
    heading: 'Production Line',
    desc: 'From raw ore to refined output — a visual record of our production line in motion.',
    desc2: 'Every batch is graded, ground, and purified to meet the exact specification each industry demands — from engineered stone to specialty electronics.',
  },
  packaging: {
    tag: 'Dispatch',
    heading: 'Packaging & Dispatch',
    desc: 'Every shipment leaves our facility packaged for precision and dispatched with reliability, on time, every time.',
    desc2: 'From jumbo bags to palletized loads, each consignment is checked, sealed, and secured to survive the journey — protecting purity from our plant to your production line.',
  },
};

// Slider cards — inhe yaha se hi manage karo, JSX me kahi aur nahi.
// Naya card add karna ho to bas yaha ek object add kar do, automatically
// slider me shamil ho jayega.
const sliderCards = [
  { img: engineeredStoneImg, title: 'Engineered Stone' },
  { img: tableTopImg, title: 'Table Top' },
  { img: detergentImg, title: 'Detergent Grade' },
  { img: ceramicsImg, title: 'Ceramics Grade' },
  { img: rocksImg, title: 'Rock Deposits' },
  { img: saltImg, title: 'Industrial Salt' },
  { img: pic1Img, title: 'Quartz Powder' },
  { img: c1Img, title: 'Processed Minerals' },
];

// Static cards — "Industries We Serve" row
const industryCards = [
  { img: constructionImg, title: 'Construction' },
  { img: chemAdhesivesImg, title: 'Chemicals & Adhesives' },
  { img: glassImg, title: 'Glass' },
  { img: rubberImg, title: 'Rubber' },
];

// Static cards — "Quality You Can Trust" row
const qualityCards = [
  { img: retImg, title: 'Raw Material Sourcing' },
  { img: techLeadershipImg, title: 'Technical Leadership' },
  { img: consistentPurityImg, title: 'Consistent Purity' },
  { img: qualityAssuranceImg, title: 'Quality Assurance' },
  { img: collectionImg, title: 'Collection Excellence' },
];

// Machinery page — service cards (image + title + short description)
const machineryServices = [
  {
    img: vechalImg,
    title: 'Fleet & Logistics',
    desc: 'Our dedicated vehicle fleet moves raw material from mine to plant without delay, keeping every stage of production on schedule.',
  },
  {
    img: bottomImg,
    title: 'Material Handling',
    desc: 'Purpose-built handling equipment manages heavy loads with precision, reducing waste and keeping operations running safely.',
  },
  {
    img: topcoatsImg,
    title: 'Industrial Topcoats',
    desc: 'Protective industrial coatings extend the life of our machinery, guarding critical components against wear in demanding conditions.',
  },
];

// Machinery page — light feature strip (icon + title + short line)
const machineryFeatures = [
  {
    img: refractoriesImg,
    title: 'Refractories',
    desc: 'Engineered to withstand extreme heat in furnaces and kilns.',
  },
  {
    img: specialtyAppImg,
    title: 'Specialty Applications',
    desc: 'Tailored formulations built around specific technical needs.',
  },
  {
    img: paintsCoatingsImg,
    title: 'Paints, Coatings & Inks',
    desc: 'High-purity fillers for texture, durability, and finish.',
  },
];

// Packaging page — "Packaging Across Every Material" grid
// (reuses the same pq-card design as Industries/Quality grids)
const packagingCards = [
  { img: guttiImg, title: 'Stone Chips (Gutti)' },
  { img: retImg, title: 'Sand & Aggregates' },
  { img: landImg, title: 'Mining Land Reserves' },
  { img: ceramicsImg, title: 'Ceramics Grade' },
  { img: tableTopImg, title: 'Table Top Finish' },
];

// Packaging page — 6-step process, each with a small inline icon
const packagingProcessSteps = [
  {
    title: 'Product Check',
    desc: 'Quality inspection before packaging.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.35-4.35" />
        <path d="M9 11l1.5 1.5L14 9" />
      </svg>
    ),
  },
  {
    title: 'Weighing',
    desc: 'Accurate weight measurement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3" />
        <path d="M4 6h16" />
        <path d="M6 6l-3 7a3 3 0 0 0 6 0z" />
        <path d="M18 6l-3 7a3 3 0 0 0 6 0z" />
        <path d="M9 21h6" />
        <path d="M12 9v12" />
      </svg>
    ),
  },
  {
    title: 'Packing',
    desc: 'Packed in high quality bags.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8l-9-5-9 5 9 5 9-5z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </svg>
    ),
  },
  {
    title: 'Sealing',
    desc: 'Sealed for safety & protection.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        <path d="M12 14v3" />
      </svg>
    ),
  },
  {
    title: 'Palletizing',
    desc: 'Neatly arranged on wooden pallets.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Loading',
    desc: 'Loaded carefully for safe delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
        <path d="M13 9h4l4 4v3h-8" />
        <circle cx="7.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    ),
  },
];

// Packaging page — capability strip cards (plain image, no overlay text)
const capabilityCards = [
  { img: qualityAssuranceImg, title: 'Quality Assurance' },
  { img: techLeadershipImg, title: 'Technical Leadership' },
  { img: foundryRefractoriesImg, title: 'Foundry & Refractories' },
  { img: paintsCoatingsImg, title: 'Paints, Coatings & Inks' },
];

// Packaging page — closing 3-card section
const packagingClosingCards = [
  {
    img: transport1Img,
    title: 'Reliable Fleet Network',
    desc: 'A dedicated fleet moves every consignment across routes, keeping delivery timelines predictable regardless of distance.',
  },
  {
    img: aboutImg,
    title: 'Who We Are',
    desc: 'Sevanta Overseas brings together mining, processing, and logistics under one roof, built on decades of hands-on industry experience.',
  },
  {
    img: reliableSupplyImg,
    title: 'Reliable Supply Chain',
    desc: 'From raw material to final dispatch, our supply chain is structured for consistency — so every order arrives complete and on time.',
  },
];

// Production page — industry detail cards (image + Need/Role/Solution + features)
const productionIndustries = [
  {
    img: engineeredStonesSurfaceImg,
    title: 'Engineered Stones / Quartz Surfaces',
    need: "Manufacturers of artificial quartz slabs require high-purity aggregates that offer depth, clarity, and absolute colour consistency to replicate natural stone like marble or granite. Any contamination (black spots) results in slab rejection.",
    role: 'Quartz makes up 90-93% of an engineered stone slab. It provides the hardness (7 Mohs), scratch resistance, and the primary visual aesthetic of the surface.',
    solution: 'We supply optically sorted Quartz Grits and Filler Powder (325 Mesh) optimized for slab production.',
    features: [
      { label: 'Zero Black Spots', desc: "Our Tomra (Norway) optical sorting technology removes dark impurities, essential for 'Super White' and 'Calacatta' designs." },
      { label: 'Translucency', desc: 'High-transparency grains create a "3D depth effect" in the slab, mimicking natural stone veins.' },
      { label: 'Resin Economy', desc: 'Our engineered particle shapes reduce resin absorption, lowering binder costs for manufacturers.' },
      { label: 'Precision Sizing', desc: 'Our Allgaier (Germany) screening ensures no "oversize" particles that could cause surface defects.' },
    ],
  },
  {
    img: ceramicsDetailImg,
    title: 'Ceramics & Sanitaryware',
    need: 'The ceramic industry requires raw materials that maintain structural integrity under high firing temperatures and ensure the whiteness of the final body.',
    role: 'Silica acts as a "skeleton" in the ceramic body to prevent warping during firing and serves as a primary glass-former in glazes and frits.',
    solution: 'We provide Fine Quartz Powder (200, 300, 325 Mesh) with high chemical purity.',
    features: [
      { label: 'Thermal Stability', desc: 'High SiO₂ content (>99.5%) prevents cracking and deformation during the kiln firing process.' },
      { label: 'Whiteness', desc: 'Low iron content ensures the bright whiteness required for premium sanitaryware.' },
      { label: 'Glaze Durability', desc: 'Increases the hardness and scratch resistance of ceramic glazes.' },
      { label: 'Consistent Fineness', desc: 'Our air-classified powder ensures excellent dispersion in the ceramic slurry.' },
    ],
  },
  {
    img: paintsAndCoatingsDetailImg,
    title: 'Paints, Coatings & Inks',
    need: 'The coatings industry demands functional fillers (extenders) that improve durability, brightness, and texture without altering the chemical formulation or colour of the paint.',
    role: 'Acts as reinforcing filler that enhances the mechanical properties of the paint film, including scrub resistance and weatherability.',
    solution: 'We offer the SilQ™ Series and Micronized Powder (500 Mesh).',
    features: [
      { label: 'Scrub Resistance', desc: 'The natural hardness (7 Mohs) of quartz significantly improves the abrasion resistance of wall paints.' },
      { label: 'Brightness', desc: 'High L-value (>96) ensures clean, bright colors and reduces the need for expensive titanium dioxide (TiO₂).' },
      { label: 'Sheen Control', desc: 'Engineered particle sizing helps control gloss levels in semi-gloss and matte finishes.' },
      { label: 'Weatherability', desc: 'Chemically inert silica resists UV degradation and acid rain, making it ideal for exterior paints.' },
    ],
  },
  {
    img: glassSpecialtyDetailImg,
    title: 'Glass & Specialty Glass',
    need: 'Glass manufacturing requires silica sand with ultra-low trace impurities. Even minute amounts of Iron (Fe) can cause green or yellow tinting, which is unacceptable for high-clarity glass.',
    role: 'It determines the transparency, strength, and thermal resistance of the final glass product.',
    solution: 'We supply High-Purity Quartz with strictly controlled iron levels.',
    features: [
      { label: 'Optical Clarity', desc: 'Fe₂O₃ < 0.01% ensures clear, colourless glass for premium applications.' },
      { label: 'Solar Transmission', desc: 'Ideal for solar panel glass (photovoltaic) where maximum light transmission efficiency is critical.' },
      { label: 'Defect-Free Melting', desc: 'High chemical purity prevents inclusions and bubbles in the glass melt.' },
    ],
  },
  {
    img: fiberglassImg,
    title: 'Fiberglass',
    need: 'Fiberglass production requires silica with consistent melting properties and specific chemical purity to draw fine, strong fibers for reinforcement.',
    role: 'Ground silica is the main component in the glass batch, providing the SiO₂ matrix that gives the fiber its tensile strength. It is used in glass fiber for reinforced plastics (FRP), glass wool for insulation and high-strength fiberglass mats and fabrics.',
    solution: '',
    features: [
      { label: 'Melting Efficiency', desc: 'Consistent particle size distribution ensures uniform melting in the furnace.' },
      { label: 'Chemical Purity', desc: 'Controlled levels of alkalis and iron ensure the mechanical strength of the glass fibers.' },
    ],
  },
  {
    img: refractoriesImg,
    title: 'Foundry & Refractories',
    need: 'Foundries require mold materials that can withstand the extreme heat of molten metal without breaking down or reacting chemically.',
    role: 'Quartz sand is used to make molds and cores because of its high melting point and thermal stability.',
    solution: '',
    features: [
      { label: 'Thermal Shock Resistance', desc: 'Our high-purity quartz withstands extreme thermal cycling during metal pouring.' },
      { label: 'Shape', desc: 'The grain shape allows for good permeability, letting gases escape during casting to prevent defects.' },
    ],
  },
  {
    img: constructionChemAdhesivesLargeImg,
    title: 'Construction Chemicals & Adhesives',
    need: 'Modern construction materials like tile adhesives and grouts require aggregates that provide mechanical strength and bonding capability.',
    role: 'Quartz serves as a durable aggregate that reinforces the matrix of epoxy and cement-based products.',
    solution: '',
    features: [
      { label: 'Compressive Strength', desc: 'Improves the load-bearing capacity of repair mortars and flooring screeds.' },
      { label: 'Abrasion Resistance', desc: 'Makes epoxy flooring and grouts resistant to wear and tear.' },
      { label: 'Chemical Inertness', desc: 'Does not react with resins or cement, ensuring long-term stability.' },
    ],
  },
  {
    img: plasticsImg,
    title: 'Plastics, Rubber & Polymers',
    need: 'Polymer manufacturers use fillers to reduce costs and improve the physical properties of plastics and rubber.',
    role: 'Silica flour acts as a functional filler that improves stiffness, heat resistance, and dielectric properties.',
    solution: '',
    features: [
      { label: 'Dielectric Strength', desc: 'Excellent electrical insulating properties for use in epoxy molding compounds (EMC).' },
      { label: 'Dimensional Stability', desc: 'Reduces shrinkage in molded plastic parts.' },
      { label: 'Reinforcement', desc: 'Improves the tensile strength and tear resistance of silicone rubber.' },
    ],
  },
  {
    img: oilfieldHydraulicImg,
    title: 'Oilfield & Hydraulic Fracturing (Frac Sand)',
    need: "The oil and gas industry requires durable 'proppants' to keep rock fissures open during hydraulic fracturing operations.",
    role: 'High-strength quartz grains act as proppants in hydraulic fracturing. So it must be strong enough to resist crushing and maintain fracture openings for hydrocarbon flow.',
    solution: '',
    features: [
      { label: 'Crush Resistance', desc: 'Our high-purity quartz grains have the compressive strength required for deep-well applications.' },
      { label: 'Sphericity', desc: 'Rounded grains ensure maximum permeability for oil and gas flow.' },
    ],
  },
  {
    img: specialtyAppImg,
    title: 'Specialty Applications',
    need: 'High-tech and specialized sectors require silica with ultra-low trace impurities (especially iron) and specific chemical purity to ensure performance in sensitive environments.',
    role: 'It determines the transparency, thermal resistance, and dielectric properties of the final product.',
    solution: 'We provide chemically beneficiated and precision-ground quartz tailored for niche high-performance requirements.',
    features: [
      { label: 'Electronics & Solar', desc: 'We supply ultra-high purity quartz powder for silicon wafers and photovoltaic (PV) applications. Through chemical beneficiation (acid leaching), we achieve ultra-low impurity levels to ensure maximum light transmission efficiency.' },
      { label: 'Filtration Media', desc: 'Our quartz is utilized as a chemically inert filtration medium for water and industrial treatment. It provides high chemical stability (>99.5% SiO₂) and reliable reaction behaviour in demanding chemical processes.' },
      { label: 'Abrasives', desc: 'We offer fine quartz powders (325 to 500 Mesh) for use in sandblasting and polishing compounds. These grains provide the necessary abrasive strength for precision surface finishing.' },
    ],
  },
];

const DynamicGalleryPage = () => {
  const { type } = useParams();
  const label = galleryTypes[type];
  const content = galleryContent[type];
  // 🎯 SEO fallback: agar gallerySEO me entry nahi hai to generic title/desc use hoga
  const seo = gallerySEO[type] || {
    title: `${label} | Sevanta Minerals`,
    desc: `Real-time high resolution captures of our ${label}.`,
  };

  if (!label) {
    return (
      <div className="gallery-notfound">
        <Helmet>
          <title>Gallery Not Found | Sevanta Minerals</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h2>Gallery Not Found</h2>
        <p>The gallery you're looking for doesn't exist.</p>
      </div>
    );
  }

  // "mines", "machinery", "packaging" aur "production" ke apne rich layouts hain (niche define hain).
  // Baaki types ke liye simple page —
  // naya type rich layout me chahiye ho to bas is 'if' me uska naam add karo.
  if (type !== 'mines' && type !== 'machinery' && type !== 'packaging' && type !== 'production') {
    return (
      <div className="gallery-simple">
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.desc} />
        </Helmet>
        <h2>Gallery - {label}</h2>
        <p>Real-time high resolution captures of our {label}.</p>
      </div>
    );
  }

  // ---------- MACHINERY PAGE ----------
  if (type === 'machinery') {
    return (
      <div className="gallery-page">
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.desc} />
          <link rel="canonical" href={`https://YOURDOMAIN.com/gallery/machinery`} />
        </Helmet>
        <section
          className="gallery-hero"
          style={{ backgroundImage: `url(${aboutImg})` }}
        >
          <div className="gallery-hero-overlay" />
          <div className="gallery-hero-content">
            <span className="gallery-eyebrow">{content?.tag}</span>
            <h1 className="gallery-heading">{content?.heading}</h1>
            <p className="gallery-subtext">{content?.desc}</p>
            <p className="gallery-subtext gallery-subtext-secondary">
              {content?.desc2}
            </p>
          </div>
        </section>

        {/* ---------- MACHINERY & SUPPORT SERVICES (big image cards) ---------- */}
        <section className="service-section">
          <div className="pq-heading-row">
            <span className="pq-eyebrow">Our Capability</span>
            <h2 className="pq-heading">Machinery & Support Services</h2>
          </div>
          <div className="service-grid">
            {machineryServices.map((service, i) => (
              <div className="service-card" key={i}>
                <div className="service-card-image">
                  <img src={service.img} alt={service.title} loading="lazy" />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- FEATURE STRIP (same dark image-card style as above) ---------- */}
        <section className="feature-strip-section">
          <div className="service-grid">
            {machineryFeatures.map((feature, i) => (
              <div className="service-card" key={i}>
                <div className="service-card-image">
                  <img src={feature.img} alt={feature.title} loading="lazy" />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{feature.title}</h3>
                  <p className="service-card-desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- IMPORT & EXPORT ---------- */}
        <section className="ie-section">
          <div className="ie-card">
            <div
              className="ie-image"
              style={{ backgroundImage: `url(${truckImg})` }}
            />
            <div className="ie-content">
              <span className="ie-eyebrow">Global Trade</span>
              <h2 className="ie-heading">Import & Export Excellence</h2>
              <p className="ie-text">
                Sevanta Overseas operates a dedicated import-export division
                built to move industrial minerals seamlessly across borders.
                From documentation and customs clearance to freight
                coordination, we manage every step so shipments reach our
                partners on time, every time.
              </p>
              <p className="ie-text">
                Our logistics network spans major ports and trade corridors,
                giving us the flexibility to serve customers across Asia,
                Europe, the Middle East, and beyond — backed by experienced
                trade compliance teams who ensure every consignment meets
                international quality and regulatory standards.
              </p>
              <p className="ie-text">
                Whether it's a single container or a bulk order, our
                import-export team works as an extension of your supply
                chain — reliable, transparent, and always on schedule.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ---------- PACKAGING PAGE ----------
  if (type === 'packaging') {
    return (
      <div className="gallery-page">
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.desc} />
          <link rel="canonical" href={`https://YOURDOMAIN.com/gallery/packaging`} />
        </Helmet>
        {/* ---------- HERO (collection.png as full background) ---------- */}
        <section
          className="gallery-hero"
          style={{ backgroundImage: `url(${collectionImg})` }}
        >
          <div className="gallery-hero-overlay" />
          <div className="gallery-hero-content">
            <span className="gallery-eyebrow">{content?.tag}</span>
            <h1 className="gallery-heading">{content?.heading}</h1>
            <p className="gallery-subtext">{content?.desc}</p>
            <p className="gallery-subtext gallery-subtext-secondary">
              {content?.desc2}
            </p>
          </div>
        </section>

        {/* ---------- PACKAGING ACROSS EVERY MATERIAL (reuses pq-card design) ---------- */}
        <section className="pq-section">
          <div className="pq-heading-row">
            <span className="pq-eyebrow">Our Range</span>
            <h2 className="pq-heading">Packaging Across Every Material</h2>
          </div>
          <div className="pq-grid pq-grid-quality">
            {packagingCards.map((card, i) => (
              <div className="pq-card" key={i}>
                <img src={card.img} alt={card.title} loading="lazy" />
                <div className="pq-card-label">
                  <span>{card.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- OUR PACKAGING PROCESS (6 steps + arrows) ---------- */}
        <section className="process-section">
          <div className="pq-heading-row">
            <span className="pq-eyebrow">Workflow</span>
            <h2 className="pq-heading">Our Packaging Process</h2>
          </div>
          <div className="process-track">
            {packagingProcessSteps.map((step, i) => (
              <Fragment key={step.title}>
                <div className="process-step">
                  <div className="process-icon">{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {i < packagingProcessSteps.length - 1 && (
                  <span className="process-arrow">&rarr;</span>
                )}
              </Fragment>
            ))}
          </div>
        </section>

        {/* ---------- CAPABILITY STRIP (plain image grid, no overlay text) ---------- */}
        <section className="capability-strip-section">
          <div className="capability-strip-grid">
            {capabilityCards.map((card, i) => (
              <div className="capability-strip-card" key={i}>
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* ---------- SAFE TRANSPORT (golden card, reuses global-card design) ---------- */}
        <section className="global-section">
          <div className="global-card">
            <div className="global-content">
              <span className="global-eyebrow">Logistics</span>
              <h2 className="global-heading">Safe Transport, Every Shipment</h2>
              <p className="global-text">
                Once a consignment is packed and palletized, our transport
                team takes over — moving every load with the same care that
                went into packaging it. Vehicles are loaded, secured, and
                inspected before they leave our facility.
              </p>
              <p className="global-text">
                From short domestic hauls to long-distance export runs, we
                track every shipment closely, keeping customers informed at
                each stage until the material reaches its destination intact
                and on schedule.
              </p>
              <p className="global-tagline">
                Sevanta Overseas – Packed with Care, Delivered with Trust.
              </p>
            </div>
            <div
              className="global-image"
              style={{ backgroundImage: `url(${transportImg})` }}
            />
          </div>
        </section>

        {/* ---------- CLOSING 3-CARD SECTION (same dark image-card style) ---------- */}
        <section className="service-section">
          <div className="service-grid">
            {packagingClosingCards.map((card, i) => (
              <div className="service-card" key={i}>
                <div className="service-card-image">
                  <img src={card.img} alt={card.title} loading="lazy" />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{card.title}</h3>
                  <p className="service-card-desc">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ---------- PRODUCTION PAGE ----------
  if (type === 'production') {
    return (
      <div className="gallery-page">
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.desc} />
          <link rel="canonical" href={`https://YOURDOMAIN.com/gallery/production`} />
        </Helmet>
        {/* ---------- FULL-HEIGHT HERO (marbal.png) ---------- */}
        <section
          className="gallery-hero"
          style={{ backgroundImage: `url(${mainPageImg})` }}
        >
          <div className="gallery-hero-overlay" />
          <div className="gallery-hero-content">
            <span className="gallery-eyebrow">{content?.tag}</span>
            <h1 className="gallery-heading">{content?.heading}</h1>
            <p className="gallery-subtext">{content?.desc}</p>
            <p className="gallery-subtext gallery-subtext-secondary">
              {content?.desc2}
            </p>
          </div>
        </section>

        {/* ---------- INDUSTRY DETAIL CARDS ---------- */}
        <section className="industry-detail-section">
          <div className="pq-heading-row">
            <span className="pq-eyebrow">Applications</span>
            <h2 className="pq-heading">Industries We Power</h2>
          </div>
          <div className="industry-detail-list">
            {productionIndustries.map((industry, i) => (
              <div
                className={`industry-detail-card${i % 2 === 1 ? ' reverse' : ''}`}
                key={industry.title}
              >
                <div
                  className="industry-detail-image"
                  style={{ backgroundImage: `url(${industry.img})` }}
                />
                <div className="industry-detail-content">
                  <span className="industry-detail-eyebrow">Industry</span>
                  <h3 className="industry-detail-title">{industry.title}</h3>

                  <div className="industry-block">
                    <p className="industry-block-label">The Industry Need</p>
                    <p className="industry-block-text">{industry.need}</p>
                  </div>

                  <div className="industry-block">
                    <p className="industry-block-label">The Role of Quartz</p>
                    <p className="industry-block-text">{industry.role}</p>
                  </div>

                  <div className="industry-block">
                    <p className="industry-block-label">Our Solution</p>
                    {industry.solution && (
                      <p className="industry-block-text">{industry.solution}</p>
                    )}
                  </div>

                  <ul className="industry-features">
                    {industry.features.map((feature) => (
                      <li key={feature.label}>
                        <span className="industry-feature-dot" />
                        <span className="industry-feature-text">
                          <strong>{feature.label}:</strong> {feature.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CLOSING FULL-WIDTH BANNER (decore.png) ---------- */}
        <section
          className="decore-section"
          style={{ backgroundImage: `url(${decoreImg})` }}
        >
          <div className="decore-overlay" />
          <div className="decore-content">
            <span className="decore-eyebrow">One Material, Every Industry</span>
            <h2 className="decore-heading">Precision at Every Grade</h2>
            <p className="decore-text">
              From engineered stone to specialty electronics, every industry
              we serve depends on the same fundamentals — purity, particle
              consistency, and grading that doesn't vary from batch to batch.
              That discipline is built into every stage of our production
              line, so the quartz that leaves our facility performs exactly
              as specified, every single time.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.desc} />
        <link rel="canonical" href={`https://YOURDOMAIN.com/gallery/${type}`} />
      </Helmet>
      {/* ---------- HERO SECTION ---------- */}
      <section
        className="gallery-hero"
        style={{ backgroundImage: `url(${industryImg})` }}
      >
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content">
          <span className="gallery-eyebrow">{content?.tag || 'Gallery'}</span>
          <h1 className="gallery-heading">{content?.heading || label}</h1>
          <p className="gallery-subtext">
            {content?.desc || `Real-time high resolution captures of our ${label}.`}
          </p>
        </div>
      </section>

      {/* ---------- SLIDING CARDS SECTION ---------- */}
      <section className="slider-section">
        <div className="slider-heading-row">
          <span className="slider-eyebrow">Our Range</span>
          <h2 className="slider-heading">Materials We Deliver</h2>
        </div>

        <div className="slider-viewport">
          <div className="slider-track">
            {/* Cards do baar render kiye hain taaki loop seamless (bina jhatke) dikhe */}
            {[...sliderCards, ...sliderCards].map((card, i) => (
              <div className="slide-card" key={i}>
                <img src={card.img} alt={card.title} loading="lazy" />
                <div className="slide-card-label">
                  <span>{card.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- INDUSTRIES WE SERVE ---------- */}
      <section className="pq-section">
        <div className="pq-heading-row">
          <span className="pq-eyebrow">Applications</span>
          <h2 className="pq-heading">Industries We Serve</h2>
        </div>
        <div className="pq-grid">
          {industryCards.map((card, i) => (
            <div className="pq-card" key={i}>
              <img src={card.img} alt={card.title} loading="lazy" />
              <div className="pq-card-label">
                <span>{card.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- QUALITY YOU CAN TRUST ---------- */}
        <div className="pq-heading-row pq-heading-row-second">
          <span className="pq-eyebrow">Our Promise</span>
          <h2 className="pq-heading">Quality You Can Trust</h2>
        </div>
        <div className="pq-grid pq-grid-quality">
          {qualityCards.map((card, i) => (
            <div className="pq-card" key={i}>
              <img src={card.img} alt={card.title} loading="lazy" />
              <div className="pq-card-label">
                <span>{card.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- GLOBAL / ABOUT SECTION ---------- */}
      <section className="global-section">
        <div className="global-card">
          <div className="global-content">
            <span className="global-eyebrow">Global Presence</span>
            <h2 className="global-heading">
              Delivering Purity Across Borders
            </h2>
            <p className="global-text">
              Sevanta Overseas is a trusted exporter of premium-quality
              Quartz Powder from India. We specialize in supplying
              high-purity Quartz Powder in 200 Mesh, 250 Mesh, and 300 Mesh
              grades to industries worldwide.
            </p>
            <p className="global-text">
              With a strong focus on quality, consistency, and customer
              satisfaction, we source our raw materials from carefully
              selected mines and process them using advanced manufacturing
              techniques. Our products are widely used in glass, ceramics,
              paints, coatings, construction materials, and other industrial
              applications.
            </p>
            <p className="global-text">
              At Sevanta Overseas, we are committed to delivering reliable
              products, competitive pricing, and timely shipments to our
              global customers. Our goal is to build long-term partnerships
              through excellence, transparency, and dependable service.
            </p>
            <p className="global-tagline">
              Sevanta Overseas – Delivering Purity, Quality, and Trust Across
              Borders.
            </p>
          </div>
          <div
            className="global-image"
            style={{ backgroundImage: `url(${globalseveImg})` }}
          />
        </div>
      </section>
    </div>
  );
};

export default DynamicGalleryPage;