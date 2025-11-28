import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-12 bg-linear-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Innovating Healthcare for a Healthier Tomorrow
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Leading pharmaceutical company dedicated to developing
              life-changing medicines and improving patient outcomes worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection("products")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center space-x-2"
              >
                <span>Our Products</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition"
              >
                Contact Us
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Pharmaceutical Research"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
