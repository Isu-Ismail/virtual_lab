import React from "react";
import { Link } from "react-router-dom";

// Icon component remains the same
const Icon = ({ children }) => (
  <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
    <span className="text-3xl">{children}</span>
  </div>
);

function HomePage() {
  return (
    // CHANGE: The main container is now a light grey that fills the screen
    <div className="bg-slate-100 min-h-screen">
      {/* Header */}
      {/* CHANGE: The header background is now white and spans the full width */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        {/* ADDED: A centered container for the header content */}
        <div className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <span className="font-bold text-xl text-slate-800">
              Virtual Lab
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link
              to="/experiments"
              className="hover:text-blue-600 transition-colors"
            >
              Experiments
            </Link>
            <Link
              to="/resources"
              className="hover:text-blue-600 transition-colors"
            >
              Resources
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="w-9 h-9 rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 transition-colors flex items-center justify-center">
              ?
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      {/* ADDED: A centered container for the main content */}
      <main className="w-full max-w-7xl mx-auto py-16 sm:py-24 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
          Select Your Experiment
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
          Choose from the available virtual experiments below. Each is designed
          to provide a hands-on learning experience.
        </p>

        {/* Experiment Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Profile Projector Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center border border-slate-100 transform hover:-translate-y-2">
            <Icon>📏</Icon>
            <h3 className="text-xl font-bold text-slate-800">
              Profile Projector
            </h3>
            <p className="mt-2 text-slate-500 flex-grow">
              Measure and inspect the dimensions of various mechanical parts
              with high precision.
            </p>
            <Link
              to="/experiment/profile-projector"
              className="mt-8 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-400/50 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Experiment
            </Link>
          </div>

          {/* Screw Gauge Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center border border-slate-100 transform hover:-translate-y-2">
            <Icon>🔩</Icon>
            <h3 className="text-xl font-bold text-slate-800">Screw Gauge</h3>
            <p className="mt-2 text-slate-500 flex-grow">
              Determine the diameter of thin wires, the thickness of a sheet of
              metal, or other small dimensions.
            </p>
            <Link
              to="#"
              className="mt-8 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-400/50 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Experiment
            </Link>
          </div>

          {/* Vernier Caliper Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center border border-slate-100 transform hover:-translate-y-2">
            <Icon>📐</Icon>
            <h3 className="text-xl font-bold text-slate-800">
              Vernier Caliper
            </h3>
            <p className="mt-2 text-slate-500 flex-grow">
              Accurately measure linear dimensions like length, width, height,
              and diameter of objects.
            </p>
            <Link
              to="#"
              className="mt-8 bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-400/50 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Start Experiment
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm">
        <p>© 2024 Virtual Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
