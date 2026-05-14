import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLoading } from "../../context/LoadingProvider";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": any;
    }
  }
}

const CharacterModel = () => {
  const { setLoading } = useLoading();
  const iframeRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const hasLeftTop = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio("/ultron.wav");
  }, []);

  useEffect(() => {
    if (!isZoomed) return;
    
    const handleScroll = () => {
      setIsZoomed(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (iframeRef.current) {
        gsap.to(iframeRef.current, { scale: 1, y: "0%", duration: 0.5 });
      }
    };
    
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [isZoomed]);

  useEffect(() => {
    const handleScrollReset = () => {
      if (window.scrollY > window.innerHeight / 2) {
        hasLeftTop.current = true;
      } else if (window.scrollY < 10 && hasLeftTop.current) {
        hasLeftTop.current = false;
        setResetKey(prev => prev + 1);
      }
    };
    
    window.addEventListener("scroll", handleScrollReset);
    return () => window.removeEventListener("scroll", handleScrollReset);
  }, []);

  useEffect(() => {
    let isLoaded = false;
    let audioFinished = false;
    let splineLoaded = false;
    let fallbackTimer: ReturnType<typeof setTimeout>;

    const checkCompletion = () => {
      if (splineLoaded && audioFinished && !isLoaded) {
        isLoaded = true;
        clearTimeout(fallbackTimer);
        setLoading(100);
        setTimeout(() => {
          console.log("Spline Scene Loaded & Audio Finished!");
          setCharTimeline(null as any, null as any);
          setAllTimeline();
        }, 1000); // Time to show SYSTEM HACKED
      }
    };

    const handleSplineLoad = () => {
      splineLoaded = true;
      checkCompletion();
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleSplineLoad);
      iframe.addEventListener("load-complete", handleSplineLoad);
    }

    const startSequence = () => {
      const loadingAudio = new Audio("/loading.wav");
      loadingAudio.volume = 0.5;

      const duration = 7000; // 7 seconds (matches loading.wav)
      const startTime = Date.now();

      const syncProgress = () => {
        if (!isLoaded) {
          const elapsed = Date.now() - startTime;
          const percent = Math.min(99, Math.floor((elapsed / duration) * 100));
          setLoading(percent);

          if (elapsed < duration) {
            requestAnimationFrame(syncProgress);
          } else {
            audioFinished = true;
            checkCompletion();
          }
        }
      };

      loadingAudio.play().catch((e) => {
        console.log("Audio autoplay prevented by browser:", e);
      });

      requestAnimationFrame(syncProgress);
    };

    window.addEventListener('start-loading-sequence', startSequence);

    fallbackTimer = setTimeout(() => {
      // If 15 seconds pass, force load to prevent infinite hanging
      if (!isLoaded) {
        audioFinished = true;
        splineLoaded = true;
        checkCompletion();
      }
    }, 15000);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('start-loading-sequence', startSequence);
      if (iframe) {
        iframe.removeEventListener("load", handleSplineLoad);
        iframe.removeEventListener("load-complete", handleSplineLoad);
      }
    };
  }, [setLoading]);

  const handleRobotClick = () => {
    if (!isZoomed) {
      setIsZoomed(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
      if (iframeRef.current) {
        gsap.to(iframeRef.current, { scale: 1.5, y: "10%", duration: 0.5, ease: "power2.out" });
      }
    }
  };

  return (
    <div 
      className="character-model spline-container"
      style={{ pointerEvents: "auto", cursor: "pointer" }}
      onClick={handleRobotClick}
    >
      <spline-viewer
        key={resetKey}
        ref={iframeRef as any}
        url="https://prod.spline.design/IjW0oFsZXvORgWT8/scene.splinecode"
        style={{ width: "100%", height: "100%", background: "transparent" }}
      ></spline-viewer>
    </div>
  );
};

export default CharacterModel;
