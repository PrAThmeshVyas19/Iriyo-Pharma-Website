import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
} from "lucide-react";
import iriyoLogo from "../assets/logo/logo2.png";

// --- Sub-components for cleaner code ---

const SocialLink = ({ href, icon: Icon }) => (
  <motion.a
    href={href}
    whileHover={{ y: -3, scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="h-10 w-10 bg-slate-800/50 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300 group"
  >
    <Icon className="h-5 w-5" />
  </motion.a>
);

const FooterLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="group flex items-center text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm font-medium"
    >
      <span className="w-0 h-px bg-blue-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300" />
      {children}
    </a>
  </li>
);

const FooterColumn = ({ title, children }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-white font-bold tracking-wide text-sm uppercase flex items-center gap-2">
      {title}
    </h3>
    <ul className="space-y-3">{children}</ul>
  </div>
);

// --- Main Component ---

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-slate-300 py-16 overflow-hidden border-t border-slate-800">
      {/* 1. Animated Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px] animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-[128px] animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {/* UPDATED: Added bg-white to ensure the dark logo is visible */}
              <div className="p-2 bg-white rounded-lg shadow-lg shadow-blue-900/20">
                <img
                  src={iriyoLogo}
                  alt="Iriyo Pharma"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Iriyo Pharma
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Pioneering the future of global healthcare through integrity,
              innovation, and scientific excellence.
            </p>

            <div className="flex gap-3">
              <SocialLink href="#" icon={Facebook} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Instagram} />
            </div>
          </div>

          {/* Links Columns */}
          <FooterColumn title="Company">
            <FooterLink href="#about">About Us</FooterLink>
            <FooterLink href="#careers">Careers</FooterLink>
            <FooterLink href="#news">News & Media</FooterLink>
            <FooterLink href="#contact">Contact Support</FooterLink>
          </FooterColumn>

          <FooterColumn title="Research & Science">
            <FooterLink href="#oncology">Oncology</FooterLink>
            <FooterLink href="#neurology">Neurology</FooterLink>
            <FooterLink href="#immunology">Immunology</FooterLink>
            <FooterLink href="#trials">Clinical Trials</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal & Compliance">
            <FooterLink href="#privacy">Privacy Policy</FooterLink>
            <FooterLink href="#terms">Terms of Service</FooterLink>
            <FooterLink href="#cookies">Cookie Settings</FooterLink>
            <FooterLink href="#accessibility">Accessibility</FooterLink>
          </FooterColumn>
        </div>

        {/* 3. Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Iriyo Pharma Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Systems Operational
            </div>
            <a
              href="#"
              className="text-slate-500 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              Employee Portal <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
