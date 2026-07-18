import React, { useState } from "react";
import "./Card1.css";
import EnquiryModal from "./EnquiryModal";

import consistentPurityImg from "./assets/Consistent-Purity.png";
import partnershipImg from "./assets/partnership.png";
import transportImg from "./assets/transport11.png";
import collectionImg from "./assets/collection1.png";

const cardsData = [
  {
    id: "purity",
    image: consistentPurityImg,
    title: "Consistent Purity",
    description:
      "Every batch is tested and verified so quality never varies from one delivery to the next.",
  },
  {
    id: "partnership",
    image: partnershipImg,
    title: "Partnership",
    description:
      "Long-term relationships built on transparency, reliability, and shared growth.",
  },
  {
    id: "supply-chain",
    image: transportImg,
    title: "Supply Chain Inquiry",
    description:
      "Questions about sourcing, logistics, or delivery timelines? Reach out and we'll walk you through it.",
  },
  {
    id: "regulatory-sustainability",
    image: collectionImg,
    title: "Regulatory & Sustainability Inquiry",
    description:
      "Get details on compliance standards, certifications, and our sustainability commitments.",
  },
];

const Card1 = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <section className="card1-section">
      <div className="card1-grid">
        {cardsData.map((card) => (
          <article className="card1" key={card.id}>
            <div className="card1-image-wrap">
              <img src={card.image} alt={card.title} className="card1-image" />
            </div>
            <div className="card1-body">
              <h3 className="card1-title">{card.title}</h3>
              <p className="card1-description">{card.description}</p>
              <button
                type="button"
                className="card1-contact-btn"
                onClick={() => setIsQuoteModalOpen(true)}
              >
                Contact
              </button>
            </div>
          </article>
        ))}
      </div>

      <EnquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </section>
  );
};

export default Card1;