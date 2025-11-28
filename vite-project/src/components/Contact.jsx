import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
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

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["Pune", "Maharashtra , India"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 123-4567", "+91 987-6543"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@iriyopharma.com", "support@iriyopharma.com"],
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 bg-linear-to-b from-white via-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-black-600 font-extrabold text-sm tracking-widest uppercase">
              Contact Us
            </span>
          </div>
          <h2 className="text-5xl font-bold text-slate-900 mb-5 leading-tight">
            Get in Touch With Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our pharmaceutical solutions? Reach out to us.
            Our expert team is ready to provide you with professional guidance
            and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Contact Info Cards */}
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-teal-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-start gap-4">
                  <div className="shrink-0">
                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-linear-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20">
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600 text-sm mb-1.5 last:mb-0 font-medium"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Form */}
            <div className="p-8 sm:p-12 lg:p-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Send us a Message
              </h3>
              <p className="text-gray-600 text-sm mb-8">
                We typically respond within 24 hours
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all bg-gray-50 hover:bg-white"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all bg-gray-50 hover:bg-white"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email & Phone Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all bg-gray-50 hover:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all bg-gray-50 hover:bg-white"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Company & Subject Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all bg-gray-50 hover:bg-white"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all bg-gray-50 hover:bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="partnership">Partnership</option>
                      <option value="support">Support</option>
                      <option value="research">Research Collaboration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-300 transition-all resize-none bg-gray-50 hover:bg-white"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-teal-600 to-teal-700 text-white py-3.5 rounded-lg font-bold hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 transform"
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
                    <p className="text-green-800 text-sm font-medium">
                      Thank you! We'll get back to you soon.
                    </p>
                  </div>
                )}
              </form>
            </div>

            {/* Info Section */}
            <div className="hidden lg:flex flex-col justify-between bg-linear-to-br from-slate-900 via-teal-900 to-slate-900 p-8 sm:p-12">
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">
                  Why Contact Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Expert guidance on pharmaceutical solutions",
                    "Fast response time from our dedicated team",
                    "Customized solutions for your needs",
                    "Professional and confidential support",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="shrink-0 h-6 w-6 rounded-full bg-teal-600 flex items-center justify-center mt-0.5">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-200 text-sm font-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-sm text-gray-300 mb-4">
                  <span className="font-bold text-white">Business Hours:</span>
                </p>
                <div className="space-y-2.5 text-sm text-gray-200">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
