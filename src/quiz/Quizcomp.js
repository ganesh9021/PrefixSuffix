import React from "react";
import { lazy } from "react";
import hindi from "../Questions.json";
import english from "../Questions.json";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

async function getLoad(setFlagPlay, setPlay) {
  try {
    const pathCompPlay = require.resolve("QuizOlabsNxtG");

    if (pathCompPlay != undefined) {
      const Play = lazy(() => import("QuizOlabsNxtG"));
      setFlagPlay(true);
      setPlay(Play);
      console.log("in true ...");
      console.log(Play);
    }
  } catch (e) {
    setFlagPlay(false);
    console.log("error", e); // You might send an exception to your error tracker like AppSignal
  }
}

const Quizcomp = () => {
  const [flagPlay, setFlagPlay] = useState(null);
  const [Play, setPlay] = useState();

  let { firstStore } = useSelector((globalState) => globalState);
  var langObj = { eng: english, hin: hindi };

  useEffect(() => {
    getLoad(setFlagPlay, setPlay);
  }, []);

  return (
    <>
      {flagPlay == null ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : flagPlay ? (
        <Play lang={firstStore.lang} questionJson={langObj} />
      ) : (
        <h4> Please install Quiz Moduele </h4>
      )}
    </>
  );
};

export default Quizcomp;
