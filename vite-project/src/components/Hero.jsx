import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <--- Import this
import iriyoVideo from "../assets/Hero-Video/video2.mp4";

export default function Hero() {
  const navigate = useNavigate(); // <--- Initialize hook
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.warn("Autoplay prevented:", err);
          setIsVideoEnded(true);
        }
      }
    };
    playVideo();

    const fallbackTimer = setTimeout(() => {
      if (!isVideoEnded) setIsVideoEnded(true);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  // Updated Navigation Handler
  const handleNavigation = (destination) => {
    if (destination === "products") {
      // Navigate to the separate Products page
      navigate("/products");
    } else if (destination === "contact") {
      // Try to scroll first (if Contact is on Home), otherwise navigate
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        // Offset for header
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        // Fallback if you decide to make Contact a separate page later
        navigate("/contact");
      }
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden bg-slate-900">
      {/* --- Video Layer --- */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={iriyoVideo}
          autoPlay
          muted
          loop={false}
          playsInline
          onEnded={handleVideoEnd}
          className={`w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${
            isVideoEnded
              ? "scale-105 blur-md opacity-40"
              : "scale-100 blur-0 opacity-100"
          }`}
        >
          <source src={iriyoVideo} type="video/mp4" />
        </video>

        <div
          className={`absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/90 transition-opacity duration-1000 ${
            isVideoEnded ? "opacity-100" : "opacity-60"
          }`}
        />
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-1000 ${
            isVideoEnded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVideoEnded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-400/30 bg-teal-500/10 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-teal-300 text-xs font-bold tracking-wider uppercase">
            Innovating Healthcare Solutions
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={
            isVideoEnded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
        >
          Innovating Healthcare for a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Healthier Tomorrow
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVideoEnded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-light"
        >
          Leading pharmaceutical company dedicated to developing life-changing
          medicines and improving patient outcomes worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVideoEnded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          {/* UPDATED: Uses handleNavigation to go to /products route */}
          <button
            onClick={() => handleNavigation("products")}
            className="group relative px-8 py-3.5 bg-white text-slate-900 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl hover:bg-teal-50 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Products{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* UPDATED: Uses handleNavigation to scroll or navigate */}
          <button
            onClick={() => handleNavigation("contact")}
            className="px-8 py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold text-sm hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Contact Support
          </button>
        </motion.div>
      </div>

      {/* --- Decorative Elements --- */}
      {!isVideoEnded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/60 text-xs uppercase tracking-widest">
            Loading Experience
          </span>
          <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-teal-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}

      {isVideoEnded && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-teal-500 rounded-full mix-blend-overlay filter blur-[100px] animate-blob"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] animate-blob animation-delay-2000"
          />
        </>
      )}
    </section>
  );
}
