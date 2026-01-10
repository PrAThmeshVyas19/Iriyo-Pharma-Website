import React, { useState, useEffect } from "react"; // Added useState and useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Careers from "./pages/Careers";
import CareerDetails from "./pages/CareerDetails";
import AnalyticsTracker from "./components/AnalyticsTracker";
import ClientReport from "./pages/ClientReports";
import SplashScreen from "./components/SpashScreen";
import Summary from "./components/Summary";

// Wrapper for Home Page
const Home = () => (
  <>
    <Hero />
    <Summary />
    <Contact />
  </>
);

function App() {
  const [loading, setLoading] = useState(true);

  // Optional: Check if user has already seen the splash screen this session
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("splashShown");
    if (hasSeenSplash) {
      setLoading(false);
    }
  }, []);

  const handleVideoEnd = () => {
    setLoading(false);
    sessionStorage.setItem("splashShown", "true"); // Prevent showing again on refresh/nav
  };

  return (
    <>
      {loading ? (
        <SplashScreen onVideoEnd={handleVideoEnd} />
      ) : (
        <Router>
          <AnalyticsTracker />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
              <Routes>
                <Route path="/report" element={<ClientReport />} />
                <Route path="/" element={<Home />} />
                {/* PRODUCT ROUTES */}
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetails />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/careers/:id" element={<CareerDetails />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
