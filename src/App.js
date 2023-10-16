import React from "react";
import Homepage from "./component/Homepage";
import TheoryPage from "./component/TheoryPage";
import MathsQuiz from "./quiz/MathsQuiz";
import { Route, Routes } from "react-router-dom";
import Level_1 from "./component/Level_1";
import Level_2 from "./component/Level_2";
import Level_3 from "./component/Level_3";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/letusverify" element={<Homepage />} />
      <Route exact path="/theory" element={<TheoryPage />} />
      <Route exact path="/quiz" element={<MathsQuiz />} />
      {/* <Route exact path="/launchpage/englishactivity" element={<MainPage />} /> */}
      <Route exact path="/launchpage/englishactivity" element={<Level_1 />} />
      <Route path="/level2" element={<Level_2 />} />
      <Route path="/level3" element={<Level_3 />} />
    </Routes>
  );
}

export default App;
