import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function AboutPage() {
  const sentences = [
    "Welcome to Dalilah, your gateway to discovering hidden gems recommended by locals.",
    "We connect travelers and locals, providing authentic insights into Riyadh and Abha’s best spots.",
    "From vibrant cafes to serene parks, Dalilah helps you find unique experiences tailored to your tastes.",
    "Contribute your own recommendations and become part of a community passionate about exploration.",
    "Start your journey today and see your city through the eyes of those who know it best.",
  ];

  const refs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisible = [...visible];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index);
            newVisible[idx] = true;
          }
        });
        setVisible(newVisible);
      },
      { threshold: 0.5 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => {
      refs.current.forEach((el) => el && observer.unobserve(el));
    };
  }, []);

  return (
    <div className="about-scroll-page">
      {sentences.map((text, idx) => (
        <section
          key={idx}
          ref={(el) => (refs.current[idx] = el)}
          data-index={idx}
          className={`scroll-section ${visible[idx] ? "fade-in" : ""}`}
        >
          <p>{text}</p>
        </section>
      ))}
    </div>
  );
}
