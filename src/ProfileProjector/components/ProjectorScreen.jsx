import React from "react";

function ProjectorScreen({ pointPosition, selectedSample, magnification }) {
  return (
    <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center p-6 shadow-lg border border-slate-200 projector-screen">
      <div className="relative w-full aspect-square bg-yellow-300 rounded-full cursor-crosshair overflow-hidden shadow-inner border-4 border-slate-300">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${pointPosition.x}px, ${pointPosition.y}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          {selectedSample ? (
            <img
              src={selectedSample}
              alt="Selected Sample"
              className="w-48 h-48 object-contain filter brightness-0 transition-transform duration-300"
              style={{ transform: `scale(${magnification / 10})` }}
            />
          ) : (
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-lg" />
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-full h-px bg-black opacity-50"></div>
          <div className="absolute w-px h-full bg-black opacity-50"></div>
        </div>
        <div className="absolute inset-2 border-[24px] border-slate-400/20 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
}

export default ProjectorScreen;
