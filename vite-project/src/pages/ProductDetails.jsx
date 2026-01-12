import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, CheckCircle, Share2, Info } from "lucide-react";
import { getPayloadImage } from "../lib/payload";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null); // State for changing main image

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_PAYLOAD_URL}/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
        // Set initial main image
        if (data.image) setActiveImage(data.image);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) getData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-500">
        <p className="mb-4">Product not found.</p>
        <Link to="/products" className="text-blue-600 hover:underline">
          Return to Catalog
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Main Active Image */}
            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-white mb-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                {activeImage ? (
                  <img
                    src={getPayloadImage(activeImage)}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Package size={80} />
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Grid (Only show if gallery has images) */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {/* Always show main image as first option */}
                {product.image && (
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                      activeImage?.id === product.image.id
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={getPayloadImage(product.image)}
                      className="w-full h-full object-cover"
                    />
                  </button>
                )}

                {/* Map through Gallery */}
                {product.gallery.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(item.image)}
                    className={`rounded-xl overflow-hidden border-2 transition-all aspect-square ${
                      activeImage?.id === item.image?.id
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={getPayloadImage(item.image)}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column: Details (Same as before) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="flex flex-wrap gap-4 mb-8 text-sm">
              {product.category && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 font-bold uppercase tracking-wider">
                  {product.category}
                </span>
              )}
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-100">
                <Info size={16} />
                <span className="font-semibold">Prescription Only</span>
              </div>
            </div>

            <div className="prose prose-slate prose-lg text-slate-600 mb-10">
              <h3 className="text-slate-900 font-bold text-xl mb-3">
                Description
              </h3>
              {/* <p className="leading-relaxed">
                {product.description ||
                  "No description available for this product."}
              </p> */}
              <p className="leading-relaxed whitespace-pre-line">
                {product.description || "No description available for this product."}
              </p>

            </div>

            {/* <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-200">
              <Link
                to="/contact"
                className="flex-1 bg-blue-600 text-white text-center px-8 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
              >
                Request Information
              </Link>
              <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                <Share2 size={18} />
                Share
              </button>
            </div> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
