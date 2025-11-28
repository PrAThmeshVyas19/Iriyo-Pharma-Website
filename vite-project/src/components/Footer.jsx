import { Pill, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import iriyoLogo from "../assets/logo/logo2.png";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-green-900 via-teal-900 to-slate-900 p-8 sm:p-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={iriyoLogo} className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Iriyo Pharma</span>
            </div>
            <p className="text-gray-100 mb-4">
              Innovating healthcare for a healthier tomorrow. Committed to
              excellence in pharmaceutical research and development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-100 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-100 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-gray-300 hover:text-white transition"
                >
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="#research"
                  className="text-gray-300 hover:text-white transition"
                >
                  Research
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Patient Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Healthcare Providers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Clinical Trials
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Press Releases
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Compliance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-300">
            &copy; 2025 Iriyo Pharma. All rights reserved. | Improving lives
            through innovative medicine.
          </p>
        </div>
      </div>
    </footer>
  );
}
