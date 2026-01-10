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
  Share2,
} from "lucide-react";
import { getPayloadImage } from "../lib/payload";
import RichText from "../components/RichText";

// --- Background Component ---
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
    <article className="relative min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 selection:bg-blue-100">
      <BackgroundLayer />

      {/* 1. TOP NAVIGATION BAR */}
      <div className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/news"
            className="group flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <div className="p-2 rounded-full bg-white border border-slate-200 group-hover:border-blue-200 group-hover:text-blue-600 mr-3 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to News
          </Link>
          <div className="md:hidden text-slate-400">
            <Share2 size={20} />
          </div>
        </div>
      </div>

      {/* 2. CENTERED CONTENT CONTAINER */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        {/* ARTICLE HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-200 text-xs font-bold uppercase tracking-wider rounded-full">
              {post.category?.title || "Update"}
            </span>
            <span className="text-slate-500 text-sm flex items-center gap-1.5 font-medium bg-white/60 px-2 py-1 rounded-md border border-slate-200">
              <Clock size={14} className="text-blue-500" /> 5 min read
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
            {post.title}
          </h1>

          {/* Author & Date - Centered */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-6 border-t border-slate-200/60 w-full max-w-xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 overflow-hidden shadow-sm">
                {post.author?.image ? (
                  <img
                    src={getPayloadImage(post.author.image)}
                    alt="Author"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">
                  {post.author?.name || "Editorial Team"}
                </p>
                <p className="text-xs text-slate-500">Author</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-8 bg-slate-200" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-teal-600 shadow-sm">
                <Calendar size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900">
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-slate-500">Published</p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* FEATURED IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-16 -mx-4 md:-mx-0 rounded-none md:rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 ring-1 ring-slate-900/5 bg-white"
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

        {/* CONTENT BODY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl prose-img:shadow-lg max-w-none bg-white p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm"
        >
          <RichText content={post.content} />
        </motion.div>

        {/* FOOTER / SHARE */}
        <div className="mt-16 pt-10 border-t border-slate-200 flex flex-col items-center text-center">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Share this article
          </h4>
          <div className="flex gap-4">
            <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white text-slate-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
              <Linkedin size={20} />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white text-slate-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
              <Twitter size={20} />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-[#4267B2] hover:border-[#4267B2] hover:text-white text-slate-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
              <Facebook size={20} />
            </button>
            <button className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-800 hover:border-slate-800 hover:text-white text-slate-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
              <Copy size={20} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
