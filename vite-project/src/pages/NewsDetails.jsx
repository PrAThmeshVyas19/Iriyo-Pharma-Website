import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  Copy,
  ChevronRight,
} from "lucide-react";
import { getPayloadImage } from "../lib/payload";
import RichText from "../components/RichText";

export default function NewsDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
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

  // --- NEW: Handle Navigation to About Section ---
  const goToAboutSection = (e) => {
    e.preventDefault(); // Prevent default link behavior
    navigate("/"); // 1. Go to Home Page

    // 2. Wait for Home page to load, then scroll
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <p className="mb-4 text-slate-500">Article not found.</p>
        <Link to="/news" className="text-indigo-600 hover:underline">
          Return to News
        </Link>
      </div>
    );

  return (
    <article className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. HERO SECTION */}
      <div className="w-full bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-2">
          {/* Text Side */}
          <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
            <Link
              to="/news"
              className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm">
                  Insight
                </span>
                <span className="text-slate-400 text-sm flex items-center gap-2">
                  <Clock size={14} /> 5 min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-slate-300 border-t border-slate-700 pt-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <User size={14} />
                  </div>
                  <span className="font-medium text-white">
                    {post.author?.name || "Editorial Team"}
                  </span>
                </div>
                <span className="text-slate-600">•</span>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="relative h-[300px] md:h-auto order-1 md:order-2 bg-slate-800">
            {post.image ? (
              <img
                src={getPayloadImage(post.image)}
                alt={post.title}
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                No Image
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Content Body */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg prose-slate max-w-none"
            >
              <RichText content={post.content} />
            </motion.div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Share this article
              </h4>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 hover:text-indigo-600 transition-colors">
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

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-2">
                About Iriyo Pharma
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Pioneering the future of global healthcare through integrity,
                innovation, and scientific excellence.
              </p>

              {/* UPDATED LINK LOGIC */}
              <button
                onClick={goToAboutSection}
                className="text-indigo-600 text-sm font-semibold flex items-center hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Learn more <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
