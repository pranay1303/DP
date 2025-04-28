import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "../Styles/FAQ.css";

const faqData = [
  {
    question: "What is Ayurveda?",
    answer:
      "Ayurveda is an ancient system of medicine that focuses on holistic healing and balance in life through natural remedies, diet, and lifestyle practices.",
  },
  {
    question: "How does Ayurveda work?",
    answer:
      "Ayurveda works by balancing the three doshas (Vata, Pitta, Kapha) using herbs, diet, yoga, and meditation.",
  },
  {
    question: "Is Ayurveda scientifically proven?",
    answer:
      "Many Ayurvedic practices have scientific backing, especially in areas of herbal medicine, stress relief, and gut health.",
  },
  {
    question: "Can Ayurveda be used with modern medicine?",
    answer:
      "Yes, Ayurveda can complement modern medicine, but it’s best to consult a healthcare professional before combining treatments.",
  },
  {
    question: "What are the benefits of medicinal plants?",
    answer:
      "Medicinal plants provide various health benefits, including boosting immunity, aiding digestion, reducing stress, and treating common illnesses naturally.",
  },
  {
    question: "How does Ayurvedic plant detection work?",
    answer:
      "Ayurvedic plant detection uses AI-based models to identify medicinal plants based on leaf structure, color, and other botanical features.",
  },
  {
    question: "What is the role of AI in Ayurveda?",
    answer:
      "AI helps in Ayurveda by identifying medicinal plants, predicting disease susceptibility, and providing personalized Ayurvedic treatments based on body type (Prakriti).",
  },
  {
    question: "How accurate is an AI-based medicinal plant analysis?",
    answer:
      "AI-based medicinal plant analysis can achieve high accuracy when trained with a well-labeled dataset, but it requires validation with real-world testing.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-container">
      <div className="faq-content">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about Ayurveda and AI-based medicinal plant analysis.</p>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-card">
              <button onClick={() => toggleFAQ(index)} className="faq-question">
                {item.question}
                <ChevronDown className={`icon ${openIndex === index ? "rotate" : ""}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="faq-answer"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
