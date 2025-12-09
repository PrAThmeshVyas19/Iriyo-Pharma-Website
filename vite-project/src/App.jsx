import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Products from "./pages/Products"; // Your Listing Page
import ProductDetails from "./pages/ProductDetails"; // Your NEW Single Page
import News from "./pages/News";

// Wrapper for Home Page
const Home = () => (
  <>
    <Hero />
    <About />
    <Contact />
  </>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* PRODUCT ROUTES */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />{" "}
            {/* Dynamic Route */}
            <Route path="/news" element={<News />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
