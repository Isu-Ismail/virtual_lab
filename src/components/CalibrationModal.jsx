import React, { useState } from "react";

function CalibrationModal({ onCalibrate, onCancel, virtualLength }) {
  const [measuredLength, setMeasuredLength] = useState("");

  const handleSubmit = () => {
    const measuredValue = parseFloat(measuredLength);
    if (!isNaN(measuredValue) && measuredValue > 0) {
      onCalibrate(measuredValue); // Pass the user's ruler measurement back
    } else {
      alert(
        "Please enter a valid, positive number for the length you measured."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-30">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Screen Calibration
        </h2>
        <p className="text-slate-600 mb-6">
          To ensure measurements match the real world, please calibrate the lab
          to your screen.
        </p>

        <div className="bg-slate-100 p-6 rounded-lg border border-slate-200">
          <p className="font-semibold text-center mb-4">
            The virtual distance between the two red markers is exactly{" "}
            <span className="text-blue-600 font-bold">
              {virtualLength.toFixed(3)} mm
            </span>
            .
          </p>

          {/* Reference Markers */}
          <div className="relative h-10 flex items-center justify-center">
            <div className="absolute left-0 w-px h-full bg-red-500"></div>
            <div className="w-full border-t-2 border-dashed border-slate-400"></div>
            <div className="absolute right-0 w-px h-full bg-red-500"></div>
          </div>

          <ol className="list-decimal list-inside text-slate-600 space-y-2 mt-4">
            <li>
              Take a physical ruler and measure the distance between the two red
              markers on your screen.
            </li>
            <li>
              Enter the length you measured (in **mm**) into the box below.
            </li>
          </ol>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <input
            type="number"
            value={measuredLength}
            onChange={(e) => setMeasuredLength(e.target.value)}
            placeholder="e.g., 89"
            className="flex-grow p-3 border border-slate-300 rounded-lg text-lg"
          />
          <span className="text-lg font-semibold text-slate-500">mm</span>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="text-slate-600 font-semibold py-2 px-6 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-bold py-2 px-8 rounded-lg hover:bg-green-600 transition-colors"
          >
            Calibrate
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalibrationModal;
