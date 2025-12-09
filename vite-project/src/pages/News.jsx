import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { usePayload } from "../hooks/usePayload";
import { getPayloadImage } from "../lib/payload";

export default function News() {
  // Fetch 'posts' collection, sorted by date descending
  const { data: posts, loading } = usePayload("posts", { sort: "-createdAt" });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Latest <span className="text-indigo-600">Insights</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts?.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="rounded-2xl overflow-hidden mb-6 aspect-video shadow-md bg-slate-100">
                {post.image && (
                  <img
                    src={getPayloadImage(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-600 line-clamp-3 leading-relaxed">
                {post.excerpt || post.content?.substring(0, 100)}...
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
