import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Logo from "./Logo";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  // Matrix Digital Rain Effect
  useEffect(() => {
    const canvas = document.getElementById("matrix-bg") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const matrix = "01".split("");
    const fontSize = 16;
    let columns = width / fontSize;

    let drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * height; // Start at random heights
    }

    const draw = () => {
      ctx.fillStyle = "rgba(11, 8, 12, 0.1)"; // Slight dark fade
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#ff416c"; // Neon red color
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      columns = width / fontSize;
      drops = [];
      for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * height;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    window.dispatchEvent(new Event('start-loading-sequence'));
  };

  if (!hasStarted) {
    return (
      <div className="loading-screen" style={{ flexDirection: 'column', zIndex: 999999999 }}>
        <canvas id="matrix-bg" className="matrix-bg"></canvas>
        <div style={{ zIndex: 10, textAlign: 'center' }}>
          <h2 style={{ color: 'var(--accentColor)', letterSpacing: '4px', margin: 0, fontSize: '30px' }}>SYSTEM STANDBY</h2>
          <button
            onClick={handleStart}
            style={{
              padding: '15px 40px',
              background: 'rgba(255, 65, 108, 0.1)',
              border: '1px solid var(--accentColor)',
              color: 'white',
              cursor: 'pointer',
              marginTop: '40px',
              letterSpacing: '3px',
              fontFamily: 'monospace',
              fontSize: '16px',
              transition: 'all 0.3s',
              borderRadius: '5px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--accentColor)';
              e.currentTarget.style.boxShadow = '0 0 20px var(--accentColor)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 65, 108, 0.1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            INITIALIZE ULTRON!
          </button>
        </div>
      </div>
    );
  }

  // Calculate SVG stroke offset based on percentage
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className={`loading-screen ${clicked ? "loading-clicked" : ""}`}>
      <canvas id="matrix-bg" className="matrix-bg"></canvas>
      <div className="loading-header">
        <Logo className="loader-title" />
      </div>

      <div className={`cyber-ring-container ${loaded ? "ring-complete" : ""}`}>
        <svg className="cyber-ring" width="300" height="300" viewBox="0 0 300 300">
          <circle
            className="ring-bg"
            cx="150"
            cy="150"
            r={radius}
            strokeWidth="8"
            fill="none"
          />
          <circle
            className="ring-progress"
            cx="150"
            cy="150"
            r={radius}
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="ring-content">
          {!loaded ? (
            <div className="ring-percent">{percent}%</div>
          ) : (
            <div className="ring-ready">SYSTEM<br />HACKED</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 200);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 40);
    });
  }
  return { loaded, percent, clear };
};
