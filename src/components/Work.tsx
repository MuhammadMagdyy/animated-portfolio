import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    // Reveal animation for the heading
    gsap.fromTo(
      ".work-section h2",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-section h2",
          start: "top 80%",
        },
      }
    );

    // Staggered reveal for each project card
    gsap.utils.toArray(".work-box").forEach((box: any) => {
      gsap.fromTo(
        box,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: box,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  const projects = [
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
  ];



  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
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
