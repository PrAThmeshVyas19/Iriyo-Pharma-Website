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
        videoRef.current.playbackRate = 2.0;
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        videoRef.current.playsInline = true;

        try {
          await videoRef.current.play();
          setShowPlayButton(false);
        } catch (error) {
          console.log("Autoplay blocked. Showing manual play button.");
          setShowPlayButton(true);
        }
      }
    };

    playVideo();
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
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
      // CHANGED: Removed inline backgroundColor="#ffffff"
      // Added bg-gradient-to-br from-blue-50 to-slate-100
      // This adds a soft medical blue/grey tint behind the video
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center w-screen h-screen transition-opacity duration-700 ease-in-out bg-gradient-to-br from-blue-50 to-slate-100 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
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
          // contrast-125 & brightness-105: Make the capsule pop
          // mix-blend-multiply: Blends the video white BG into the new Blue/Slate gradient
          // drop-shadow-xl: Adds shadow to separate capsule from the colored background
          className="w-[95%] h-auto md:w-full md:h-full md:object-cover md:absolute md:inset-0 mix-blend-multiply contrast-125 brightness-105 drop-shadow-xl"
        />
      </div>

      {/* Fallback Play Button */}
      {showPlayButton && (
        <button
          onClick={handleManualPlay}
          className="absolute z-[10000] px-6 py-2 bg-black/5 backdrop-blur-sm border border-black/10 rounded-full text-[#1a1a1a] text-xs uppercase tracking-widest animate-pulse hover:bg-black/10 transition-all"
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
            <span className="text-[#5c6b7f] text-[9px] uppercase tracking-[0.6em] font-bold">
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
