import React, { useState } from "react";
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

// --- MOCK DATA---
const announcements = [
  {
    id: "gst-benefit",
    title: "GST Benefit to Consumers – New MRPs from 22nd Sept",
    date: "2025-09-22",
    content:
      "In response to the recent GST rate reduction, we have reduced MRPs of our product. This move not only aligns with regulatory changes but also reflects our commitment to making quality healthcare more affordable and accessible.",
  },
];

// const holidays2026 = [
//   { date: "26 Jan", day: "Monday", name: "Republic Day" },
//   { date: "04 Mar", day: "Wednesday", name: "Holi" },
//   { date: "15 Aug", day: "Saturday", name: "Independence Day" },
//   { date: "02 Oct", day: "Friday", name: "Gandhi Jayanti" },
//   { date: "20 Oct", day: "Tuesday", name: "Dussehra" },
//   { date: "08 Nov", day: "Sunday", name: "Diwali (Deepavali)" },
//   { date: "25 Dec", day: "Friday", name: "Christmas" },
// ];
const holidays2026 = [
  { date: "2026-01-26", name: "Republic Day" },
  { date: "2026-03-04", name: "Holi" },
  { date: "2026-08-15", name: "Independence Day" },
  { date: "2026-10-02", name: "Gandhi Jayanti" },
  { date: "2026-10-20", name: "Dussehra" },
  { date: "2026-11-08", name: "Diwali (Deepavali)" },
  { date: "2026-12-25", name: "Christmas" },
];
function HolidayCalendar({ year = 2026, holidays = [] }) {
  const [monthIndex, setMonthIndex] = useState(0); // 0 = Jan
  const [selectedDate, setSelectedDate] = useState(null);

  // Build quick lookup map: "YYYY-MM-DD" -> holiday object
  const holidayMap = React.useMemo(() => {
    const m = new Map();
    holidays.forEach((h) => m.set(h.date, h));
    return m;
  }, [holidays]);

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const firstDay = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startWeekday = firstDay.getDay(); // 0 Sun .. 6 Sat

  const cells = [];
  // leading empty cells
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  // days
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  // trailing empty cells to complete 6 rows (42 cells)
  while (cells.length < 42) cells.push(null);

  const toISO = (d) => {
    const mm = String(monthIndex + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const monthHolidays = holidays
    .filter((h) => {
      const dt = new Date(h.date);
      return dt.getFullYear() === year && dt.getMonth() === monthIndex;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-4xl w-full">
      {/* Header */}
      <div className="bg-indigo-600 p-4 flex items-center justify-between gap-3">
        <button
          onClick={() => setMonthIndex((m) => (m === 0 ? 11 : m - 1))}
          className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
        >
          Prev
        </button>

        <div className="text-center">
          <h3 className="text-white font-extrabold text-lg">
            {monthNames[monthIndex]} {year}
          </h3>
          <p className="text-white/80 text-xs">Holidays & Festivals highlighted</p>
        </div>

        <button
          onClick={() => setMonthIndex((m) => (m === 11 ? 0 : m + 1))}
          className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
        >
          Next
        </button>
      </div>

      {/* Weekday row */}
      <div className="grid grid-cols-7 text-xs font-bold text-slate-500 bg-slate-50 border-b border-slate-200">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((w) => (
          <div key={w} className="p-3 text-center">{w}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={idx} className="h-16 border-b border-r border-slate-100 bg-white" />;
          }

          const iso = toISO(day);
          const holiday = holidayMap.get(iso);
          const isSelected = selectedDate === iso;

          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(iso)}
              className={[
                "h-16 border-b border-r border-slate-100 p-2 text-left transition",
                "hover:bg-slate-50",
                holiday ? "bg-indigo-50" : "bg-white",
                isSelected ? "ring-2 ring-indigo-500 ring-inset" : "",
              ].join(" ")}
              title={holiday ? holiday.name : ""}
            >
              <div className="flex items-start justify-between">
                <span className="text-sm font-bold text-slate-900">{day}</span>
                {holiday && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-semibold">
                    Holiday
                  </span>
                )}
              </div>

              {holiday && (
                <div className="mt-1 text-[11px] font-semibold text-indigo-700 line-clamp-2">
                  {holiday.name}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="p-4 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-200 p-4">
          <h4 className="font-bold text-slate-900 mb-2">Selected Date</h4>
          {selectedDate ? (
            holidayMap.get(selectedDate) ? (
              <div>
                <p className="text-slate-700 font-semibold">{selectedDate}</p>
                <p className="text-indigo-700 font-bold mt-1">
                  {holidayMap.get(selectedDate).name}
                </p>
              </div>
            ) : (
              <p className="text-slate-600">{selectedDate} — No holiday listed.</p>
            )
          ) : (
            <p className="text-slate-500">Click any date to see details.</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <h4 className="font-bold text-slate-900 mb-2">
            {monthNames[monthIndex]} Holidays
          </h4>
          {monthHolidays.length ? (
            <ul className="space-y-2">
              {monthHolidays.map((h) => (
                <li key={h.date} className="flex items-center justify-between gap-3">
                  <span className="text-slate-700 font-semibold">{h.name}</span>
                  <span className="text-xs text-slate-500">{h.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">No holidays added for this month.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function News() {
  // ONLY UI state added 
  const [activeTab, setActiveTab] = useState("announcements");

  // Payload code 
  const { data: posts, loading } = usePayload("posts", { sort: "-createdAt" });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const tabs = [
    { id: "announcements", label: "Key Announcements" },
    { id: "blogs", label: "Latest Blogs" },
    { id: "events", label: "Events 2026" },
    { id: "stories", label: "Stories to Tell" },
    { id: "initiatives", label: "Our Initiatives" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            {/* News & <span className="text-indigo-600">Media Center</span> */}
            News & Media Center
          </h1>
          {/* <p className="text-lg text-slate-600 max-w-2xl mx-auto">
           */}
           <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">

            Stay updated with our latest announcements, blogs, and company
            initiatives.
          </p>
          {/* TABS */}
          {/* <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"> */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16">

            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all
                  ${
                    activeTab === t.id
                      ? "bg-indigo-600 text-white border-indigo-600 shadow"
                      : "bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:text-indigo-700"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>

        </div>

        {/* ================= TAB 1: ANNOUNCEMENTS ================= */}
        {activeTab === "announcements" && (
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
        )}

        {/* ================= TAB 2: BLOGS (Payload Posts) ================= */}
        {activeTab === "blogs" && (
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
                          {post.excerpt ||
                            extractTextFromRichText(post.content)}
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
        )}

        {/* ================= TAB 3: EVENTS (only Calendar) ================= */}
        {/* {activeTab === "events" && (
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Calendar size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Events 2026</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-xl">
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
        )} */}
        {/* {activeTab === "events" && (
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Calendar size={24} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Events 2026</h2>
          </div> */}

          {/* CENTERED CALENDAR */}
          {/* <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-xl w-full">
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
        </div>
      )} */}
      {activeTab === "events" && (
      <div className="mb-24">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
            <Calendar size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Events {2026}</h2>
        </div>

        <div className="flex justify-center">
          <HolidayCalendar year={2026} holidays={holidays2026} />
        </div>
      </div>
    )}



        {/* ================= TAB 4: STORIES ================= */}
        {activeTab === "stories" && (
          <div className="mb-24">
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
        )}

        {/* ================= TAB 5: INITIATIVES ================= */}
        {activeTab === "initiatives" && (
          <div className="mb-24">
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
        )}
      </div>
    </div>
  );
}
