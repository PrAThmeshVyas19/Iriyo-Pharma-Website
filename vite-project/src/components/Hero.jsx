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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src={iriyoVideo}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Badge - Fades out when video ends */}
        <div
          className={`mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-2 bg-teal-500/20 border border-teal-400/50 rounded-full backdrop-blur-sm transition-all duration-700 ${
            isVideoEnded ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <p className="text-teal-300 text-xs sm:text-sm font-semibold tracking-wider">
            Innovating Healthcare Solutions
          </p>
        </div>

        {/* Main Title - Fades in after video ends */}
        <h1
          className={`max-w-4xl text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-6 leading-tight transition-all duration-1000 delay-500 transform ${
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
          className={`max-w-2xl text-center text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-12 transition-all duration-1000 delay-700 ${
            isVideoEnded ? "opacity-100" : "opacity-0"
          }`}
        >
          Leading pharmaceutical company dedicated to developing life-changing
          medicines and improving patient outcomes worldwide.
        </p>

        {/* CTA Buttons - Fade in after video ends */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-12 w-full sm:w-auto transition-all duration-1000 delay-1000 ${
            isVideoEnded ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => scrollToSection("products")}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/50 flex items-center gap-2 justify-center text-sm sm:text-base"
          >
            Our Products
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/80 text-white rounded-lg font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:border-white text-sm sm:text-base"
          >
            Contact Us
          </button>
        </div>

        {/* Scroll Indicator - Only shows while video playing */}
        {!isVideoEnded && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <p className="text-white/70 text-sm mb-2">Scroll to explore</p>
            <ChevronDown className="w-6 h-6 text-teal-400 mx-auto" />
          </div>
        )}

        {/* Decorative Gradient Orbs - Appear after video ends */}
        {isVideoEnded && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          </div>
        )}
      </div>
    </section>
  );
}
