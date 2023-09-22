
import React from "react";
import Quizcomp from "./Quizcomp";
import { Quiz } from "english-olabsnxtg-library";

const MathsQuiz = () => {
  return (
    <div>
      <Quiz
        H_title="Prefix-Suffix"
        H_sidebarvisible="hidden"
        HQ_quittext="Are you sure you want to quit?"
        HQ_yes="yes"
        HQ_cancel="cancel"
        quiz_component={<Quizcomp/>}
      />
    </div>
  );
};

export default MathsQuiz;
