import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Package, CheckCircle } from "lucide-react"; // Added CheckCircle for badges if needed
import { usePayload } from "../hooks/usePayload";
import { getPayloadImage } from "../lib/payload";
import fssaiLogo from "../assets/Standard-Logo/fssai.png";
import gmpLogo from "../assets/Standard-Logo/gmp.png";
import whoLogo from "../assets/Standard-Logo/who.png";

// --- Background Component ---
const BackgroundLayer = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <svg
      className="absolute inset-0 h-full w-full stroke-slate-300/30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="products-grid"
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
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill="url(#products-grid)"
      />
    </svg>
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-2000" />
  </div>
);

export default function Products() {
  // Fetch ALL products
  const { data: products, loading } = usePayload("products");

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium animate-pulse">
            Loading Catalog...
          </p>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen w-full bg-slate-50 font-sans text-slate-900">
      <BackgroundLayer />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Pharmaceutical <span className="text-blue-600">Solutions</span>
          </motion.h1>

          {/* New Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            We offer a broad and diversified range of medicines designed to
            serve varied healthcare requirements. Our portfolio spans branded
            formulations, specialty products and over-the-counter solutions.
          </motion.p>

          {/* Certification Marks Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-6"
          >
            {/* WHO GMP Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
              {/* Replace src with actual logo path */}
              <img
                src={whoLogo}
                alt="WHO GMP Certified"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }} // Fallback if image missing
              />
              <span className="text-sm font-bold text-slate-700 hidden">
                WHO GMP Certified
              </span>

              {/* Text Fallback (visible if image fails or while you wait for assets) */}
              <div className="flex items-center gap-2">
                <img
                  src={gmpLogo}
                  alt="WHO GMP Certified"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }} // Fallback if image missing
                />
                <span className="font-semibold text-slate-700">
                  WHO GMP Certified
                </span>
              </div>
            </div>

            {/* FSSAI Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
              {/* Replace src with actual logo path */}
              <img
                src={fssaiLogo}
                alt="FSSAI Certified"
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <span className="text-sm font-bold text-slate-700 hidden">
                FSSAI Approved
              </span>

              {/* Text Fallback */}
              <div className="flex items-center gap-2">
                {/* <CheckCircle className="w-5 h-5 text-blue-600" /> */}
                <span className="font-semibold text-slate-700">
                  FSSAI Approved
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={`/products/${product.id}`}
                className="group block h-full"
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="h-56 overflow-hidden bg-slate-100 relative">
                    {product.image ? (
                      <img
                        src={getPayloadImage(product.image)}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Package size={48} />
                      </div>
                    )}
                    {product.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-blue-700 uppercase">
                          {product.category}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-3">
                      {product.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto">
                      View Details <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
