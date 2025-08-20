import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ExperimentPage from "./pages/ExperimentPage";
import LabPage from "./pages/LabPage";
import "./App.css"; // Keep this for App-specific styles if needed

function App() {
  return (
    <Router>
      {/* You can add a Header component here later */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/experiment/profile-projector"
          element={<ExperimentPage />}
        />
        <Route path="/lab/profile-projector" element={<LabPage />} />
      </Routes>
      {/* You can add a Footer component here later */}
    </Router>
  );
}

export default App;
