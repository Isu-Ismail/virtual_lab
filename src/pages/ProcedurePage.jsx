import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

function ProcedurePage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-20">
        <div className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center">
          {/* CORRECTED BACK LOGIC */}
          <button
            onClick={() => navigate("/experiment/profile-projector")}
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
            Back to Introduction
          </button>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-500">
            <Link
              to="/experiment/profile-projector"
              className="hover:text-blue-600 transition-colors"
            >
              Introduction
            </Link>
            <Link
              to="/experiment/profile-projector/procedure"
              className="text-blue-600 border-b-2 border-blue-600 pb-1"
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
      <main className="w-full max-w-5xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Experiment Procedure
            </h1>
            <p className="text-slate-600 mt-1">
              Review the lab manual below before starting the experiment.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Download Manual
          </button>
        </div>
        <PDFViewer fileUrl="/Profile_Projector_Manual.pdf" />
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center w-full max-w-md">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Choose a format
            </h2>
            <p className="text-slate-600 mb-8">
              Download the manual as a printable PDF or an editable DOCX file.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/Profile_Projector_Manual.pdf"
                download
                className="flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition-all"
              >
                Download PDF
              </a>
              <a
                href="/Profile_Projector_Manual.docx"
                download
                className="flex-1 bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
              >
                Download DOCX
              </a>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-8 text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcedurePage;
