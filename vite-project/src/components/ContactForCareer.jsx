import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageSquareText,
} from "lucide-react";

// REPLACE THIS with your actual Google Apps Script Web App URL
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwLVbBD5OCop7EtEf0sVZObYWrBvcMOTUfJDvbBwLhsUHI3c4iltiSQsiZ7jCeLR-ucSw/exec";

// --- Background Components ---
const BackgroundLayer = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-2000" />
    {/* Grid Pattern */}
    {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div> */}
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
  fullWidth = false,
}) => (
  <div
    className={`flex flex-col gap-2 ${
      fullWidth ? "col-span-1 sm:col-span-2" : ""
    }`}
  >
    <label
      htmlFor={id}
      className="text-sm font-semibold text-slate-700 tracking-wide"
    >
      {label} {required && <span className="text-blue-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
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
      bg: "bg-blue-100/50",
    },
    {
      icon: MapPin,
      title: "Corporate Office",
      details: [
        "4, Ground Floor, Elegant Aariv, \nLaxman Nagar, Balewadi, \nPune-411045, Maharashtra, India.",
      ],
      color: "text-blue-600",
      bg: "bg-blue-100/50",
    },
    {
      icon: Phone,
      title: "Office Timmings",
      details: ["Mon-Sat, 9am-6pm IST"],
      color: "text-indigo-600",
      bg: "bg-indigo-100/50",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["ho@iriyopharma.com"],
      color: "text-teal-600",
      bg: "bg-teal-100/50",
    },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "#",
      label: "LinkedIn",
      color: "text-blue-700 bg-white hover:bg-blue-50 border-blue-100",
    },
    {
      icon: Twitter,
      href: "https://www.x.com/Pharma_Iriyo",
      label: "Twitter",
      color: "text-sky-500 bg-white hover:bg-sky-50 border-sky-100",
    },
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "text-blue-600 bg-white hover:bg-blue-50 border-blue-100",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/iriyo_pharma/",
      label: "Instagram",
      color: "text-pink-600 bg-white hover:bg-pink-50 border-pink-100",
    },
  ];

  return (
    // <section
    //   id="contact"
    //   className="relative py-24 bg-slate-50 min-h-screen overflow-hidden"
    // >
    <section id="contact" className="relative py-6 bg-slate-50 overflow-hidden">

      <BackgroundLayer />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-blue-800 mb-6 shadow-sm"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Let's Connect
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Start a Conversation with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Iriyo Pharma
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Whether you have a question about our products, need partnership
            details, or just want to say hello, we are here to help.
          </motion.p>
        </div> */}

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 ${info.bg} ${info.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <info.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {info.title}
              </h3>
              {info.details.map((line, i) => (
                <p
                  key={i}
                  className="text-slate-500 text-sm font-medium whitespace-pre-line leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* --- Single Centered Form Card --- */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        > */}
          {/* <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative">
            {/* Top Decoration Line */}
            {/* <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-teal-500"></div>

            <div className="p-8 sm:p-12">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  <MessageSquareText className="text-blue-600 w-6 h-6" />
                  Send us a Message
                </h3>
                <p className="text-slate-500 mt-2">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    placeholder="+91 900 000 0000"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputGroup
                    label="Company Name"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Ltd."
                  />
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className="text-sm font-semibold text-slate-700 tracking-wide"
                    >
                      Subject <span className="text-blue-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="flex h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all duration-200 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 cursor-pointer"
                    >
                      <option value="">Select a subject...</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">
                        Partnership Opportunities
                      </option>
                      <option value="Research">Research Collaboration</option>
                      <option value="Careers">Careers & HR</option>
                      <option value="Support">Product Support</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-slate-700 tracking-wide"
                  >
                    Your Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="flex min-h-[140px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading || submitted}
                    className="w-full bg-slate-900 text-white h-14 rounded-xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-70 shadow-xl hover:shadow-2xl hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        Message Sent Successfully
                      </>
                    ) : (
                      <>
                        Send Message <Send className="w-5 h-5 ml-1" />
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3 mt-4 text-green-800 text-sm">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold">
                            Thank you for reaching out!
                          </p>
                          <p className="text-green-700">
                            We have received your message and will get back to
                            you shortly.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div> */}
          {/* </div> */} 
        {/* </motion.div> */}

        {/* Social Links Footer */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex justify-center gap-4"
        >
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className={`p-3.5 rounded-full ${social.color} border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              aria-label={social.label}
            >
              <social.icon size={22} />
            </a>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
}
