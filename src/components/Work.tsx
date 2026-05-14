import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              title: "Stanza Studio",
              category: "AI-Powered RAG",
              tools: "FastAPI, Groq, Inngest, Docker",
              link: "https://github.com/MuhammadMagdyy/rag-stanza-engine",
              image: "/images/work/stanza.jpeg"
            },
            {
              title: "Athar",
              category: "Full-Stack Web App",
              tools: "Next.js, TypeScript, TailwindCSS",
              link: "https://github.com/MuhammadMagdyy/athar-portfolio",
              image: "/images/work/athar.png"
            },
            {
              title: "Amelio",
              category: "Online Learning System",
              tools: "MERN Stack, Stripe, JWT, MVC",
              link: "https://github.com/MuhammadMagdyy/Advanced-Computer-Lab-2022-BlueHats",
              image: "/images/work/amelio.png"
            },
            {
              title: "Imperium-Conqueror",
              category: "Java Strategy Game",
              tools: "Java, OOP, Design Patterns",
              link: "https://github.com/MuhammadMagdyy/Imperium-Conqueror",
              image: "/images/work/conqueror.png"
            }
          ].map((project, index) => (
            <a href={project.link} target="_blank" rel="noreferrer" className="work-box" key={index} data-cursor="disable">
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <div className="work-image-wrapper">
                <WorkImage image={project.image} alt={project.title} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
