import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Copy,
  ChevronRight,
} from "lucide-react";
import RichText from "../components/RichText"; // Reuse the renderer

export default function CareerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_PAYLOAD_URL}/api/careers/${id}`
        );
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) getData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-6 w-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="mb-4 text-slate-500">Position not found.</p>
        <Link to="/careers" className="text-teal-600 hover:underline">
          Return to Careers
        </Link>
      </div>
    );

  return (
    <article className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. HERO SECTION */}
      <div className="w-full bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 relative z-10">
          {/* Text Side */}
          <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            <Link
              to="/careers"
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Careers
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-lg shadow-teal-500/20">
                  Open Position
                </span>
                <span className="text-slate-300 text-sm flex items-center gap-2">
                  <Clock size={14} /> Posted recently
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-white">
                {job.position}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 border-t border-slate-700/50 pt-6 mt-2">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-teal-400" />
                  <span className="font-medium text-white">
                    {job.department}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-teal-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-teal-400" />
                  <span>{job.type}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Abstract / Image Side */}
          <div className="relative h-[200px] md:h-auto order-1 md:order-2 bg-slate-800 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-slate-700 rounded-2xl mx-auto flex items-center justify-center mb-4 text-teal-400">
                <Briefcase size={40} />
              </div>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">
                Join our {job.department} team and help shape the future of
                medicine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Content Body (8 Cols) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-teal-600"
            >
              <RichText content={job.description} />
            </motion.div>

            {/* Application Button (Bottom) */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Ready to Apply?
              </h3>
              <p className="text-slate-600 mb-6">
                Send your resume and cover letter to our HR team directly.
                Please mention the Job Title in the subject line.
              </p>
              <a
                href={`mailto:careers@iriyopharma.com?subject=Application for ${job.position}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white text-lg font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg hover:shadow-teal-500/30"
              >
                Apply via Email
              </a>
            </div>
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Widget 1: Apply Now (Sticky) */}
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-2">
                Interested in this role?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                We are looking for candidates who share our values of integrity
                and innovation.
              </p>
              <a
                href={`mailto:careers@iriyopharma.com?subject=Application for ${job.position}`}
                className="w-full block text-center px-4 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                Apply Now
              </a>
            </div>

            {/* Widget 2: Share */}
            <div className="p-6 border border-slate-200 rounded-lg">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Share this opening
              </h4>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-blue-700 transition-colors">
                  <Linkedin size={18} />
                </button>
                <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-blue-500 transition-colors">
                  <Twitter size={18} />
                </button>
                <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-blue-700 transition-colors">
                  <Facebook size={18} />
                </button>
                <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <Copy size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
