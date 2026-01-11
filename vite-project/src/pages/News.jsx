import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  Megaphone,
  BookOpen,
  Lightbulb,
  FileText,
} from "lucide-react";
import { usePayload } from "../hooks/usePayload";
import { getPayloadImage } from "../lib/payload";

// Utility to safely extract text from Rich Text JSON
const extractTextFromRichText = (richText) => {
  if (!richText?.root?.children) return "";
  const firstNode = richText.root.children.find(
    (n) => n.type === "paragraph" && n.children.length > 0
  );
  if (firstNode && firstNode.children[0].text) {
    return firstNode.children[0].text.substring(0, 120) + "...";
  }
  return "Read full article for more details.";
};

// --- MOCK DATA ---
const announcements = [
  {
    id: "gst-benefit",
    title: "GST Benefit to Consumers – New MRPs from 22nd Sept",
    date: "2025-09-22",
    content:
      "In response to the recent GST rate reduction, we have reduced MRPs of our product. This move not only aligns with regulatory changes but also reflects our commitment to making quality healthcare more affordable and accessible.",
  },
];

const holidays2026 = [
  { date: "26 Jan", day: "Monday", name: "Republic Day" },
  { date: "04 Mar", day: "Wednesday", name: "Holi" },
  { date: "15 Aug", day: "Saturday", name: "Independence Day" },
  { date: "02 Oct", day: "Friday", name: "Gandhi Jayanti" },
  { date: "20 Oct", day: "Tuesday", name: "Dussehra" },
  { date: "08 Nov", day: "Sunday", name: "Diwali (Deepavali)" },
  { date: "25 Dec", day: "Friday", name: "Christmas" },
];

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
            News & <span className="text-indigo-600">Media Center</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay updated with our latest announcements, blogs, and company
            initiatives.
          </p>
        </div>

        {/* --- SECTION 1: ANNOUNCEMENTS --- */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Megaphone size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              Key Announcements
            </h2>
          </div>

          <div className="grid gap-6">
            {announcements.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white border-l-4 border-indigo-600 rounded-r-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed max-w-3xl">
                      {item.content}
                    </p>
                    <span className="inline-block mt-3 text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Link
                    to={`/announcements/${item.id}`}
                    className="flex-shrink-0 px-4 py-2 bg-slate-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors text-sm whitespace-nowrap"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- SECTION 2: BLOGS (Visible Posts) --- */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <FileText size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Latest Blogs</h2>
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
                        <img
                          src={getPayloadImage(post.image)}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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

                      <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                        {post.excerpt || extractTextFromRichText(post.content)}
                      </p>

                      <div className="flex items-center text-indigo-600 font-semibold text-sm mt-auto group/btn">
                        Read Blog
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}

            {(!posts || posts.length === 0) && (
              <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No blogs posted yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* --- SECTION 3: CALENDAR & COMING SOON --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Column (Span 1) */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Calendar size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Events 2026</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-indigo-600 p-4">
                <h3 className="text-white font-bold text-center">
                  Upcoming Holidays
                </h3>
              </div>
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto custom-scrollbar">
                {holidays2026.map((holiday, idx) => (
                  <div
                    key={idx}
                    className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4"
                  >
                    <div className="bg-indigo-50 text-indigo-700 rounded-lg p-2 text-center min-w-[60px]">
                      <span className="block text-sm font-bold uppercase">
                        {holiday.date.split(" ")[1]}
                      </span>
                      <span className="block text-xl font-extrabold leading-none">
                        {holiday.date.split(" ")[0]}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {holiday.name}
                      </h4>
                      <p className="text-xs text-slate-500">{holiday.day}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Coming Soon Sections (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Stories */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <BookOpen size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Stories to Tell
                </h2>
              </div>
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center h-[200px] flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Stories Coming Soon
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  We are curating inspiring stories to share with our community.
                </p>
              </div>
            </div>

            {/* Initiatives */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Our Initiatives
                </h2>
              </div>
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center h-[200px] flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-3">
                  <Lightbulb size={20} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Initiatives Launching Soon
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                  Stay tuned for updates on our latest community and business
                  initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
