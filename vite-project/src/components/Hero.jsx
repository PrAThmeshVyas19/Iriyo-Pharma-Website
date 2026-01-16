import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import iriyoVideo from "../assets/Hero-Video/video3.mp4";

export default function Hero() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  // We keep this state just for the background color blobs animation
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Attempt to play video
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
        } catch (err) {
          console.warn("Autoplay prevented:", err);
        }
      }
    };
    playVideo();

    // Trigger animations shortly after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (destination) => {
    if (destination === "products") {
      navigate("/products");
    } else if (destination === "contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const headerOffset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      } else {
        navigate("/contact");
      }
    }
  };

  return (
    <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden bg-slate-900">
      {/* --- Video Layer --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          src={iriyoVideo}
          autoPlay
          muted
          loop
          playsInline
          // CHANGED: Fixed blur, opacity, and scale so it is always visible and slightly blurred
          className="w-full h-full object-cover scale-105"
        >
          <source src={iriyoVideo} type="video/mp4" />
        </video>
        {/* <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-50" /> */}
        {/* Gradient Overlay - Always visible to ensure text contrast */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/90" /> */}

        {/* REMOVED: Backdrop Tint div was here */}
      </div>

      {/* --- Content --- */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        {/* Badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
        </motion.div> */}

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
        >
          Serving With{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">
            Care
          </span>
        </motion.h1>

        {/* Paragraph */}
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-100 mb-10 leading-relaxed font-light drop-shadow-md"
        >
          IRIYO Pharma focuses on delivering high-quality pharmaceutical
          solutions that meet the expectations of healthcare professionals and
          patients
        </motion.p> */}

        {/* Buttons */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button
            onClick={() => handleNavigation("products")}
            className="group relative px-8 py-3.5 bg-white text-slate-900 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl hover:bg-teal-50 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Products{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => handleNavigation("contact")}
            className="px-8 py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white font-bold text-sm hover:bg-white/10 hover:border-white transition-all duration-300"
          >
            Contact Support
          </button>
        </motion.div> */}
      </div>

      {/* --- Decorative Background Blobs --- */}
      {/* These add color atmosphere behind the text but over the video */}
      {isLoaded && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }} // Increased opacity slightly for visibility
            transition={{ duration: 2 }}
            className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-teal-500 rounded-full mix-blend-overlay filter blur-[100px] animate-blob"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-overlay filter blur-[100px] animate-blob animation-delay-2000"
          />
        </>
      )}
    </section>
  );
}
