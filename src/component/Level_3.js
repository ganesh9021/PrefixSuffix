import { OlabsPage } from "english-olabsnxtg-library";
import React from "react";
import QuizPopupContent from "./QuizPopupContent";
import Level3MidContent from "./Level3MidContent";

const Level_3 = () => {
  return (
    <>
      <OlabsPage
        H_title="Prefix-Suffix"
        HQ_yes="YES"
        HQ_cancel="CANCEL"
        HQ_quittext="Are you sure you want to quit?"
        M_midheight="90%"
        RSM_theory_tt="Theory"
        RSM_vivavoce_tt="Viva voce"
        RSM_ok="OK"
        M_midcontent_comp={<Level3MidContent />}
        RSM_Intruc_popup_title_string="Instructions for quiz"
        RSM_QuizPopupContent_comp={<QuizPopupContent />}
      />
    </>
  );
};

export default Level_3;
