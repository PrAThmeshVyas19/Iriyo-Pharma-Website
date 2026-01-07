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
  Loader2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

// REPLACE THIS with your actual Google Apps Script Web App URL
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwLVbBD5OCop7EtEf0sVZObYWrBvcMOTUfJDvbBwLhsUHI3c4iltiSQsiZ7jCeLR-ucSw/exec";

// --- Background Components ---
const BackgroundLayer = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 h-full w-full stroke-slate-300/30"
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
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-2000" />
  </div>
);

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
      className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-all duration-200"
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

    try {
      const payload = {
        ...formData,
        source: "Contact Us",
      };

      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
    } catch (error) {
      console.error("Submission error:", error);
      setLoading(false);
      alert(
        "Something went wrong. Please check your connection and try again."
      );
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Registered Office",
      details: [
        "Iriyo Pharma Pvt.Ltd \nEisha Zenith, Indira School Road, \nTathawade, Pimpri-Chinchwad, \nPune-411033, Maharashtra, India.",
      ],
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: MapPin,
      title: "Corporate Office",
      details: [
        "4, Ground Floor, Elegant Aariv, \nLaxman Nagar, Balewadi, \nPune-411045, Maharashtra, India.",
      ],
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

  const socialLinks = [
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "text-blue-700 bg-blue-50 hover:bg-blue-100",
    },
    {
      icon: Twitter,
      href: "https://www.x.com/Pharma_Iriyo",
      label: "Twitter",
      color: "text-sky-500 bg-sky-50 hover:bg-sky-100",
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "text-blue-600 bg-blue-50 hover:bg-blue-100",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/iriyo_pharma/",
      label: "Instagram",
      color: "text-pink-600 bg-pink-50 hover:bg-pink-100",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 bg-slate-50 min-h-screen overflow-hidden"
    >
      <BackgroundLayer />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/60 backdrop-blur-sm px-3 py-1 text-sm font-medium text-blue-800 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Contact Us
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Get in Touch With <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Our Expert Team
            </span>
          </h2>
        </motion.div>

        {/* Info Grid - Updated for better alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-xl transition-all text-center lg:text-left h-full"
            >
              <div
                className={`w-12 h-12 ${info.bg} ${info.color} rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0 group-hover:scale-110 transition-transform`}
              >
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {info.title}
              </h3>
              {info.details.map((line, i) => (
                <p
                  key={i}
                  className="text-slate-600 text-sm font-medium whitespace-pre-line leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className={`p-4 rounded-full ${social.color} transition-all duration-300 hover:-translate-y-1 shadow-sm border border-black/5`}
              aria-label={social.label}
            >
              <social.icon size={24} />
            </a>
          ))}
        </motion.div>

        {/* Main Form Area */}
        <motion.div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
          <div className="lg:w-7/12 p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
              Send us a Message{" "}
              <MessageSquare className="w-5 h-5 text-blue-500" />
            </h3>

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
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="flex h-11 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <option value="">Select a subject...</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Research">Research Collaboration</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-700"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 resize-none"
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className="w-full bg-slate-900 text-white h-12 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
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
                  >
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 mt-4 text-green-800 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Success! We've received your inquiry from the Contact Us
                      form.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="lg:w-5/12 bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6">Why Partner With Us?</h3>
              <ul className="space-y-6 text-slate-300 text-sm">
                <li className="flex items-center gap-3">
                  <ArrowRight size={14} /> Global expertise in R&D
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={14} /> Rapid response times
                </li>
                <li className="flex items-center gap-3">
                  <ArrowRight size={14} /> Ethical business practices
                </li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-xl border border-white/10 mt-12 relative z-10">
              <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold text-xs uppercase">
                <Clock size={16} /> Operating Hours
              </div>
              <div className="text-sm text-slate-300 space-y-2">
                <p className="flex justify-between border-b border-white/10 pb-2">
                  <span>Mon - Fri</span> <span>9 AM - 6 PM</span>
                </p>
                <p className="flex justify-between pt-1">
                  <span>Sunday</span>{" "}
                  <span className="text-blue-300">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
