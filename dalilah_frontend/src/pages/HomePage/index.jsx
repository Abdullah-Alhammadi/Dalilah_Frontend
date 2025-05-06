import { useEffect, useRef } from "react";
import "./styles.css";
import videoSrc from "../../assets/HomePage.mp4";

export default function HomePage() {
    const marqueeRef = useRef(null);
    const phrases = [
        "Welcome to Dalilah",
        "Discover places like a local in Riyadh and Abha 🌍"
    ];

    useEffect(() => {
        const marquee = marqueeRef.current;
        let index = 0;

        function updateText() {
            marquee.innerText = phrases[index];
            marquee.classList.remove("animate");
            void marquee.offsetWidth;
            marquee.classList.add("animate");
            index = (index + 1) % phrases.length;
        }

        updateText();
        const interval = setInterval(updateText, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-page">
            <div className="marquee-container">
                <div className="marquee" ref={marqueeRef}></div>
            </div>
            <div className="video-section">
                <video src={videoSrc} autoPlay loop muted playsInline />
            </div>
        </div>
    );
}
