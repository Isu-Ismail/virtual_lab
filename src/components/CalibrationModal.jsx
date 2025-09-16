import React from "react";

function CalibrationModal({ onCalibrate, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-30">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Screen Calibration
        </h2>
        <p className="text-slate-600 mb-6">
          The virtual lab needs to quickly calibrate to your screen's resolution
          to ensure measurements are accurate.
        </p>

        <p className="text-lg text-slate-700 mb-8">
          Please click the button below to continue.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="text-slate-600 font-semibold py-3 px-8 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onCalibrate}
            className="bg-green-500 text-white font-bold py-3 px-10 rounded-lg hover:bg-green-600 transition-colors"
          >
            Calibrate
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalibrationModal;
