import React, { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// --- Utility: Animated Counter ---
function Counter({ value }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      // Strip non-numeric characters for calculation
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
      if (!isNaN(numericValue)) {
        motionValue.set(numericValue);
      }
    }
  }, [isInView, value, motionValue]);

  const displayValue = useTransform(
    springValue,
    (latest) => Math.floor(latest).toLocaleString() + "+"
  );

  // FIX: Changed <span> to <motion.span>
  // motion.span can handle the 'displayValue' object directly
  return (
    <motion.span ref={ref}>
      {value.includes("+") ? displayValue : value}
    </motion.span>
  );
}

// --- Utility: Section Wrapper ---
const Section = ({ children, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Summary() {
  return (
    <section className="relative w-full py-20 bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Top Text Section --- */}
        <Section className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-blue-200 bg-white/50 backdrop-blur-md px-3 py-1 text-sm font-medium text-blue-800 mb-6 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Summary
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight">
            Committed to a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Healthier World
            </span>
          </h2>

          <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
            <p>
              IRIYO Pharma is a pharmaceutical company founded by experienced
              professionals with strong expertise across the healthcare and
              pharmaceutical sectors in Maharashtra. Built on{" "}
              <strong className="text-slate-800 font-semibold">
                scientific knowledge
              </strong>{" "}
              and{" "}
              <strong className="text-slate-800 font-semibold">
                ethical values
              </strong>
              , we are committed to delivering high-quality, safe, and
              affordable medicines.
            </p>

            <p>
              With a strong understanding of medical needs regulatory
              requirements, and market dynamics, IRIYO Pharma delivers
              high-quality, safe, effective and{" "}
              <strong className="text-slate-800 font-semibold">
                affordable pharmaceutical solutions.
              </strong>{" "}
              A patient-centric philosophy guides every product, decision, and
              process, ensuring improved patient outcomes and enhanced quality
              of life.
            </p>

            <p>
              Ethics, compliance, and transparency form the backbone of IRIYO
              Pharma’s operations. The company follows strict regulatory
              standards and{" "}
              <strong className="text-slate-800 font-semibold">
                fosters long-term trust with healthcare professionals,
                distributors, and partners
              </strong>{" "}
              through responsible and accountable business practices.
            </p>

            <p>
              Driven by collaboration,{" "}
              <strong className="text-slate-800 font-semibold">
                continuous learning, and quality assurance,
              </strong>{" "}
              IRIYO Pharma strives to support informed medical practice while
              expanding healthcare access, particularly in emerging and
              underserved communities.
            </p>

            <p>
              Guided by integrity and a commitment to service, the company
              continues to grow with a clear focus on patient well-being and
              sustainable healthcare impact.
            </p>
          </div>
        </Section>
      </div>
    </section>
  );
}
