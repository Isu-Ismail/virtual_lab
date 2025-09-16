import React, { useState, useRef } from "react";

function TutorialStep({ step, onNext, onSkip }) {
  // State for position and dragging
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Store the initial mouse position and the element's initial position
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      setPosition({
        x: initialPos.current.x + dx,
        y: initialPos.current.y + dy,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add global mouse listeners when dragging starts
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!step) return null;

  return (
    // UPDATED: Changed from `fixed` to `absolute` for initial positioning, then becomes fixed on drag
    <div
      className="fixed bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm border border-slate-200 z-50 animate-fade-in-up"
      style={{
        // UPDATED: Initial position top-right, then dynamic based on state
        top: "2rem",
        right: "2rem",
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* UPDATED: Added a draggable header */}
      <div
        className="cursor-move pb-4 mb-4 border-b border-slate-200"
        onMouseDown={handleMouseDown}
      >
        <h3 className="text-lg font-bold text-blue-600">{step.title}</h3>
      </div>

      <p className="text-slate-700 mb-4">{step.content}</p>

      <div className="flex justify-end gap-4">
        <button
          onClick={onSkip}
          className="text-sm font-semibold text-slate-500 hover:text-slate-800"
        >
          Skip Tutorial
        </button>
        <button
          onClick={onNext}
          className="text-sm font-semibold bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default TutorialStep;
