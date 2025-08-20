import React from "react";

// ControlButton component remains the same
const ControlButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-white text-slate-700 w-14 h-14 rounded-xl text-2xl flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-md border border-slate-300 active:shadow-inner"
  >
    {children}
  </button>
);

// UPDATED: Receive scaleFactor and onRecalibrate as props
function ControlPanel({
  pointPosition,
  zeroOffset,
  movePoint,
  setRelativeZero,
  resetAbsoluteZero,
  magnification,
  buttonMovementStep,
  currentUnit,
  setCurrentUnit,
  scaleFactor,
  onRecalibrate,
}) {
  const units = {
    micrometer: { factor: 1000, symbol: "µm" },
    mm: { factor: 1, symbol: "mm" },
    cm: { factor: 0.1, symbol: "cm" },
    m: { factor: 0.001, symbol: "m" },
  };

  // --- UPDATED: Apply the scaleFactor to the base calculation ---
  const relativeX_mm =
    ((pointPosition.x - zeroOffset.x) / magnification) * scaleFactor;
  const relativeY_mm =
    ((pointPosition.y - zeroOffset.y) / magnification) * scaleFactor;

  const displayX = relativeX_mm * units[currentUnit].factor;
  const displayY = relativeY_mm * units[currentUnit].factor;

  return (
    <div className="w-full h-full bg-white rounded-2xl p-5 shadow-lg flex flex-col gap-5 border border-slate-200">
      <div className="bg-slate-800 text-cyan-300 p-4 rounded-xl shadow-inner border border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-slate-400 tracking-wider">
            DIGITAL READOUT
          </h2>
          <span className="font-mono text-lg text-cyan-500">
            {units[currentUnit].symbol}
          </span>
        </div>
        <div className="font-mono text-4xl flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-cyan-600">X:</span>
            <button
              onClick={() => setRelativeZero("x")}
              className="text-xs bg-cyan-800/50 hover:bg-cyan-700/50 text-cyan-300 font-bold w-6 h-6 rounded"
            >
              0
            </button>
          </div>
          <span>{displayX.toFixed(3)}</span>
        </div>
        <div className="font-mono text-4xl flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <span className="text-cyan-600">Y:</span>
            <button
              onClick={() => setRelativeZero("y")}
              className="text-xs bg-cyan-800/50 hover:bg-cyan-700/50 text-cyan-300 font-bold w-6 h-6 rounded"
            >
              0
            </button>
          </div>
          <span>{(-displayY).toFixed(3)}</span>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-700 mb-3">Units</h3>
        {/* ... Unit selector buttons remain the same ... */}
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(units).map((unit) => (
            <button
              key={unit}
              onClick={() => setCurrentUnit(unit)}
              className={`py-2 px-1 text-sm font-semibold rounded-lg transition-colors ${
                currentUnit === unit
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {units[unit].symbol}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-700 mb-3">Stage Position</h3>
        {/* ... Stage position buttons remain the same ... */}
        <div className="grid grid-cols-3 gap-3 items-center justify-items-center w-52 mx-auto">
          <div></div>
          <ControlButton onClick={() => movePoint("y", -buttonMovementStep)}>
            ▲
          </ControlButton>
          <div></div>
          <ControlButton onClick={() => movePoint("x", -buttonMovementStep)}>
            ◀
          </ControlButton>
          <button
            onClick={resetAbsoluteZero}
            className="bg-red-500 text-white w-16 h-16 rounded-full text-sm font-bold shadow-lg border-b-4 border-red-700 active:border-b-2 hover:bg-red-400 transition-all"
          >
            ZERO
          </button>
          <ControlButton onClick={() => movePoint("x", buttonMovementStep)}>
            ▶
          </ControlButton>
          <div></div>
          <ControlButton onClick={() => movePoint("y", buttonMovementStep)}>
            ▼
          </ControlButton>
          <div></div>
        </div>
      </div>

      {/* --- NEW: Recalibrate Button --- */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={onRecalibrate}
          className="w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg shadow-sm border-b-4 border-gray-300 active:border-b-2 hover:bg-gray-100 transition-all"
        >
          Recalibrate Screen
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;
