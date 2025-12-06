import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

// --- Background Components (Consistent with About.jsx) ---
const BackgroundLayer = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Dot Pattern */}
    <svg
      className="absolute inset-0 h-full w-full stroke-slate-300/30 mask-image:[radial-linear(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="contact-grid-pattern"
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
        fill="url(#contact-grid-pattern)"
      />
    </svg>

    {/* Animated Blobs */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-2000" />
  </div>
);

// --- Shadcn-style Input Component ---
const InputGroup = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
    />
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["Pune, Maharashtra", "India, 411001"],
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91 123-4567-890", "Mon-Fri, 9am-6pm IST"],
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: Mail,
      title: "Email Inquiries",
      details: ["info@iriyopharma.com", "careers@iriyopharma.com"],
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 bg-slate-50 min-h-screen overflow-hidden"
    >
      <BackgroundLayer />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm px-3 py-1 text-sm font-medium text-blue-800 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Contact Us
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Get in Touch With <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Our Expert Team
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our pharmaceutical solutions? We are here to
            provide you with professional guidance and support.
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 ${info.bg} ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((line, i) => (
                  <p key={i} className="text-slate-600 text-sm font-medium">
                    {line}
                  </p>
                ))}
              </motion.div>
            );
          })}
        </div>

        {/* Main Content: Form & Context Split */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row"
        >
          {/* LEFT: Contact Form */}
          <div className="lg:w-7/12 p-8 sm:p-12">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                Send us a Message
                <MessageSquare className="w-5 h-5 text-blue-500" />
              </h3>
              <p className="text-slate-500 text-sm mt-2">
                Fill out the form below and we will get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="First Name"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="John"
                />
                <InputGroup
                  label="Last Name"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Doe"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Email Address"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
                <InputGroup
                  label="Phone Number"
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 999 999 9999"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Company"
                  id="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Ltd."
                />
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-slate-700"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a subject...</option>
                    <option value="inquiry">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="research">Research Collaboration</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-700"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 resize-none"
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className="w-full bg-slate-900 text-white hover:bg-slate-800 h-12 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Message Sent
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 mt-4">
                      <div className="bg-green-100 p-1 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-green-800 text-sm font-semibold">
                          Success!
                        </p>
                        <p className="text-green-700 text-sm">
                          We'll respond to {formData.email} shortly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* RIGHT: Informational Sidebar */}
          <div className="lg:w-5/12 bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Why Partner With Us?</h3>
              <ul className="space-y-6">
                {[
                  "Global expertise in pharmaceutical R&D",
                  "Rapid response times & dedicated support",
                  "Ethical, transparent business practices",
                  "Customized solutions for complex needs",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="h-3 w-3 text-blue-400 group-hover:text-white" />
                    </div>
                    <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 mt-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4 text-blue-400">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold tracking-wide text-sm uppercase">
                    Operating Hours
                  </span>
                </div>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Monday - Friday</span>
                    <span className="text-white font-medium">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Saturday</span>
                    <span className="text-white font-medium">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Sunday</span>
                    <span className="text-blue-300">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
