import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import iriyoLogo from "../assets/logo/logo2.png";

const navItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About Us", path: "/#about" },
  { id: "products", label: "Products", path: "/products" },
  { id: "research", label: "Research", path: "/news" },
  { id: "careers", label: "Careers", path: "/careers" }, // <--- Added this
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  // Updated logic to highlight "Careers" tab
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/products")) setActiveSection("products");
    else if (path.startsWith("/news")) setActiveSection("research");
    else if (path.startsWith("/careers"))
      setActiveSection("careers"); // <--- Added check
    else if (path === "/") setActiveSection("home");
  }, [location]);

  const handleNavigation = (id, path) => {
    setIsMenuOpen(false);
    setActiveSection(id);

    if (path.startsWith("/#")) {
      const elementId = path.replace("/#", "");

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.getElementById(elementId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation("home", "/")}
          >
            <img
              src={iriyoLogo}
              alt="Iriyo Pharma"
              className="h-16 w-auto hover:opacity-75 transition-opacity duration-200 p-0"
            />
            <div className="hidden sm:flex flex-col ml-3">
              <span className="text-lg font-serif font-extrabold text-slate-900 leading-tight">
                IRIYO
              </span>
              <span className="text-xs font-semibold text-slate-900 tracking-wide">
                PHARMA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id, item.path)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  activeSection === item.id
                    ? "text-teal-600 border-b-2 border-teal-600"
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavigation("contact", "/#contact")}
              className="hidden md:inline-block px-6 py-2 bg-teal-600 text-white rounded-md text-sm font-semibold hover:bg-teal-700 transition-colors duration-200"
            >
              Contact Us
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (Animated) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-gray-200"
            >
              <div className="flex flex-col gap-1 py-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id, item.path)}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                      activeSection === item.id
                        ? "bg-teal-50 text-teal-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="border-t border-gray-200 my-3"></div>
                <button
                  onClick={() => handleNavigation("contact", "/#contact")}
                  className="w-full px-4 py-2.5 bg-teal-600 text-white rounded-md text-sm font-semibold hover:bg-teal-700 transition-colors duration-200"
                >
                  Contact Us
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
