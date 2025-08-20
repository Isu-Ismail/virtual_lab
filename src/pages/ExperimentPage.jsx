import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import your images from the assets folder
import profileProjectorDiagram from "../assets/bench-top-profile-projector.jpg";
import profileProjectorPhoto1 from "../assets/vertical-profile-projector-img_04.jpg";
import profileProjectorPhoto2 from "../assets/vertical-profile-projector-img_05.jpg";

// Reusable component for our animated zig-zag sections
const FeatureSection = ({ imageUrl, title, children, reverse = false }) => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5 },
    },
  };
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 ${
        reverse ? "md:grid-flow-col-dense" : ""
      }`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        variants={imageVariants}
        className={reverse ? "md:col-start-2" : ""}
      >
        <img
          src={imageUrl}
          alt={title}
          className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
      <motion.div variants={textVariants} className="prose max-w-none">
        <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
        {children}
      </motion.div>
    </motion.div>
  );
};

function ExperimentPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20">
        <div className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center">
          {/* CORRECTED BACK LOGIC */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </button>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-500">
            <Link
              to="/experiment/profile-projector"
              className="text-blue-600 border-b-2 border-blue-600 pb-1"
            >
              Introduction
            </Link>
            <Link
              to="/experiment/profile-projector/procedure"
              className="hover:text-blue-600 transition-colors"
            >
              Procedure
            </Link>
            <Link
              to="/lab/profile-projector"
              className="hover:text-blue-600 transition-colors"
            >
              Virtual Lab
            </Link>
          </nav>
        </div>
      </header>
      <main className="w-full max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900">
            The Profile Projector
          </h1>
          <p className="text-xl text-slate-600 mt-4 max-w-3xl mx-auto">
            An inside look at the essential tool for non-contact optical
            measurement and quality inspection.
          </p>
        </div>
        <FeatureSection
          imageUrl={profileProjectorPhoto1}
          title="High-Precision Projection"
        >
          <p className="text-lg text-slate-600">
            The core principle is simple yet powerful: project a magnified
            silhouette of an object onto a screen. This enlarged shadow allows
            for precise 2D measurement of features that are too small or complex
            for traditional tools.
          </p>
        </FeatureSection>
        <FeatureSection
          imageUrl={profileProjectorDiagram}
          title="Key Components"
          reverse={true}
        >
          <p className="text-lg text-slate-600">
            From the illumination source and lenses to the workstage and glass
            screen, each part plays a critical role. Understanding these
            components is key to performing accurate measurements of angles,
            profiles, and dimensions.
          </p>
        </FeatureSection>
        <FeatureSection
          imageUrl={profileProjectorPhoto2}
          title="Digital Readout (DRO)"
        >
          <p className="text-lg text-slate-600">
            Modern projectors are equipped with a Digital Readout (DRO) system.
            This computer-aided device tracks the workstage's movement,
            providing instant, accurate digital measurements of X and Y
            coordinates, angles, and radii.
          </p>
        </FeatureSection>
        <div className="text-center mt-16">
          <Link
            to="/experiment/profile-projector/procedure"
            className="bg-blue-600 text-white font-semibold py-4 px-12 rounded-lg shadow-xl hover:shadow-blue-500/50 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 text-lg"
          >
            Proceed to Procedure
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ExperimentPage;
