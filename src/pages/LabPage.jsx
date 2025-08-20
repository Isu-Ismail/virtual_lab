import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import ProjectorScreen from "../components/ProjectorScreen";
import CalibrationModal from "../components/CalibrationModal";

function LabPage() {
  const navigate = useNavigate();

  // All state and logic... (omitted for brevity, remains the same as previous full code version)
  const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
  const [zeroOffset, setZeroOffset] = useState({ x: 0, y: 0 });
  const [currentUnit, setCurrentUnit] = useState("mm");
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [magnification] = useState(10);
  const MM_PER_FRAME = 0.05;
  const animationMovementStep = MM_PER_FRAME * magnification;
  const MM_PER_CLICK = 1.0;
  const buttonMovementStep = MM_PER_CLICK * magnification;
  const keysPressed = useRef({});
  const animationFrameId = useRef();

  const movePoint = (axis, amountInPixels) => {
    setPointPosition((prev) => ({
      ...prev,
      [axis]: prev[axis] + amountInPixels,
    }));
  };
  const setRelativeZero = (axis) => {
    setZeroOffset((prev) => ({ ...prev, [axis]: pointPosition[axis] }));
  };
  const resetAbsoluteZero = () => {
    setPointPosition({ x: 0, y: 0 });
    setZeroOffset({ x: 0, y: 0 });
  };

  const handleCalibration = () => {
    const REFERENCE_LINE_PIXELS = 400;
    const VIRTUAL_LINE_LENGTH_MM = 50;
    const internalProgramLength = REFERENCE_LINE_PIXELS / magnification;
    const newScaleFactor = VIRTUAL_LINE_LENGTH_MM / internalProgramLength;
    setScaleFactor(newScaleFactor);
    setIsCalibrating(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
    };
    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    const gameLoop = () => {
      if (keysPressed.current["w"]) {
        movePoint("y", -animationMovementStep);
      }
      if (keysPressed.current["s"]) {
        movePoint("y", animationMovementStep);
      }
      if (keysPressed.current["a"]) {
        movePoint("x", -animationMovementStep);
      }
      if (keysPressed.current["d"]) {
        movePoint("x", animationMovementStep);
      }
      animationFrameId.current = requestAnimationFrame(gameLoop);
    };
    animationFrameId.current = requestAnimationFrame(gameLoop);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [animationMovementStep]);

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col font-sans">
      {isCalibrating && (
        <CalibrationModal
          onCalibrate={handleCalibration}
          onCancel={() => setIsCalibrating(false)}
        />
      )}

      <header className="bg-white/80 backdrop-blur-lg shadow-sm flex-shrink-0 z-10 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center">
          {/* CORRECTED BACK LOGIC */}
          <button
            onClick={() => navigate("/experiment/profile-projector/procedure")}
            className="flex items-center gap-2 font-semibold text-slate-600 hover:text-blue-600"
          >
            &larr; Back to Procedure
          </button>
          <h1 className="text-xl font-bold text-slate-800">
            Virtual Profile Projector
          </h1>
          <nav className="flex items-center gap-6 text-sm font-semibold text-slate-500">
            <Link
              to="/experiment/profile-projector"
              className="hover:text-blue-600"
            >
              Introduction
            </Link>
            <Link
              to="/experiment/profile-projector/procedure"
              className="hover:text-blue-600"
            >
              Procedure
            </Link>
            <Link
              to="/lab/profile-projector"
              className="text-blue-600 border-b-2 border-blue-600 pb-1"
            >
              Virtual Lab
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 p-4 lg:p-6 gap-6">
        <div className="lg:col-span-2 h-full">
          <ProjectorScreen pointPosition={pointPosition} />
        </div>
        <div className="lg:col-span-1 h-full">
          <ControlPanel
            pointPosition={pointPosition}
            zeroOffset={zeroOffset}
            movePoint={movePoint}
            setRelativeZero={setRelativeZero}
            resetAbsoluteZero={resetAbsoluteZero}
            magnification={magnification}
            buttonMovementStep={buttonMovementStep}
            currentUnit={currentUnit}
            setCurrentUnit={setCurrentUnit}
            scaleFactor={scaleFactor}
            onRecalibrate={() => setIsCalibrating(true)}
          />
        </div>
      </main>
    </div>
  );
}

export default LabPage;
