import "./styles/About.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cards = document.querySelectorAll(".about-card");
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <div className="about-section" id="about" ref={aboutRef}>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        
        <div className="about-grid">
          <div className="about-card">
            <h4>Foundation</h4>
            <p>
              A software engineer and fresh graduate from the GUC, possessing a strong 
              foundation in core technologies like <span>Java</span> and <span>Python</span>.
            </p>
          </div>
          
          <div className="about-card highlight">
            <h4>Specialization</h4>
            <p>
              Passionate about <span>Machine & Deep Learning</span>, AI, and crafting seamless 
              experiences through <span>Full-Stack development</span> using the MERN stack.
            </p>
          </div>
          
          <div className="about-card">
            <h4>Experience</h4>
            <p>
              Experienced in building modular ERP systems like <span>Odoo</span> and <span>SAP</span>, 
              as well as designing scalable <span>RAG-based architectures</span>. Committed to 
              clean code and modern web technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
