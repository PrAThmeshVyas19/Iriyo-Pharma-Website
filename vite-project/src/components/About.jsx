import React, { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
//   Annotation,
// } from "react-simple-maps";
import {
  Award,
  Users,
  Globe,
  Heart,
  Target,
  Eye,
  ShieldCheck,
  Lightbulb,
  Linkedin,
  Quote,
  Map as MapIcon,
  Navigation,
  Sprout,
  HandHeart,
  ChevronRight,
} from "lucide-react";

import IriyoLogo from "../assets/logo/logo.png";

// for location maps
import FreePremiumMap from "../components/FreePremiumMap";


// --- Utility: Animated Counter ---
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/,/g, ""), 10);
      motionValue.set(numericValue);
    }
  }, [isInView, value, motionValue]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

// --- Utility: Section Wrapper ---
const Section = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Updated Component: Maharashtra Focused Map ---
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Updated Markers based on your image (Maharashtra, India)
const markers = [
  { name: "Pune", coordinates: [73.8567, 18.5204] },
  { name: "Nagpur", coordinates: [79.0882, 21.1458] },
  { name: "Bhandara", coordinates: [79.657, 21.1777] },
  { name: "Gondia", coordinates: [80.221, 21.4624] },
  { name: "Chandrapur", coordinates: [79.2961, 19.9615] },
];

const WorldMap = () => {
  return (
    <div className="w-full h-full absolute inset-0 rounded-[2.5rem] overflow-hidden bg-slate-900">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 3500, // High zoom to focus on Maharashtra
          center: [78, 20], // Center coordinates for Maharashtra
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Highlight India slightly differently
              const isIndia = geo.properties.name === "India";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isIndia ? "#1e293b" : "#0f172a"} // Highlight India vs World
                  stroke="#334155"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#1e293b", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>

        {/* Render Markers with Names */}
        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <g
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" fill="#3b82f6" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
            </g>
            <text
              textAnchor="middle"
              y={15} // Position text below the pin
              style={{
                fontFamily: "system-ui",
                fill: "white",
                fontSize: "10px", // Increased font size for readability
                fontWeight: "bold",
                textShadow: "0px 2px 4px rgba(0,0,0,0.8)", // Shadow for readability
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Map Overlay Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
    </div>
  );
};

// --- Background Component ---
const BackgroundLayer = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute bottom-0 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-4000" />
  </div>
);

// --- Data ---
const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We uphold integrity by practicing honesty, transparency, and ethics in every aspect of our work.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "It is our pathway to transform ideas into meaningful healthcare solutions.",
  },
  {
    icon: HandHeart,
    title: "Responsibility",
    desc: "We act responsible by placing patient safety, quality and trust at the center of everything we do.",
  },
  {
    icon: Sprout,
    title: "Humility",
    desc: "We remain humble in our pursuit of excellence , valuing people over pride.",
  },
];

const directors = [
  {
    name: "Mr. Sawan Bahekar",
    role: "Director",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Sawan Bahekar holds a Master’s degree in Pharmaceutical Sciences and brings over a decade of professional experience in the pharmaceutical sector. Alongside his expertise in healthcare, he is a passionate wildlife expert and actively leads socio-economic development projects. His work focuses on strengthening community livelihoods and contributing to sustainable development initiatives at the grassroots level. Driven by a compassionate vision, Sawan is willing to deliver accessible and equitable medical facilities for all segments of society. ",
  },
  {
    name: "Ms. Pooja Pawar",
    role: "Director",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Pooja Pawar is a Pharmacy graduate with over 10 years of professional experience in the pharmaceutical sector. Her core competencies include pharmaceutical distribution, exports, and hospital supply operations. She brings strong expertise in sales management and business development. With effective leadership, strategic planning, and team coordination skills, she has played an important role in strengthening sales operations and supporting the company’s overall growth and market presence. ",
  },
  {
    name: "Dr. Kamlesh Pathak",
    role: "Director",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    bio: "Dr. Kamlesh Pathak is a healthcare industry leader with 17+ years of experience across Healthcare IT and pharmaceutical Industry. He holds a BAMS and an MBA in Healthcare IT. Blending clinical expertise with strategic business leadership. For the past five years, he has served as Director of a pharmaceutical company, leading strategy, operations, and market growth while upholding quality and compliance standards. He is recognized for his results-driven leadership, deep industry insight, and commitment to building scalable, high-performance healthcare organizations.",
  },
];

export default function About() {
  return (
    <div className="relative min-h-screen w-full bg-slate-50 selection:bg-blue-100 font-sans text-slate-900">
      <BackgroundLayer />

      <div className="relative z-10">
        {/* 1. HERO */}
        <section className="relative py-12 lg:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-blue-200 bg-white/50 backdrop-blur-md px-3 py-1 text-sm font-medium text-blue-800 mb-6 shadow-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                Your Partner in Quality Healthcare
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
                I love Iriyo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r bg-pink-600">
                  ❤️
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                IRIYO Pharma is a pharmaceutical company founded by experienced
                professionals with extensive exposure to the healthcare and
                pharmaceutical sectors across Maharashtra. Built on a strong
                foundation of domain knowledge, practical experience, and
                ethical values, the company is committed to contributing
                meaningfully to the evolving healthcare landscape in India.
              </p>
            </Section>
          </div>
        </section>

        {/* 2. MISSION & VISION */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <Section className="group relative overflow-hidden rounded-[2rem] bg-slate-900/95 backdrop-blur-md text-white p-8 lg:p-12 shadow-2xl ring-1 ring-white/10">
                <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                  <Target size={240} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8 ring-1 ring-white/10">
                      <Target className="text-blue-400 w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">
                      Our Mission
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Our mission is to serve with care and humility by
                      delivering quality medicines through ethical practices,
                      resilient healthcare solutions, and responsible
                      innovation. By caring for and protecting every “I”, we
                      remain committed to accessibility, patient safety, and
                      trust—working purposefully to support healthier lives and
                      stronger healthcare systems.
                    </p>
                  </div>
                </div>
              </Section>

              <Section className="group relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/60 backdrop-blur-md p-8 lg:p-12 shadow-lg">
                <div className="absolute bottom-0 right-0 p-8 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12">
                  <Eye size={240} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-8">
                      <Eye className="text-blue-600 w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-slate-900 tracking-tight">
                      Our Vision
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      We envision a future where care and humility guide
                      healthcare delivery, ensuring that every “I” is protected
                      and empowered through ethical pharmaceutical practices. By
                      fostering resilience and innovation, we aim to create
                      trusted medical solutions that enhance patient outcomes
                      and promote healthier societies.
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </section>

        {/* 3. VALUES */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                The principles that guide our science and our spirit.
              </p>
            </Section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => {
                const VIcon = val.icon;
                if (!VIcon) return null;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <VIcon size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      {val.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      {val.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. LEADERSHIP */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
              <Section>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Leadership Board
                </h2>
                <p className="mt-2 text-slate-600">
                  The visionaries guiding Iriyo Pharma.
                </p>
              </Section>
            </div>
            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
              {directors.map((person, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative min-w-[300px] md:min-w-0 snap-center mr-6 md:mr-0 last:mr-0 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/4] overflow-hidden rounded-2xl bg-white/50 shadow-inner mb-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <a
                        href="#"
                        className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-blue-600 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm flex-grow hover:shadow-md transition-shadow duration-300">
                    <div className="mb-3">
                      <h4 className="text-lg font-bold text-slate-900">
                        {person.name}
                      </h4>
                      <p className="text-blue-600 font-medium text-sm">
                        {person.role}
                      </p>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {person.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. BRAND IDENTITY & PRESENCE (Redesigned & Updated Map) */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-full bg-slate-100 -skew-y-3 -z-10 origin-left scale-110" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* <div className="grid lg:grid-cols-2 gap-16 items-start"> // prevous chanegs map cha same size yavi sathi */}
            <div className="grid lg:grid-cols-2 gap-16 items-stretch">

              {/* LEFT: REDESIGNED LOGO STORY */}
              <Section className="h-full">
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-xl h-full flex flex-col">
                  {/* Logo Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                      <ShieldCheck size={32} />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      Brand Identity
                    </span>
                  </div>

                  {/* Main Logo Display */}
                  <div className="flex-grow flex items-center justify-center py-8">
                    <img
                      src={IriyoLogo}
                      alt="Iriyo Pharma Logo"
                      className="w-48 object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                    />
                  </div>

                  {/* Story Footer */}
                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      The Mark of Care
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Our identity is rooted in the Japanese word{" "}
                      <span className="font-semibold text-blue-600 italic">
                        "Iriyo"
                      </span>{" "}
                      (Medical Care). It symbolizes our unwavering promise to
                      protect, heal, and serve with integrity.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>Trust</span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 ml-2"></span>
                      <span>Ethics</span>
                      <span className="w-2 h-2 rounded-full bg-blue-500 ml-2"></span>
                      <span>Quality</span>
                    </div>
                  </div>
                </div>
              </Section>

              {/* RIGHT: UPDATED PRESENCE MAP (Maharashtra Focused) */}
              {/* <Section>
                <div className="relative bg-slate-900 rounded-[2.5rem] p-1 text-white overflow-hidden shadow-2xl h-[600px] border border-slate-700">
                  <div className="absolute top-6 left-6 z-10 bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2 shadow-lg">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-semibold tracking-wide">
                      Live Operations
                    </span>
                  </div> */}

              {/* --- REAL MAP COMPONENT --- */}
              {/* <WorldMap /> */}

              {/* Overlay Info Card */}
              {/* <div className="absolute bottom-6 left-6 right-6 bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">
                          Regional Stronghold
                        </h4>
                        <p className="text-slate-400 text-sm">
                          Primary distribution hubs across Maharashtra.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-blue-400">
                          5+
                        </span>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">
                          Key Cities
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Section> */}
              <Section className="h-full">
                <div className="h-full min-h-[560px]">
                  <FreePremiumMap className="h-full" />
                </div>
              </Section>

            </div>
          </div>
        </section>

        {/* 6. QUOTE SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl -z-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto relative z-10 px-4 text-center"
          >
            <Quote className="w-12 h-12 text-blue-400 mx-auto mb-8 opacity-80" />
            <h2 className="text-2xl md:text-4xl font-serif italic leading-relaxed mb-8 text-blue-50">
              "Medicine is not just a science; it is the art of preserving human
              dignity through health."
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-blue-500/50"></div>
              <p className="text-blue-200 font-semibold tracking-widest text-sm">
                THE IRIYO PROMISE
              </p>
              <div className="h-px w-12 bg-blue-500/50"></div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
