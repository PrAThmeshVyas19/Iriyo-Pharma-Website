import React, { useEffect, useRef, useState } from "react";

import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

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

import IriyoLogo from "../assets/logo/IriyoLogo.png";
// Make sure to add your about video here
import aboutVideo from "../assets/About-Video/video4.mp4";

// for location maps
import FreePremiumMap from "../components/FreePremiumMap";

// temporary images for the profile
import femaleImg from "../assets/display/female.jpg";
import maleImg from "../assets/display/male.jpg";


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

// --- Background Component (Kept for the rest of the page) ---
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
    desc: "We act responsibly by placing patient safety, quality and trust at the center of everything we do.",
  },
  {
    icon: Sprout,
    title: "Humility",
    desc: "We remain humble in our pursuit of excellence , valuing people over pride.",
  },
];

const valueColors = [
  { 
    bg: "bg-blue-100/70", text: "text-blue-900",
    iconBg: "bg-blue-200/70", iconText: "text-blue-700",
    ring: "ring-blue-400/30", border: "border-blue-300/70",
    underline: "bg-blue-500"
  },
  { 
    bg: "bg-orange-100/70", text: "text-orange-900",
    iconBg: "bg-orange-200/70", iconText: "text-orange-700",
    ring: "ring-orange-400/30", border: "border-orange-300/70",
    underline: "bg-orange-500"
  },
  { 
    bg: "bg-green-100/70", text: "text-green-900",
    iconBg: "bg-green-200/70", iconText: "text-green-700",
    ring: "ring-green-400/30", border: "border-green-300/70",
    underline: "bg-green-500"
  },
  { 
    bg: "bg-purple-100/70", text: "text-purple-900",
    iconBg: "bg-purple-200/70", iconText: "text-purple-700",
    ring: "ring-purple-400/30", border: "border-purple-300/70",
    underline: "bg-purple-500"
  },
];


const directors = [
  {
    name: "Mr. Sawan Bahekar",
    role: "Director",
    image: maleImg,
    bio: "Sawan Bahekar holds a Master’s degree in Pharmaceutical Sciences and brings over a decade of professional experience in the pharmaceutical sector. Alongside his expertise in healthcare, he is a passionate wildlife expert and actively leads socio-economic development projects. His work focuses on strengthening community livelihoods and contributing to sustainable development initiatives at the grassroots level. Driven by a compassionate vision, Sawan is willing to deliver accessible and equitable medical facilities for all segments of society. ",
  },
  {
    name: "Ms. Pooja Pawar",
    role: "Director",
    image: femaleImg,
    bio: "Pooja Pawar is a Pharmacy graduate with over 10 years of professional experience in the pharmaceutical sector. Her core competencies include pharmaceutical distribution, exports, and hospital supply operations. She brings strong expertise in sales management and business development. With effective leadership, strategic planning, and team coordination skills, she has played an important role in strengthening sales operations and supporting the company’s overall growth and market presence. ",
  },
  {
    name: "Dr. Kamlesh Pathak",
    role: "Director",
    image: maleImg,
    bio: "Dr. Kamlesh Pathak is a healthcare industry leader with 17+ years of experience across Healthcare IT and pharmaceutical Industry. He holds a BAMS and an MBA in Healthcare IT. Blending clinical expertise with strategic business leadership. For the past five years, he has served as Director of a pharmaceutical company, leading strategy, operations, and market growth while upholding quality and compliance standards. He is recognized for his results-driven leadership, deep industry insight, and commitment to building scalable, high-performance healthcare organizations.",
  },
];

export default function About() {
  const [activeValue, setActiveValue] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveValue((prev) => (prev + 1) % values.length);
    }, 2000); // 2 sec

    return () => clearInterval(interval);
  }, [values.length]);



  return (
    <div className="relative min-h-screen w-full bg-slate-50 selection:bg-blue-100 font-sans text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-black">
        {/* Hero Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="
      absolute inset-0
      w-full h-full
      object-cover
      object-[50%_30%]
      md:object-center
    "
        >
          <source src={aboutVideo} type="video/mp4" />
        </video>
        {/* newly added to that edge visible nako mhanun*/}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-50" />
      </section>

      {/* ABOUT TEXT SECTION (BELOW HERO) */}
      {/* <section className="relative z-10 bg-white py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">About Us</h3>
            <p className="mt-4 text-lg text-slate-600">
              IRIYO Pharma is a pharmaceutical company founded by experienced
              professionals with extensive exposure to the healthcare and
              pharmaceutical sectors across Maharashtra. Built on a strong
              foundation of domain knowledge, practical experience, and ethical
              values.
            </p>
          </Section>
        </div>
      </section> */}

      {/* Background layer for the rest of the page */}
      <BackgroundLayer />

      <div className="relative z-10">
        {/* 2. MISSION & VISION */}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* <Section className="group relative overflow-hidden rounded-[2rem] bg-slate-900/95 backdrop-blur-md text-white p-8 lg:p-12 shadow-2xl ring-1 ring-white/10"> */}
              {/* <Section className="group relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/60 backdrop-blur-md p-8 lg:p-12 shadow-lg"> */}
              <Section className="group relative overflow-hidden rounded-[2rem] bg-rose-100/80 border border-rose-300/70 backdrop-blur-md text-slate-900 p-8 lg:p-12 shadow-xl ring-1 ring-rose-400/30">

                <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                  <Target size={240} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-8 ring-1 ring-white/10">
                      <Target className="text-blue-400 w-7 h-7" />
                    </div> */}
                    {/* <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-8">
                      <Target className="text-green-600 w-7 h-7" />
                    </div> */}
                    {/* <div className="w-14 h-14 rounded-2xl bg-emerald-200/70 flex items-center justify-center mb-8">
                      <Target className="text-emerald-700 w-7 h-7" />
                    </div> */}
                    <div className="w-14 h-14 rounded-2xl bg-rose-200/70 flex items-center justify-center mb-8">
                      <Target className="text-rose-700 w-7 h-7" />
                    </div>


                    <h3 className="text-3xl font-bold mb-4 tracking-tight">
                      Our Mission
                    </h3>
                    {/* <p className="text-slate-300 text-lg leading-relaxed"> */}
                    <p className="text-slate-600 text-lg leading-relaxed">

                      Our mission is to serve with care and humility by
                      delivering quality medicines through ethical practices,
                      resilient healthcare solutions, and responsible
                      innovation. By caring for and protecting every “I”, we
                      remain committed to accessibility, patient safety, and
                      trust working purposefully to support healthier lives and
                      stronger healthcare systems.
                    </p>
                  </div>
                </div>
              </Section>

              <Section className="group relative overflow-hidden rounded-[2rem] bg-teal-100/80 border border-teal-300/70 backdrop-blur-md p-8 lg:p-12 shadow-xl ring-1 ring-teal-400/30">

              {/* <Section className="group relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/60 backdrop-blur-md p-8 lg:p-12 shadow-lg"> */}
                <div className="absolute bottom-0 right-0 p-8 opacity-5 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-12">
                  <Eye size={240} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-8">
                      <Eye className="text-blue-600 w-7 h-7" />
                    </div> */}
                    {/* <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-8">
                      <Eye className="text-green-600 w-7 h-7" />
                    </div> */}
                    <div className="w-14 h-14 rounded-2xl bg-teal-200/70 flex items-center justify-center mb-8">
                      <Eye className="text-teal-700 w-7 h-7" />
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
        {/* <section className="py-14">
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
        </section> */}
        {/* 3. VALUES (Tabbed) */}
        <section className="py-14">
        {/* <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-white"> */}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our Core Values
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                The principles that guide our science and our spirit.
              </p>
            </Section>

            {/* Tabs container */}
            <div className="mx-auto max-w-5xl">
              {/* TAB BUTTONS */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
                {values.map((v, idx) => {
                  const Icon = v.icon;
                  const isActive = idx === activeValue;

                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveValue(idx)}
                      className={[
                        "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
                        // isActive
                        //   ? "bg-slate-900 text-white shadow-lg"
                        // isActive
                        //   ? "bg-orange-500 text-white shadow-lg"
                        //   // : "bg-white/70 text-slate-700 hover:bg-white border border-white/60",
                        //   : "bg-white/70 text-slate-700 hover:bg-white border border-orange-200"

                        // isActive
                        //   ? "bg-orange-200 text-orange-800 shadow-md"
                        //   : "bg-white/70 text-slate-700 hover:bg-white border border-orange-200"

                          isActive
                            ? `${valueColors[idx].bg} ${valueColors[idx].text} shadow-md`
                            : `bg-white/70 text-slate-700 hover:bg-white border ${valueColors[idx].border}`

                      ].join(" ")}
                    >
                      <span
                        className={[
                          "grid place-items-center rounded-full w-8 h-8 transition",
                          // isActive ? "bg-white/15" : "bg-blue-50 text-blue-600",
                          // isActive ? "bg-orange-400/20" : "bg-blue-50 text-blue-600"
                          // isActive
                          //   ? "bg-orange-400/20 text-orange-600"
                          //   : "bg-orange-100 text-orange-500",

                          // isActive
                          //   ? "bg-orange-300/20 text-orange-700"
                          //   : "bg-orange-100 text-orange-500"

                          isActive
                            ? `${valueColors[idx].iconBg} ${valueColors[idx].iconText}`
                            : `${valueColors[idx].iconBg} ${valueColors[idx].iconText}`


                        ].join(" ")}
                      >
                        <Icon size={16} />
                      </span>
                      {v.title}

                      {/* Active pill underline */}
                      {isActive && (
                        <motion.span
                          layoutId="valueTabActive"
                          className={`absolute -bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full ${valueColors[idx].underline}`}

                          // className="absolute -bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-orange-400"

                          // className="absolute -bottom-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-blue-500"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* TAB CONTENT */}
              {/* <div className="relative"> */}
              <div className="relative before:absolute before:inset-0 before:rounded-[2.5rem] before:bg-indigo-200/20 before:blur-3xl before:-z-10">

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeValue}
                    initial={{ opacity: 0, y: 18, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.99 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    // className="rounded-[2rem] border border-white/60 bg-white/50 backdrop-blur-xl shadow-xl p-8 md:p-10 ring-1 ring-slate-900/5"

                    // prev
                    // className="rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-md shadow-xl p-8 md:p-10"
                    
                    //  below one was good plain glass
                    // className="rounded-[2rem] border border-white/60 bg-white/50 backdrop-blur-xl shadow-xl p-8 md:p-10 ring-1 ring-slate-900/5"
                    // className="rounded-[2rem] border border-orange-200/60 bg-orange-50/80 backdrop-blur-xl shadow-xl p-8 md:p-10 ring-1 ring-orange-300/30"
                    // className="rounded-[2rem] border border-orange-300/70 bg-orange-100/90 backdrop-blur-xl shadow-xl p-8 md:p-10 ring-1 ring-orange-400/40"
                    // className={`rounded-[2rem] border ${valueColors[activeValue].border} bg-${valueColors[activeValue].bg.split(" ")[0]}/90 backdrop-blur-xl shadow-xl p-8 md:p-10 ring-1 ${valueColors[activeValue].ring}`}
                    className={`rounded-[2rem] border ${valueColors[activeValue].border} ${valueColors[activeValue].bg} backdrop-blur-xl shadow-xl p-8 md:p-10 ring-1 ${valueColors[activeValue].ring}`}

                  >
                    <div className="flex items-start gap-5">
                      {/* <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"> */}
                      {/* <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600"> */}
                      <div className={`w-14 h-14 rounded-2xl ${valueColors[activeValue].iconBg} flex items-center justify-center ${valueColors[activeValue].iconText}`}>

                        {React.createElement(values[activeValue].icon, { size: 28 })}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {values[activeValue].title}
                        </h3>
                        {/* <p className="text-slate-600 leading-relaxed text-base"> */}
                        <p className="text-slate-600 leading-relaxed text-lg md:text-xl">

                          {values[activeValue].desc}
                        </p>

                        {/* small “progress” row */}
                        {/* <div className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-widest text-slate-400 uppercase">
                          <span className="w-10 h-px bg-slate-200" />
                          Value {activeValue + 1} of {values.length}
                          <span className="w-10 h-px bg-slate-200" />
                        </div> */}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 4. LEADERSHIP */}
        <section className="py-14">
          <div className="absolute top-0 left-0 h-1 w-full bg-amber-400/80 rounded-t-2xl" />

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
                  {/* <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm flex-grow hover:shadow-md transition-shadow duration-300"> */}
                  {/* <div className="bg-purple-50/80 backdrop-blur-sm p-6 rounded-xl border border-purple-200/70 shadow-sm flex-grow hover:shadow-md transition-shadow duration-300"> */}
                  {/* <div className="bg-purple-100/90 backdrop-blur-sm p-6 rounded-xl border border-purple-300/70 shadow-sm flex-grow hover:shadow-md transition-shadow duration-300"> */}
                  {/* <div className="bg-indigo-100/90 backdrop-blur-sm p-6 rounded-xl border border-indigo-300/70 shadow-sm flex-grow hover:shadow-md transition-shadow duration-300"> */}
                  <div className="bg-amber-100/90 backdrop-blur-sm p-6 rounded-2xl border border-amber-300/70 shadow-md flex-grow hover:shadow-amber-300/40 transition-shadow duration-300">

                    <div className="mb-3">
                      {/* <h4 className="text-lg font-bold text-slate-900"> */}
                      <h4 className="text-xl font-bold text-slate-900">

                        {person.name}
                      </h4>
                      {/* <p className="text-blue-600 font-medium text-sm"> */}
                      {/* <p className="text-purple-700 font-semibold text-base"> */}
                      {/* <p className="text-indigo-700 font-semibold text-base"> */}
                      <p className="text-amber-700 font-semibold text-base">


                        {person.role}
                      </p>
                    </div>
                    {/* <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                      {person.bio}
                    </p> */}
                    {/* <p className="text-slate-900 text-sm leading-relaxed border-t border-slate-100 pt-3"> */}
                    {/* <p className="text-slate-700 text-[15px] leading-relaxed border-t border-purple-100 pt-4"> */}
                    {/* <p className="text-slate-700 text-[15px] leading-relaxed border-t border-indigo-200 pt-4"> */}
                    <p className="text-slate-700 text-[15px] leading-relaxed border-t border-amber-200 pt-4">

                      {person.bio}
                    </p>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. BRAND IDENTITY & PRESENCE */}
        {/* <section className="py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-full bg-slate-100 -skew-y-3 -z-10 origin-left scale-110" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-stretch"> */}
              {/* LEFT: REDESIGNED LOGO STORY */}
              {/* <Section className="h-full">
                <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-xl h-full flex flex-col"> */}
                  {/* Logo Header */}
                  {/* <div className="flex items-center justify-between mb-8">
                    <div className="h-16 w-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                      <ShieldCheck size={32} />
                    </div>
                    <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      Brand Identity
                    </span>
                  </div> */}

                  {/* Main Logo Display */}
                  {/* <div className="flex-grow flex items-center justify-center py-8">
                    <img
                      src={IriyoLogo}
                      alt="Iriyo Pharma Logo"
                      className="w-48 object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                    />
                  </div> */}

                  {/* Story Footer */}
                  {/* <div className="mt-8 border-t border-slate-100 pt-6">
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
              </Section> */}

              {/* RIGHT: MAP COMPONENT */}
              {/* <Section className="h-full">
                <div className="h-full min-h-[560px]">
                  <FreePremiumMap className="h-full" />
                </div>
              </Section>
            </div>
          </div>
        </section> */}
        {/* 5. BRAND IDENTITY (Full width, big like video) */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-full bg-slate-100 -skew-y-3 -z-10 origin-left scale-110" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Brand Identity
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                A mark that reflects trust, care, and quality.
              </p>
            </Section>

            <Section className="rounded-[2.25rem] border border-white/60 bg-white/75 backdrop-blur-md shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 items-stretch">
                {/* LOGO */}
                <div className="p-10 md:p-14 flex items-center justify-center bg-gradient-to-br from-white to-slate-50">
                  <img
                    src={IriyoLogo}
                    alt="Iriyo Pharma Logo"
                    className="w-[260px] md:w-[340px] lg:w-[380px] object-contain drop-shadow-2xl"
                  />
                </div>

                {/* TEXT */}
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                      <ShieldCheck size={24} />
                    </div>
                    <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                      Iriyo Pharma
                    </p>
                  </div>

                  <h3 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                    The Iriyo Logo
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-lg">
                    The Iriyo logo represents trust, care, and quality in healthcare.
                    Inspired by the Japanese word for medical care, it reflects Iriyo
                    Pharma’s commitment to ethical practices, reliable medicines, and
                    patient-focused solutions.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3 text-sm font-semibold">
                    <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                      Trust
                    </span>
                    <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                      Ethics
                    </span>
                    <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-700">
                      Quality
                    </span>
                  </div>
                </div>
              </div>
            </Section>
          </div>
        </section>

        {/* 6. PRESENCE MAP*/}
        <section className="py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Our Presence
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Reach across regions, built on reliable supply and service.
              </p>
            </Section>

            <Section className="relative w-full overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 backdrop-blur-md shadow-2xl">
              <div className="w-full h-[50vh] md:h-[75vh]">
                <FreePremiumMap className="h-full w-full" />
              </div>
            </Section>
          </div>
        </section>


        {/* 6. QUOTE SECTION
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
        </section> */}
      </div>
    </div>
  );
}
