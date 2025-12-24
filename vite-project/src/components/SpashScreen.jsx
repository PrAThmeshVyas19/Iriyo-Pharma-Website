import React, { useState, useRef, useEffect } from "react";
import splashVideo from "../assets/Splash-Video/splash2.mp4";

const SplashScreen = ({ onVideoEnd }) => {
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const videoRef = useRef(null);

  // Trigger the subtle zoom effect after mount for a premium feel
  useEffect(() => {
    const timer = setTimeout(() => setIsZoomed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progressPercent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const startFadeOut = () => {
    setIsFading(true);
    // 600ms matches the transition-opacity duration for a smooth exit
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
        // Using the specific light grey from your video assets
        backgroundColor: "#f2f2f2",
      }}
    >
      {/* 1. Full Screen Video Container */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={startFadeOut}
          // 'mix-blend-multiply' is essential to blend the video's white background with the CSS grey
          // 'scale-105' provides the slow zoom effect you agreed on earlier
          className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-[5000ms] ease-out ${
            isZoomed ? "scale-105" : "scale-100"
          }`}
        >
          <source src={splashVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 2. Absolute Positioned Loading UI (Matches your screenshot layout) */}
      <div className="absolute bottom-16 md:bottom-24 w-64 md:w-80 flex flex-col items-center px-4">
        {/* Sleek Progress Bar */}
        <div className="w-full h-[1.5px] bg-black/5 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#1a1a1a] transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(0,0,0,0.05)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Dynamic Labels - Matched to image_64a225.png */}
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
