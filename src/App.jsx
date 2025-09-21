import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ExperimentPage from "./ProfileProjector/pages/ExperimentPage";
import ProcedurePage from "./ProfileProjector/pages/ProcedurePage"; // Import the new page
import LabPage from "./ProfileProjector/pages/LabPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/experiment/profile-projector"
          element={<ExperimentPage />}
        />
        {/* Add the new route below */}
        <Route
          path="/experiment/profile-projector/procedure"
          element={<ProcedurePage />}
        />
        <Route path="/lab/profile-projector" element={<LabPage />} />
      </Routes>
    </Router>
  );
}

export default App;
