import React from "react";
import { Menu, Transition } from "@headlessui/react";

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const ControlButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-white text-slate-700 w-14 h-14 rounded-xl text-2xl flex items-center justify-center hover:bg-slate-50 active:bg-slate-100 transition-colors shadow-md border border-slate-300 active:shadow-inner"
  >
    {children}
  </button>
);

function ControlPanel({
  pointPosition,
  zeroOffset,
  movePoint,
  setRelativeZero,
  resetAbsoluteZero,
  magnification,
  setMagnification,
  buttonMovementStep,
  currentUnit,
  setCurrentUnit,
  correctionFactor,
  onRecalibrate,
  samples,
  onSampleSelect,
  onStartTutorial,
}) {
  const units = {
    micrometer: { factor: 1000, symbol: "µm" },
    mm: { factor: 1, symbol: "mm" },
    cm: { factor: 0.1, symbol: "cm" },
    m: { factor: 0.001, symbol: "m" },
  };
  const virtual_relativeX_mm = (pointPosition.x - zeroOffset.x) / magnification;
  const virtual_relativeY_mm = (pointPosition.y - zeroOffset.y) / magnification;
  const real_relativeX_mm = virtual_relativeX_mm * correctionFactor;
  const real_relativeY_mm = virtual_relativeY_mm * correctionFactor;
  const displayX = real_relativeX_mm * units[currentUnit].factor;
  const displayY = real_relativeY_mm * units[currentUnit].factor;

  const availableTutorials = [
    { id: "gearOD", name: "Gear OD Measurement" } /* Add more tutorials here */,
  ];

  return (
    <div className="w-full h-full bg-white rounded-2xl p-5 shadow-lg flex flex-col gap-5 border border-slate-200">
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center gap-2 rounded-md bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Show Tutorial
            <ChevronDownIcon />
          </Menu.Button>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
            <div className="px-1 py-1 ">
              {availableTutorials.map((tutorial) => (
                <Menu.Item key={tutorial.id}>
                  {({ active }) => (
                    <button
                      onClick={() => onStartTutorial(tutorial.id)}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {tutorial.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <div className="bg-slate-800 text-cyan-300 p-4 rounded-xl shadow-inner border border-slate-700 dro-panel">
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
              className="text-xs bg-cyan-800/50 hover:bg-cyan-700/50 text-cyan-300 font-bold w-6 h-6 rounded dro-x-zero-button"
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
              className="text-xs bg-cyan-800/50 hover:bg-cyan-700/50 text-cyan-300 font-bold w-6 h-6 rounded dro-y-zero-button"
            >
              0
            </button>
          </div>
          <span>{(-displayY).toFixed(3)}</span>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-700 mb-2">Magnification</h3>
        <div className="grid grid-cols-3 gap-2">
          {[10, 20, 50].map((level) => (
            <button
              key={level}
              onClick={() => setMagnification(level)}
              className={`py-2 px-1 text-sm font-semibold rounded-lg transition-colors ${
                magnification === level
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
              }`}
            >
              {level}x
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-700 mb-2">Sample Library</h3>
        <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 h-48 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {samples.map((sample) => (
              <button
                key={sample.name}
                onClick={() => onSampleSelect(sample.image)}
                className={`bg-white p-2 rounded-md shadow-sm border hover:border-blue-500 hover:shadow-md transition-all text-center ${
                  sample.name.toLowerCase() === "gear"
                    ? "sample-gear"
                    : "sample-screw"
                }`}
              >
                <img
                  src={sample.image}
                  alt={sample.name}
                  className="w-full h-20 object-contain"
                />
                <span className="text-xs font-semibold text-slate-600 mt-1 block">
                  {sample.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-700 mb-3">Units</h3>
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
        <div className="grid grid-cols-3 gap-3 items-center justify-items-center w-52 mx-auto stage-controls">
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
