import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import iriyoLogo from "../assets/logo/logo2.png";

// --- Sub-components ---

const SocialLink = ({ href, icon: Icon }) => (
  <motion.a
    href={href}
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="h-10 w-10 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-sm"
  >
    <Icon size={18} />
  </motion.a>
);

const ContactItem = ({ icon: Icon, text }) => (
  <li className="flex items-start gap-3 text-sm text-slate-400">
    <Icon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
    <span className="leading-relaxed">{text}</span>
  </li>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-8 overflow-hidden border-t border-slate-900 font-sans">
      {/* --- Decorative Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 items-start">
          {/* 1. Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10">
                <img
                  src={iriyoLogo}
                  alt="Iriyo Pharma"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Iriyo Pharma
                </h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">
                  Serving With Care
                </p>
              </div>
            </div>
            {/* <p className="text-slate-400 leading-relaxed text-sm max-w-xs">
              Pioneering the future of global healthcare through integrity,
              innovation, and unwavering scientific excellence.
            </p> */}
          </div>

          {/* 2. Contact Us */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <ContactItem icon={MapPin} text="Pune, Maharashtra, India" />
              <ContactItem icon={Mail} text="ho@iriyopharma.com" />
            </ul>
          </div>

          {/* 3. Connect (Socials) */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg">Connect</h3>
            <p className="text-slate-400 text-sm mb-6">
              Follow our journey on social media for daily updates.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Instagram} />
            </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Iriyo Pharma Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-xs font-medium">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
