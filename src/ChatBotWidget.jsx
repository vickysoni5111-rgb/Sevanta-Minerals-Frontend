import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./ChatBotWidget.css";

// बेहतर और ज़्यादा कस्टमाइज्ड स्टेप्स फ्लो
const steps = [
  {
    key: "name",
    bot: "Hi there! 👋 Welcome to Sevanta Minerals. What's your name?",
    placeholder: "Type your name...",
    type: "text",
  },
  {
    key: "service",
    bot: (name) => `Thanks ${name}! What's your inquiry about? Which product/service are you interested in?`,
    placeholder: "Select an option...",
    type: "options",
    options: [
      "Quartz Grains",
      "Fine Quartz Powder",
      "Specialized Quartz Fractions",
      "SilQ™ Series",
      "General Enquiry",
    ],
  },
  {
    key: "email",
    bot: "Great! What's your email address so our team can send you the catalog/quotes?",
    placeholder: "Type your email (e.g., name@example.com)...",
    type: "email",
  },
  {
    key: "phone",
    bot: "And what's the best phone number to reach you?",
    placeholder: "Type your 10-digit phone number...",
    type: "tel",
  },
  {
    key: "company",
    bot: "Which company are you reaching out from? (You can skip this if not applicable)",
    placeholder: "Company name (optional)...",
    type: "text",
    optional: true,
  },
  {
    key: "budget",
    bot: "What's your approximate monthly/project requirement budget range?",
    placeholder: "Select budget...",
    type: "options",
    options: ["₹10K - ₹50K", "₹50K - ₹1L", "₹1L+"],
  },
  {
    key: "details",
    bot: "Last step! Please tell us a bit more about your specific requirements.",
    placeholder: "Type your specifications, quantity, etc...",
    type: "textarea",
  },
];

// 🎯 PRODUCTION FIX: localhost hardcoded nahi, ab .env se live backend URL uthega.
// Agar VITE_API_URL set nahi hai (local dev me) to localhost:5000 pe fallback hoga.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [formData, setFormData] = useState({});
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  // Auto-open logic
  useEffect(() => {
    if (!isHomePage) return;
    const hasAutoOpened = sessionStorage.getItem("chatbotAutoOpened");
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("chatbotAutoOpened", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isHomePage]);

  // जब चैट खुले तो पहला मैसेज दिखाए
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerBotResponse(steps[0].bot);
    }
  }, [isOpen]);

  // ऑटो-स्क्रॉल टू बॉटम
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isBotTyping]);

  // हर नए स्टेप पर इनपुट बॉक्स को ऑटो-फोकस करना
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [stepIndex, isOpen]);

  // टाइपिंग इफेक्ट के साथ बॉट का रिप्लाई
  const triggerBotResponse = (botPrompt) => {
    setIsBotTyping(true);
    setTimeout(() => {
      setIsBotTyping(false);
      setMessages((prev) => [...prev, { from: "bot", text: botPrompt }]);
    }, 800); // 800ms का नेचुरल टाइपिंग डिले
  };

  const pushUserMessage = (text) => {
    setMessages((prev) => [...prev, { from: "user", text }]);
  };

  // डेटा वैलिडेशन फ़ंक्शन
  const validateInput = (value, type, optional) => {
    if (optional && !value.trim()) return true;
    if (!value.trim()) return false;
    
    if (type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }
    if (type === "tel") {
      const phoneRegex = /^\+?[0-9]{7,15}$/; // बेसिक इंटरनेशनल फोन वैलिडेशन
      return phoneRegex.test(value.replace(/\s+/g, ""));
    }
    return true;
  };

  const goToNextStep = (updatedData) => {
    const nextIndex = stepIndex + 1;

    if (nextIndex < steps.length) {
      setStepIndex(nextIndex);
      const nextStep = steps[nextIndex];
      const botText =
        typeof nextStep.bot === "function"
          ? nextStep.bot(updatedData.name || "")
          : nextStep.bot;
      triggerBotResponse(botText);
    } else {
      submitToBackend(updatedData);
    }
  };

  const handleTextSubmit = () => {
    const currentStep = steps[stepIndex];
    const value = inputValue.trim();

    // अगर वैलिडेशन फेल हो जाए तो आगे न बढ़ने दें
    if (!validateInput(value, currentStep.type, currentStep.optional)) {
      alert(`Please enter a valid ${currentStep.key}.`);
      return;
    }

    pushUserMessage(value || "Skipped");
    const updatedData = { ...formData, [currentStep.key]: value };
    setFormData(updatedData);
    setInputValue("");
    goToNextStep(updatedData);
  };

  const handleOptionSelect = (option) => {
    const currentStep = steps[stepIndex];
    pushUserMessage(option);
    const updatedData = { ...formData, [currentStep.key]: option };
    setFormData(updatedData);
    goToNextStep(updatedData);
  };

  const submitToBackend = async (finalData) => {
    setIsSubmitting(true);
    triggerBotResponse("Got it! Sending your details to our team... ⏳");

    try {
      // 🎯 FIX: hardcoded localhost hataya, ab live backend URL use hoga
      const response = await fetch(`${API_BASE_URL}/api/send-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: finalData.name,
          email: finalData.email,
          countryCode: "",
          phone: finalData.phone,
          companyName: finalData.company,
          service: finalData.service,
          budget: finalData.budget,
          projectDetails: finalData.details,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setTimeout(() => {
          triggerBotResponse(
            "Thanks for connecting with us! 🎉 We've received your details. Our expert team will get back to you within 24 hours."
          );
          setIsDone(true);
          setIsSubmitting(false);
        }, 1000);
      } else {
        setTimeout(() => {
          triggerBotResponse("Something went wrong on our end. Please try again in a moment.");
          setIsSubmitting(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Chatbot submit error:", error);
      setTimeout(() => {
        triggerBotResponse("I couldn't reach our server. Please check your connection and try again.");
        setIsSubmitting(false);
      }, 1000);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setStepIndex(0);
    setFormData({});
    setInputValue("");
    setIsDone(false);
    setIsSubmitting(false);
    triggerBotResponse(steps[0].bot);
  };

  const currentStep = steps[stepIndex];

  if (!isHomePage) return null;

  return (
    <>
      {/* फ्लोटिंग चैट बटन */}
      <motion.button
        className="chatbot__toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isOpen ? "×" : "💬"}
      </motion.button>

      {/* चैट विंडो */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot__window"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* हेडर */}
            <div className="chatbot__header">
              <div className="chatbot__header-info">
                <span className="chatbot__avatar">SM</span>
                <div>
                  <p className="chatbot__header-title">Sevanta Minerals Help desk</p>
                  <p className="chatbot__header-status">
                    <span className="chatbot__dot" /> Online
                  </p>
                </div>
              </div>
              <button className="chatbot__close" onClick={() => setIsOpen(false)}>×</button>
            </div>

            {/* चैट बॉडी */}
            <div className="chatbot__body" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`chatbot__bubble chatbot__bubble--${msg.from}`}
                >
                  {msg.text}
                </div>
              ))}

              {/* टाइपिंग इंडिकेटर बबल */}
              {(isBotTyping || isSubmitting) && (
                <div className="chatbot__bubble chatbot__bubble--bot chatbot__typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>

            {/* इनपुट / ऑप्शंस एरिया */}
            {!isDone && !isBotTyping ? (
              <div className="chatbot__input-area">
                {currentStep?.type === "options" ? (
                  <div className="chatbot__options">
                    {currentStep.options.map((opt, i) => (
                      <button
                        key={i}
                        className="chatbot__option-btn"
                        onClick={() => handleOptionSelect(opt)}
                        disabled={isSubmitting}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : currentStep?.type === "textarea" ? (
                  <div className="chatbot__input-row">
                    <textarea
                      ref={inputRef}
                      rows="2"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={currentStep.placeholder}
                      disabled={isSubmitting}
                    />
                    <button
                      onClick={handleTextSubmit}
                      disabled={!inputValue.trim() || isSubmitting}
                      className="chatbot__send-btn"
                    >
                      ➤
                    </button>
                  </div>
                ) : (
                  <div className="chatbot__input-row">
                    <input
                      ref={inputRef}
                      type={currentStep?.type || "text"}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={currentStep?.placeholder}
                      disabled={isSubmitting}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleTextSubmit();
                      }}
                    />
                    <button
                      onClick={handleTextSubmit}
                      disabled={(!inputValue.trim() && !currentStep?.optional) || isSubmitting}
                      className="chatbot__send-btn"
                    >
                      ➤
                    </button>
                  </div>
                )}
              </div>
            ) : isDone ? (
              <div className="chatbot__done-area">
                <button className="chatbot__restart-btn" onClick={resetChat}>
                  Start New Enquiry
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}