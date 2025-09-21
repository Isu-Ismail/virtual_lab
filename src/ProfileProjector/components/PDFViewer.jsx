import React from "react";

function PDFViewer({ fileUrl }) {
  return (
    <div className="w-full h-full bg-slate-200 rounded-lg shadow-inner overflow-hidden">
      <iframe
        src={fileUrl}
        title="PDF Viewer"
        className="w-full h-full border-none"
        style={{ height: "110vh", color: "-moz-initial" }} // Give it a fixed, tall height
      >
        <p>
          Your browser does not support PDFs. Please download the PDF to view
          it.
        </p>
      </iframe>
    </div>
  );
}

export default PDFViewer;
