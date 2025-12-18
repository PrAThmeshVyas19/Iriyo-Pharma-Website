import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  Upload,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import RichText from "../components/RichText";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwLVbBD5OCop7EtEf0sVZObYWrBvcMOTUfJDvbBwLhsUHI3c4iltiSQsiZ7jCeLR-ucSw/exec";

export default function CareerDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null); // New professional error state

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PAYLOAD_URL}/api/careers/${id}`
        );
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) getData();
  }, [id]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Strict Resume Validation
    if (!file) {
      setError("Please upload your resume to continue.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.target);

    try {
      let base64String = await convertToBase64(file);

      const payload = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        source: "Career Application",
        position: job.position,
        base64: base64String,
        filename: file?.name,
        type: file?.type,
      };

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError(
        "We couldn't submit your application. Please check your internet connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-teal-600" />
      </div>
    );
  if (!job) return <div className="text-center py-20">Position not found.</div>;

  return (
    <article className="min-h-screen bg-white font-sans text-slate-900">
      <div className="w-full bg-slate-900 text-white relative overflow-hidden py-12">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/careers"
            className="inline-flex items-center text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back
          </Link>
          <h1 className="text-4xl font-extrabold">{job.position}</h1>
          <div className="flex gap-4 mt-4 text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={16} /> {job.type}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <RichText content={job.description} />
          </div>

          <div className="lg:col-span-5">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Apply for this position
              </h3>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-lg font-bold">Application Received!</h4>
                    <p className="text-slate-600 text-sm mt-2">
                      Your resume has been uploaded and saved to our recruitment
                      sheet.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    {/* Professional Inline Error Display */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm flex items-start gap-2 mb-2"
                        >
                          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">
                          First Name *
                        </label>
                        <input
                          name="firstName"
                          placeholder="John"
                          required
                          className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">
                          Last Name *
                        </label>
                        <input
                          name="lastName"
                          placeholder="Doe"
                          required
                          className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">
                        Email Address *
                      </label>
                      <input
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">
                        Phone Number *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                      />
                    </div>

                    <div className="relative group">
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                        Upload Resume (PDF) *
                      </label>
                      <div
                        className={`border-2 border-dashed rounded-xl p-4 transition-colors bg-white ${
                          file
                            ? "border-teal-500 bg-teal-50/30"
                            : "border-slate-300 group-hover:border-teal-400"
                        }`}
                      >
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setFile(e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          required
                        />
                        <div className="flex flex-col items-center text-slate-500">
                          <Upload
                            className={`w-6 h-6 mb-2 ${
                              file ? "text-teal-600" : ""
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              file ? "text-teal-700 font-medium" : ""
                            }`}
                          >
                            {file ? file.name : "Select your resume"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <>
                          <Send size={18} /> Submit Application
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
