import React, { useState, useRef, useEffect } from "react";
import splashVideo from "../assets/Splash-Video/splash2.mp4";

const SplashScreen = ({ onVideoEnd }) => {
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // 1. Trigger the subtle zoom effect for a premium feel
    const zoomTimer = setTimeout(() => setIsZoomed(true), 100);

    // 2. FORCE PLAY for Mobile: Mobile browsers are aggressive with autoplay blocks.
    if (videoRef.current) {
      videoRef.current.defaultMuted = true; // Required for mobile
      videoRef.current.muted = true;        // Required for mobile
      
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
          })
          .catch((error) => {
            console.error("Autoplay was prevented on mobile:", error);
            // Fallback: If mobile blocks it entirely, just finish after a 3s delay
            setTimeout(() => startFadeOut(), 3000);
          });
      }
    }

    return () => clearTimeout(zoomTimer);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const progressPercent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const startFadeOut = () => {
    setIsFading(true);
    setTimeout(() => {
      onVideoEnd();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center w-screen h-screen transition-opacity duration-700 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "#f2f2f2", // Matches the background in splash.mp4
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline // Essential for iOS to prevent opening in native player
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={startFadeOut}
          className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-[5000ms] ease-out ${
            isZoomed ? "scale-105" : "scale-100"
          }`}
        >
          <source src={splashVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Loading UI - Matched to image_64a225.png */}
      <div className="absolute bottom-16 md:bottom-24 w-64 md:w-80 flex flex-col items-center px-4">
        <div className="w-full h-[1.5px] bg-black/5 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#1a1a1a] transition-all duration-300 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex justify-between items-center mt-5">
          <span className="text-[#999999] text-[9px] uppercase tracking-[0.6em] font-bold">
            Loading
          </span>
          <span className="text-[#1a1a1a] text-[11px] font-bold font-mono">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;