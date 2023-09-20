import "bootstrap/dist/css/bootstrap.min.css";
import WordReel from "./components/WordReel";
import VerticalWordReel from "./components/VerticalWordReel";
import DragDrop from "./components/DragDrop";
import GameDemo from "./components/GameDemo";
import Trial from "./components/Trial";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<GameDemo />} />
        <Route path="/trial" element={<Trial />} />
      </Routes>
    </Router>
  );
}

export default App;
