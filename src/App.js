import React from "react";
import Homepage from "./component/Homepage";
import TheoryPage from "./component/TheoryPage";
import MathsQuiz from "./quiz/MathsQuiz";
import MainPage from "./component/MainPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />}></Route>
      <Route exact path="/letusverify" element={<Homepage />}></Route>
      <Route exact path="/theory" element={<TheoryPage />}></Route>
      <Route exact path="/quiz" element={<MathsQuiz />}></Route>
      <Route
        exact
        path="/launchpage/englishactivity"
        element={<MainPage />}
      ></Route>
    </Routes>
  );
}

export default App;
