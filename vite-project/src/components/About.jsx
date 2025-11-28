import { Award, Users, Globe, Heart } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Employees Worldwide" },
    { icon: Globe, value: "75+", label: "Countries Served" },
    { icon: Award, value: "200+", label: "Patents Granted" },
    { icon: Heart, value: "50M+", label: "Patients Helped" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About Iriyo Pharma
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            With over 30 years of excellence, we are committed to discovering,
            developing, and delivering innovative medicines that address the
            world's most pressing health challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-blue-50 rounded-lg"
              >
                <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-4">
              At Iriyo Pharma, we believe that everyone deserves access to
              quality healthcare. Our mission is to transform lives through
              breakthrough innovations in pharmaceutical science.
            </p>
            <p className="text-gray-600 mb-4">
              We focus on therapeutic areas with the greatest unmet medical
              needs, including oncology, cardiovascular diseases, neurology, and
              infectious diseases.
            </p>
            <p className="text-gray-600">
              Through rigorous research, clinical excellence, and unwavering
              commitment to patient safety, we strive to make a meaningful
              difference in the lives of patients around the world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
