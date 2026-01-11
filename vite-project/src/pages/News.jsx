import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { usePayload } from "../hooks/usePayload";
import { getPayloadImage } from "../lib/payload";

// Utility to safely extract text from Rich Text JSON
const extractTextFromRichText = (richText) => {
  if (!richText?.root?.children) return "";
  // Grab the first paragraph's text only
  const firstNode = richText.root.children.find(
    (n) => n.type === "paragraph" && n.children.length > 0
  );
  if (firstNode && firstNode.children[0].text) {
    return firstNode.children[0].text.substring(0, 120) + "...";
  }
  return "Read full article for more details.";
};

export default function News() {
  const { data: posts, loading } = usePayload("posts", { sort: "-createdAt" });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Latest <span className="text-indigo-600">Insights</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/news/${post.id}`} className="group h-full block">
                <article className="h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Image */}
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    {post.image ? (
                      // <img
                      //   src={getPayloadImage(post.image)}
                      //   alt={post.title}
                      //   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      // />
                        <img
                          src={getPayloadImage(post.image)}
                          alt={post.title}
                          className="w-full h-full object-contain bg-white transition-transform duration-700 group-hover:scale-105"
                        />

                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                      <Calendar size={12} />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h3>

                    {/* Safe Excerpt */}
                    <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                      {post.excerpt || extractTextFromRichText(post.content)}
                    </p>

                    <div className="flex items-center text-indigo-600 font-semibold text-sm mt-auto group/btn">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
