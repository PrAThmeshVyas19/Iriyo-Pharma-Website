import React, { useState, useRef, useEffect } from "react";
import splashVideo from "../assets/Splash-Video/splash.mp4";

const SplashScreen = ({ onVideoEnd }) => {
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        // Essential mobile settings
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        videoRef.current.playsInline = true;

        try {
          await videoRef.current.play();
          setShowPlayButton(false);
        } catch (error) {
          console.log(
            "Autoplay blocked by browser. Showing manual play button."
          );
          setShowPlayButton(true);
        }
      }
    };

    playVideo();
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  };

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
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center w-screen h-screen transition-opacity duration-700 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "#f2f2f2",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={splashVideo}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={startFadeOut}
          className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-[5000ms] ease-out ${
            isZoomed ? "scale-105" : "scale-100"
          }`}
        />

      </div>

      {/* Fallback Play Button */}
      {showPlayButton && (
        <button
          onClick={handleManualPlay}
          className="absolute z-10000 px-6 py-2 bg-black/5 backdrop-blur-sm border border-black/10 rounded-full text-[#1a1a1a] text-xs uppercase tracking-widest animate-pulse hover:bg-black/10 transition-all"
        >
          Tap to Enter
        </button>
      )}

      {/* Loading UI */}
      {!showPlayButton && (
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
      )}
    </div>
  );
};

export default SplashScreen;
