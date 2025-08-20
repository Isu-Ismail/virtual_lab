import React from "react";

function ProjectorScreen({ pointPosition }) {
  return (
    // A lighter, cleaner housing for the screen
    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center p-6 shadow-lg border border-slate-200">
      {/* Screen itself */}
      <div className="relative w-full aspect-square bg-yellow-100 rounded-full cursor-crosshair overflow-hidden shadow-inner border-4 border-slate-300">
        {/* The measurement point */}
        <div
          className="absolute w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-lg"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${pointPosition.x}px, ${pointPosition.y}px)`,
            transition: "transform 0.1s linear",
          }}
        />

        {/* Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-full h-px bg-black opacity-50"></div>
          <div className="absolute w-px h-full bg-black opacity-50"></div>
        </div>

        {/* Decorative Protractor Markings */}
        <div className="absolute inset-2 border-[24px] border-slate-400/20 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}

export default ProjectorScreen;
