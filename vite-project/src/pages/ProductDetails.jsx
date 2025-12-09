import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, CheckCircle, Share2, Info } from "lucide-react";
import { getPayloadImage } from "../lib/payload";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_PAYLOAD_URL}/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getData();
    } else {
      setLoading(false); // Fix: Stop loading if no ID is present
    }
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

  // ... (Rest of your original render code for details page)
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      {/* ... Paste the rest of your JSX from the file you uploaded ... */}
      {/* I'll assume you keep the layout you already designed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200/50 border border-white"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
              {product.image ? (
                <img
                  src={getPayloadImage(product.image)}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <Package size={80} />
                </div>
              )}
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {product.title}
            </h1>
            <div className="prose prose-slate prose-lg text-slate-600 mb-10">
              <p className="leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
