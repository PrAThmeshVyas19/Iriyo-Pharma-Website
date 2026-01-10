import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Linkedin,
  Twitter,
  Facebook,
  Copy,
  ChevronRight,
  Share2,
} from "lucide-react";
import { getPayloadImage } from "../lib/payload";
import RichText from "../components/RichText";

// --- Background Component (Matches Products/Careers Theme) ---
const BackgroundLayer = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <svg
      className="absolute inset-0 h-full w-full stroke-slate-300/30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="news-grid"
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
      <rect width="100%" height="100%" strokeWidth={0} fill="url(#news-grid)" />
    </svg>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-2000" />
  </div>
);

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_PAYLOAD_URL}/api/posts/${id}`
        );
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) getData();
  }, [id]);

  const goToAboutSection = (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium animate-pulse">
            Loading Article...
          </p>
        </div>
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <BackgroundLayer />
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Article Not Found
          </h2>
          <p className="mb-6 text-slate-500 font-medium">
            The article you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/news"
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Return to News
          </Link>
        </div>
      </div>
    );

  return (
    <article className="relative min-h-screen bg-slate-50 font-sans text-slate-900 pb-20 selection:bg-blue-100">
      <BackgroundLayer />

      {/* 1. TOP NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/news"
            className="group flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <div className="p-2 rounded-full bg-white border border-slate-200 group-hover:border-blue-200 group-hover:text-blue-600 mr-3 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to News
          </Link>

          {/* Mobile Only Share Icon */}
          <div className="md:hidden text-slate-400">
            <Share2 size={20} />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* 2. MAIN CONTENT COLUMN */}
          <div className="lg:col-span-8">
            {/* ARTICLE HEADER */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 md:mb-10"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md shadow-blue-200 text-xs font-bold uppercase tracking-wider rounded-full">
                  {post.category?.title || "Update"}
                </span>
                <span className="text-slate-500 text-sm flex items-center gap-1.5 font-medium bg-white/50 px-2 py-1 rounded-md border border-slate-200/50">
                  <Clock size={14} className="text-blue-500" /> 5 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] mb-6 tracking-tight">
                {post.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-200/60">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-bold shadow-sm">
                  {post.author?.image ? (
                    <img
                      src={getPayloadImage(post.author.image)}
                      alt="Author"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {post.author?.name || "Editorial Team"}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-2 font-medium">
                    <Calendar size={12} className="text-teal-500" />
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.header>

            {/* FEATURED IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-slate-900/5 bg-white"
            >
              {post.image ? (
                <img
                  src={getPayloadImage(post.image)}
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-video"
                />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center text-slate-400 bg-slate-100">
                  No Image Available
                </div>
              )}
            </motion.div>

            {/* RICH TEXT CONTENT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl prose-img:shadow-lg max-w-none bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm"
            >
              <RichText content={post.content} />
            </motion.div>

            {/* SHARE FOOTER */}
            <div className="mt-12">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Share this article
              </h4>
              <div className="flex gap-3">
                <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  <Linkedin size={20} />
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  <Twitter size={20} />
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-[#4267B2] hover:border-[#4267B2] hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  <Facebook size={20} />
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-800 hover:border-slate-800 hover:text-white text-slate-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  <Copy size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. SIDEBAR */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-6">
              {/* About Card */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/40 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-110" />

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mb-6 text-white">
                    <span className="font-bold text-xl">I</span>
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-3">
                    About Iriyo Pharma
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    Pioneering the future of global healthcare through
                    integrity, innovation, and scientific excellence.
                  </p>
                  <button
                    onClick={goToAboutSection}
                    className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-900 font-semibold rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-md transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Learn More{" "}
                    <ChevronRight
                      size={16}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>

              {/* Contact Card */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-400/20 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-xl mb-2">Have a question?</h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                    Our team is here to help you with any inquiries regarding
                    our products or research.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block text-sm font-bold bg-white text-slate-900 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
                {/* Decorative blob */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
