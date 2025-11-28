import { useState, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import iriyoVideo from "../assets/Hero-Video/video.mp4";

export default function Hero() {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  return (
    <section className="relative w-full h-80 sm:h-96 md:h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={iriyoVideo}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        playsInline
        className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-all duration-1000 ${
          isVideoEnded ? "blur-2xl brightness-50" : "blur-0"
        }`}
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay - Intensifies when video ends */}
      <div
        className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${
          isVideoEnded
            ? "bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/60"
            : "bg-gradient-to-b from-black/30 via-black/20 to-black/30"
        }`}
      />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-0">
        {/* Badge - Fades out when video ends */}
        <div
          className={`mb-2 sm:mb-4 px-3 sm:px-4 py-1 sm:py-2 bg-teal-500/20 border border-teal-400/50 rounded-full backdrop-blur-sm transition-all duration-700 ${
            isVideoEnded ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <p className="text-teal-300 text-xs sm:text-sm font-semibold tracking-wider">
            Innovating Healthcare Solutions
          </p>
        </div>

        {/* Main Title - Fades in after video ends */}
        <h1
          className={`max-w-3xl text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight transition-all duration-1000 delay-500 transform ${
            isVideoEnded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          Innovating Healthcare for a{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Healthier Tomorrow
          </span>
        </h1>

        {/* Subtitle - Fades in after video ends */}
        <p
          className={`max-w-xl text-center text-xs sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-6 transition-all duration-1000 delay-700 ${
            isVideoEnded ? "opacity-100" : "opacity-0"
          }`}
        >
          Leading pharmaceutical company dedicated to developing life-changing
          medicines and improving patient outcomes worldwide.
        </p>

        {/* CTA Buttons - Fade in after video ends */}
        <div
          className={`flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto transition-all duration-1000 delay-1000 ${
            isVideoEnded ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => scrollToSection("products")}
            className="group px-5 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/50 flex items-center gap-2 justify-center text-xs sm:text-sm"
          >
            Our Products
            <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-5 sm:px-6 py-2 sm:py-3 border-2 border-white/80 text-white rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white text-xs sm:text-sm"
          >
            Contact Us
          </button>
        </div>

        {/* Scroll Indicator - Only shows while video playing */}
        {!isVideoEnded && (
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
            <p className="text-white/70 text-xs sm:text-sm mb-2">
              Scroll to explore
            </p>
            <ChevronDown className="w-5 h-5 text-teal-400 mx-auto" />
          </div>
        )}

        {/* Decorative Gradient Orbs - Appear after video ends */}
        {isVideoEnded && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-5 sm:top-10 md:top-20 left-2 sm:left-5 md:left-10 w-24 sm:w-40 md:w-72 h-24 sm:h-40 md:h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-5 sm:bottom-10 md:bottom-20 right-2 sm:right-5 md:right-10 w-28 sm:w-48 md:w-96 h-28 sm:h-48 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          </div>
        )}
      </div>
    </section>
  );
}
