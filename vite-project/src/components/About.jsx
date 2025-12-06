import React, { useEffect, useRef } from "react";
import {
  motion,
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
  ArrowRight,
  Target,
  Eye,
  ShieldCheck,
  Microscope,
  Lightbulb,
  Linkedin,
  Quote,
  Sprout,
  HandHeart,
} from "lucide-react";

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

// --- Background Component (Fixed for whole page) ---
const BackgroundLayer = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    {/* 1. Dot Pattern */}
    <svg
      className="absolute inset-0 h-full w-full stroke-slate-300/30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        {/* <pattern
          id="grid-pattern"
          width={24}
          height={24}
          x="50%"
          y={-1}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M1 1h2v2H1z"
            fill="currentColor"
            className="fill-slate-300/50"
          />
        </pattern> */}
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#grid-pattern)"
      />
    </svg>

    {/* 2. Animated Blobs */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob" />
    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000" />
    <div className="absolute bottom-0 left-20 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-4000" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob animation-delay-2000" />
  </div>
);

// --- Data ---
const stats = [
  { icon: Users, value: "10000", suffix: "+", label: "Employees" },
  { icon: Globe, value: "75", suffix: "+", label: "Countries" },
  { icon: Award, value: "200", suffix: "+", label: "Patents" },
  { icon: Heart, value: "50", suffix: "M+", label: "Patients Helped" },
];

// UPDATED VALUES: Integrity, Innovation, Responsibility, Humility
const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    desc: "We act with unyielding honesty and transparency, ensuring trust is the foundation of every scientific breakthrough we achieve.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We challenge the status quo, relentlessly pursuing novel technologies and solutions to the world's most complex medical problems.",
  },
  {
    icon: HandHeart,
    title: "Responsibility",
    desc: "We hold ourselves accountable to our patients, our partners, and the planet, ensuring sustainable and ethical practices in all we do.",
  },
  {
    icon: Sprout,
    title: "Humility",
    desc: "We listen first. We recognize that great ideas come from everywhere and that there is always more to learn in the pursuit of science.",
  },
];

const directors = [
  {
    name: "Dr. Eleanor Vance",
    role: "Chairperson & CEO",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "James Sterling",
    role: "Chief Financial Officer",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Dr. Arin Kumar",
    role: "Head of R&D",
    image:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Sarah Jenkins",
    role: "Board Director",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function About() {
  return (
    // Main Container with fixed background
    <div className="relative min-h-screen w-full bg-slate-50 selection:bg-blue-100 font-sans text-slate-900">
      {/* GLOBAL BACKGROUND */}
      <BackgroundLayer />

      {/* CONTENT WRAPPER (z-index higher than background) */}
      <div className="relative z-10">
        {/* 1. HERO */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Section className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-blue-200 bg-white/50 backdrop-blur-md px-3 py-1 text-sm font-medium text-blue-800 mb-6 shadow-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                Pioneering Life Science
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
                Engineering the Future of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Global Healthcare
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                With over 30 years of excellence, Iriyo Pharma is dedicated to
                discovering, developing, and delivering medicines that address
                the world's most pressing health challenges.
              </p>
            </Section>

            {/* Stats Grid - Glassmorphism */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-lg shadow-xl p-8 lg:p-12">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <Section key={idx} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm ring-1 ring-slate-900/5">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-1">
                      <Counter value={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </Section>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2. MISSION & VISION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Mission Card (Solid Dark Glass) */}
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
                      Our mission is to deliver high-quality medicines with
                      unwavering integrity, foster resilience in healthcare
                      delivery, and continuously pursue innovation to improve
                      patient outcomes.
                    </p>
                  </div>
                </div>
              </Section>

              {/* Vision Card (Light Glass) */}
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
                      To lead with ethics and excellence in providing safe,
                      effective, and accessible medicines empowering healthier
                      lives, nurturing well-being, and building a sustainable
                      future.
                    </p>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </section>

        {/* 3. VALUES - UPDATED WITH INTEGRITY, INNOVATION, RESPONSIBILITY, HUMILITY */}
        <section className="py-24">
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
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <Section>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Leadership Board
                </h2>
                <p className="mt-2 text-slate-600">
                  The visionaries guiding Iriyo Pharma.
                </p>
              </Section>
              <Section>
                <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-4 bg-white/50 px-4 py-2 rounded-full border border-blue-100">
                  View Chart <ArrowRight size={16} />
                </button>
              </Section>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {directors.map((person, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/50 shadow-inner mb-4">
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
                  <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl border border-white/50">
                    <h4 className="text-lg font-bold text-slate-900">
                      {person.name}
                    </h4>
                    <p className="text-blue-600 font-medium text-sm">
                      {person.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. QUOTE SECTION */}
        <section className="py-24 relative overflow-hidden">
          {/* Dark Glass Overlay for Footer */}
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
