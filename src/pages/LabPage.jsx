import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import ProjectorScreen from "../components/ProjectorScreen";
import CalibrationModal from "../components/CalibrationModal";
import TutorialStep from "../components/TutorialStep";
import Highlighter from "../components/Highlighter";

// Import sample images
import gearImage from "../assets/pp-images/gear.png";
import screwImage from "../assets/pp-images/screw.png";

// --- TUTORIAL DATA ---
const tutorials = {
  gearOD: [
    {
      title: "Step 1: Select the Gear",
      content:
        "First, select the 'Gear' sample from the library if it's not already on the screen.",
      target: ".sample-gear",
    },
    {
      title: "Step 2: Align Top Tooth",
      content:
        "Use the WASD keys to move the gear until the tip of any tooth just touches the horizontal crosshair.",
      target: ".projector-screen",
    },
    {
      title: "Step 3: Zero the Y-Axis",
      content:
        "Click the '0' button next to the Y-axis readout to set your starting measurement point.",
      target: ".dro-y-zero-button",
    },
    {
      title: "Step 4: Move to Bottom Tooth",
      content:
        "Now, move the gear straight down until the tip of the opposite tooth touches the horizontal crosshair.",
      target: ".projector-screen",
    },
    {
      title: "Step 5: Read the Measurement",
      content:
        "The value shown on the Y-axis is the Outer Diameter (OD) of the gear. Tutorial complete!",
      target: ".dro-panel",
    },
  ],
};

function LabPage() {
  const navigate = useNavigate();

  // --- CLEANED UP STATE MANAGEMENT ---
  const [pointPosition, setPointPosition] = useState({ x: 0, y: 0 });
  const [zeroOffset, setZeroOffset] = useState({ x: 0, y: 0 });
  const [magnification, setMagnification] = useState(10);
  const [selectedSample, setSelectedSample] = useState(null);
  const [isCalibrating, setIsCalibrating] = useState(true);
  const [correctionFactor, setCorrectionFactor] = useState(1); // Only one factor state
  const [currentUnit, setCurrentUnit] = useState("mm");
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [tutorialStep, setTutorialStep] = useState(0);

  // --- CONSTANTS & REFS ---
  const samples = [
    { name: "Screw", image: screwImage },
    { name: "Gear", image: gearImage },
  ];
  const CALIBRATION_PIXEL_WIDTH = 400;
  const virtualCalibrationLength = CALIBRATION_PIXEL_WIDTH / magnification;
  const MM_PER_FRAME = 0.05;
  const animationMovementStep = MM_PER_FRAME * magnification;
  const MM_PER_CLICK = 1.0;
  const buttonMovementStep = (MM_PER_CLICK * magnification) / correctionFactor;
  const keysPressed = useRef({});
  const animationFrameId = useRef();

  // --- CORE FUNCTIONS ---
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
  const handleCalibration = (userMeasuredLength) => {
    const newCorrectionFactor = userMeasuredLength / virtualCalibrationLength;
    setCorrectionFactor(newCorrectionFactor);
    setIsCalibrating(false);
  };

  // --- TUTORIAL FUNCTIONS ---
  const startTutorial = (tutorialId) => {
    setActiveTutorial(tutorialId);
    setTutorialStep(0);
  };
  const advanceTutorial = () => {
    if (activeTutorial && tutorialStep < tutorials[activeTutorial].length - 1) {
      setTutorialStep((prev) => prev + 1);
    } else {
      skipTutorial();
    }
  };
  const skipTutorial = () => {
    setActiveTutorial(null);
    setTutorialStep(0);
  };

  // Effect for keyboard game loop
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

  const currentStepData = activeTutorial
    ? tutorials[activeTutorial][tutorialStep]
    : null;

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col font-sans">
      {activeTutorial && (
        <>
          <Highlighter selector={currentStepData?.target} />
          <TutorialStep
            step={currentStepData}
            onNext={advanceTutorial}
            onSkip={skipTutorial}
          />
        </>
      )}
      {isCalibrating && (
        <CalibrationModal
          onCalibrate={handleCalibration}
          onCancel={() => setIsCalibrating(false)}
          virtualLength={virtualCalibrationLength}
        />
      )}
      <header className="bg-white/80 backdrop-blur-lg shadow-sm flex-shrink-0 z-10 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto p-4 flex justify-between items-center">
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
      {/* --- LAYOUT FIX: Added grid-rows-1 to ensure children can use h-full --- */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 p-4 lg:p-6 gap-6 grid-rows-1">
        <div className="lg:col-span-2 h-full">
          <ProjectorScreen
            pointPosition={pointPosition}
            selectedSample={selectedSample}
            magnification={magnification}
          />
        </div>
        <div className="lg:col-span-1 h-full">
          <ControlPanel
            pointPosition={pointPosition}
            zeroOffset={zeroOffset}
            movePoint={movePoint}
            setRelativeZero={setRelativeZero}
            resetAbsoluteZero={resetAbsoluteZero}
            magnification={magnification}
            setMagnification={setMagnification}
            buttonMovementStep={buttonMovementStep}
            currentUnit={currentUnit}
            setCurrentUnit={setCurrentUnit}
            correctionFactor={correctionFactor}
            onRecalibrate={() => setIsCalibrating(true)}
            samples={samples}
            onSampleSelect={setSelectedSample}
            onStartTutorial={startTutorial}
          />
        </div>
      </main>
    </div>
  );
}

export default LabPage;
