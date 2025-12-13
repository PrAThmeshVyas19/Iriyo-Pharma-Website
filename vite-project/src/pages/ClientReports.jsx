import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function ClientReport() {
  const [data, setData] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all page views (Limit to last 10000 for performance)
        const res = await fetch(
          `${import.meta.env.VITE_PAYLOAD_URL}/api/page-views?limit=10000`
        );
        const json = await res.json();

        if (json.docs) {
          setTotalVisits(json.totalDocs);
          processData(json.docs);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processData = (docs) => {
    // 1. Group by Month
    const monthlyCounts = {};
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    docs.forEach((visit) => {
      const date = new Date(visit.timestamp);
      const monthName = months[date.getMonth()];
      // Only count current year for simplicity
      if (date.getFullYear() === new Date().getFullYear()) {
        monthlyCounts[monthName] = (monthlyCounts[monthName] || 0) + 1;
      }
    });

    // 2. Format for Recharts
    const chartData = months.map((month) => ({
      name: month,
      visitors: monthlyCounts[month] || 0,
    }));

    setData(chartData);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Report...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Website
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          Website Traffic Report ({new Date().getFullYear()})
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Total Visitors
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {totalVisits}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-green-600">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Performance
                </p>
                <p className="text-3xl font-bold text-slate-900">Good</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-[500px]">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Monthly Visitors
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b" }}
              />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar
                dataKey="visitors"
                fill="#4f46e5"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
