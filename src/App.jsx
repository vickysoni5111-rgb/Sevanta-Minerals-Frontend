import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import ChatBotWidget from './ChatBotWidget';
import WhatsAppButton from './WhatsAppButton';
import DynamicProductPage from './DynamicProductPage';
import DynamicGalleryPage from './DynamicGalleryPage';
import ContactPage from './ContactPage'; 
import QualitySection from './QualitySection'; 

const GetQuote = () => <div style={{paddingTop: '120px', minHeight: '80vh', background: '#0d0a06', color: '#fff', textAlign: 'center'}}><h2>Request a Quote</h2><p>Get competitive pricing for custom industrial meshes.</p></div>;

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quality" element={<QualitySection />} /> 
          <Route path="/contact" element={<ContactPage />} /> 
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/products/:slug" element={<DynamicProductPage />} />
          <Route path="/gallery/:type" element={<DynamicGalleryPage />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
      <ChatBotWidget />
    </Router>
  );
}

export default App;