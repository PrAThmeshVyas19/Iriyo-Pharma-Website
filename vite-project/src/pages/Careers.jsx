import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Search,
  ArrowRight,
  Heart,
  Zap,
  Shield,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePayload } from "../hooks/usePayload";
import Contact from "../components/ContactForCareer";

// import lifeAtIriyoVideo from "../assets/videos/life-at-iriyo.mp4"; // UNCOMMENT THIS when you have your video

// --- Background Component ---
const BackgroundLayer = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <svg
      className="absolute inset-0 h-full w-full stroke-slate-300/30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="careers-grid"
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
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#careers-grid)"
      />
    </svg>
    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob" />
  </div>
);

export default function Careers() {
  // Fetch 'careers' collection where 'isOpen' is true
  const { data: jobs, loading } = usePayload("careers", {
    where: { isOpen: { equals: true } },
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">
            Loading Opportunities...
          </p>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-slate-50 font-sans text-slate-900 selection:bg-teal-100">
      <BackgroundLayer />

      {/* --- LIFE AT IRIYO SECTION (Top) --- */}
      {/* Adjusted padding: py-24 for internal spacing, mb-12 to reduce gap below */}
      <section className="relative w-full py-24 overflow-hidden mb-12">
        {/* VIDEO BACKGROUND */}
        <div className="absolute inset-0 w-full h-full">
          {/* REPLACE THE SRC BELOW WITH YOUR ACTUAL VIDEO PATH */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            // src={lifeAtIriyoVideo}
            src="https://assets.mixkit.co/videos/preview/mixkit-scientists-working-in-a-laboratory-4545-large.mp4" // Placeholder video
          />
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-slate-900 backdrop-blur-[2px]" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">
              Life at <span className="text-teal-400">Iriyo</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-200 max-w-4xl mx-auto leading-relaxed mb-12">
              At IRIYO Pharma, we have found strength in our diversity, imbued
              by our culture of mutual respect, empathy, and adhering to the
              highest ethical standards. We are proud that our workforce is
              bound together by our common values of quality, reliability,
              consistency, trust, and innovation. These values form the core of
              our culture and steer us towards our vision.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
              {[
                { icon: Users, label: "Humility" },
                { icon: Shield, label: "Integrity" },
                { icon: Heart, label: "Passion" },
                { icon: Zap, label: "Innovation" },
              ].map((val, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col items-center hover:bg-white/20 transition-colors"
                >
                  <val.icon className="w-8 h-8 text-teal-400 mb-3" />
                  <span className="font-bold text-lg">{val.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 text-slate-300 text-sm max-w-2xl mx-auto border-t border-white/10 pt-8">
              <p>
                We encourage our employees to personify these ideologies, as
                they form the cornerstone of everything we create and value as
                an organisation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- HERO / INTRO SECTION --- */}
      {/* Adjusted padding: pt-12 (was pt-24) to bring it closer to the video section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center rounded-full border border-teal-200 bg-white/60 backdrop-blur-sm px-3 py-1 text-sm font-medium text-teal-800 mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-teal-600 mr-2 animate-pulse"></span>
            Join Our Team
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Build the Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              Healthcare
            </span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg">
            We are looking for passionate innovators to help us discover and
            deliver life-changing medicines.
          </p>
        </div>
      </div>

      {/* --- JOB LISTINGS SECTION --- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-teal-500 pl-4">
            Open Positions
          </h2>
        </div>

        <div className="space-y-6">
          {jobs?.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/careers/${job.id}`} className="block h-full group">
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-teal-200 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute top-0 left-0 w-1 h-full bg-teal-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">
                        {job.position}
                      </h3>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                          <Briefcase size={16} className="text-teal-500" />{" "}
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                          <MapPin size={16} className="text-teal-500" />{" "}
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-md border border-slate-100">
                          <Clock size={16} className="text-teal-500" />{" "}
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center self-start md:self-center">
                      <span className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold text-sm rounded-xl group-hover:bg-teal-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        View Details <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Empty State */}
          {(!jobs || jobs.length === 0) && (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-300">
              <Search className="mx-auto h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">
                {/* No open positions */}
                We Are Not Hiring
              </h3>
              <p className="text-slate-500">
                Please check back later for new opportunities.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* --- for Constact section  --- */}
      <Contact />


    </div>
  );
}
