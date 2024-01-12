import React from "react";
import balloon from "../img/ProcedureImages/balloon.png";
import prefix from "../img/ProcedureImages/prefix.png";
import suffix from "../img/ProcedureImages/suffix.png";
import prefixsuffix from "../img/ProcedureImages/prefixsuffix.png";
import correctfb from "../img/ProcedureImages/correctFB.png";
import incorrectfb from "../img/ProcedureImages/incorrectFB.png";

const ProcedureMidContent = () => {
  return (
    <div
      className="scrollbar-primary p-3"
      style={{ overflow: "auto", width: "100%" }}
    >
      <div className="fw-bolder">Procedure:</div>
      <ol>
        <li>Click on the "START" button to initiate the game.</li>
        <li>There are three levels in the activity.</li>
        <ol type="a">
          <li>Level - 1 Prefix</li>
          <li>Level - 2 Suffix</li>
          <li>Level - 3 Prefix and suffix</li>
        </ol>
        <li>The word is written on the hot air balloon as shown in Fig 1.</li>
        <div className="text-center m-2">
          <div>
            <img
              className="img-fluid"
              src={balloon}
              alt="Image not available"
            />
          </div>
          <div>Fig 1. Word written on balloon</div>
        </div>
        <li>
          In level-1, Prefixes are given in boxes on the left and right side as
          shown in Fig 2.
        </li>
        <div className="text-center m-2">
          <div>
            <img
              className="img-fluid"
              src={prefix}
              alt="Image not available"
            />
          </div>
          <div>Fig 2. Prefix</div>
        </div>
        <li>
          In level-2, suffixes are given in boxes on the left and right side as
          shown in Fig 3.
        </li>
        <div className="text-center m-2">
          <div>
            <img
              className="img-fluid"
              src={suffix}
              alt="Image not available"
            />
          </div>
          <div>Fig 3. Suffix</div>
        </div>
        <li>
          In level-3, Prefixes are given in boxes on the left side and suffixes
          are given to the right side as shown in Fig 4.
        </li>
        <div className="text-center m-2">
          <div>
            <img
              className="img-fluid"
              src={prefixsuffix}
              alt="Image not available"
            />
          </div>
          <div>Fig 4. Prefix and Suffix</div>
        </div>
        <li>There are 10 words in each level.</li>
        <li>
          You can only select the prefix or suffix till the word is going out of
          the screen.
        </li>
        <li>
          If the answer is correct then the meaning of the root word and new
          formed word is provided. See Fig 5 for reference.{" "}
        </li>
        <div className="text-center m-2">
          <div>
            <img
              className="img-fluid"
              src={correctfb}
              alt="Image not available"
            />
          </div>
          <div>Fig 5. Correct feedback</div>
        </div>
        <li>Incorrect feedback is also given as shown in Fig 6.</li>
        <div className="text-center m-2">
          <div>
            <img
              className="img-fluid"
              src={incorrectfb}
              alt="Image not available"
            />
          </div>
          <div>Fig 6. Incorrect feedback</div>
        </div>
        <li>If the answer is correct, you will earn +1 score.</li>
        <li>
          The score is shown on the upper left side of the game as shown in Fig
          1.
        </li>
        <li>
          If your score is less than 6 then you need to reattempt the level else
          you can go to the next level.
        </li>
        <li>
          You can exit the game at any time by clicking on the "Exit" button.
        </li>
        <li>
          Click on the “HELP” button to read the instructions in the middle of
          the game.
        </li>
        <li>
          After completing 1st level then only can proceed to the next level and
          so on.
        </li>
      </ol>
    </div>
  );
};

export default ProcedureMidContent;
