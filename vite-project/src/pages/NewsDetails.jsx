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
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="mb-4 text-slate-500 font-medium">Article not found.</p>
        <Link
          to="/news"
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          Return to News
        </Link>
      </div>
    );

  return (
    <article className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* 1. TOP NAVIGATION BAR */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/news"
            className="group flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <div className="p-2 rounded-full bg-slate-100 group-hover:bg-blue-50 mr-3 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to News
          </Link>

          {/* Mobile Only Share Icon (Optional visual cue) */}
          <div className="md:hidden text-slate-400">
            <Share2 size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* 2. MAIN CONTENT COLUMN (Spans 8 cols on large screens) */}
          <div className="lg:col-span-8">
            {/* ARTICLE HEADER */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 md:mb-12"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold uppercase tracking-wider rounded-full">
                  {post.category?.title || "Update"}
                </span>
                <span className="text-slate-400 text-sm flex items-center gap-1.5">
                  <Clock size={14} /> 5 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] mb-6">
                {post.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-700 font-bold border border-white shadow-sm">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {post.author?.name || "Editorial Team"}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-2">
                    <Calendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.header>

            {/* FEATURED IMAGE - 16:9 Aspect Ratio for Full Visibility */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-12 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/5 bg-slate-100"
            >
              {post.image ? (
                <img
                  src={getPayloadImage(post.image)}
                  alt={post.title}
                  className="w-full h-auto object-cover aspect-video" // aspect-video ensures 16:9 ratio on all devices
                />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center text-slate-400 bg-slate-50">
                  No Image Available
                </div>
              )}
            </motion.div>

            {/* RICH TEXT CONTENT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg prose-slate prose-blue max-w-none 
              prose-headings:font-bold prose-headings:text-slate-900 
              prose-p:text-slate-600 prose-p:leading-relaxed
              prose-img:rounded-xl prose-img:shadow-lg"
            >
              <RichText content={post.content} />
            </motion.div>

            {/* SHARE FOOTER */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Share this article
              </h4>
              <div className="flex gap-3">
                <button className="p-3 bg-slate-50 rounded-full hover:bg-blue-600 hover:text-white text-slate-600 transition-all duration-300">
                  <Linkedin size={20} />
                </button>
                <button className="p-3 bg-slate-50 rounded-full hover:bg-sky-500 hover:text-white text-slate-600 transition-all duration-300">
                  <Twitter size={20} />
                </button>
                <button className="p-3 bg-slate-50 rounded-full hover:bg-blue-800 hover:text-white text-slate-600 transition-all duration-300">
                  <Facebook size={20} />
                </button>
                <button className="p-3 bg-slate-50 rounded-full hover:bg-slate-800 hover:text-white text-slate-600 transition-all duration-300">
                  <Copy size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* 3. SIDEBAR (Spans 4 cols, hidden on very small screens, stacks on tablets) */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <div className="sticky top-24 space-y-8">
              {/* About Card */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 text-blue-600">
                  {/* You can put a mini Logo here */}
                  <span className="font-bold text-xl">I</span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  About Iriyo Pharma
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Pioneering the future of global healthcare through integrity,
                  innovation, and scientific excellence.
                </p>
                <button
                  onClick={goToAboutSection}
                  className="w-full py-3 bg-white border border-slate-200 text-slate-900 text-sm font-semibold rounded-xl hover:border-blue-300 hover:text-blue-600 hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Learn More <ChevronRight size={16} />
                </button>
              </div>

              {/* Newsletter / CTA (Optional Placeholder) */}
              <div className="p-6 rounded-2xl bg-blue-600 text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Get the latest pharmaceutical insights directly to your
                    inbox.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block text-xs font-bold bg-white text-blue-600 px-4 py-2 rounded-lg"
                  >
                    Contact Us
                  </Link>
                </div>
                {/* Decorative blob */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
