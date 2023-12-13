import React, { useEffect, useState } from "react";
import Homepage from "./component/Homepage";
import TheoryPage from "./component/TheoryPage";
import MathsQuiz from "./quiz/MathsQuiz";
import { Route, Routes } from "react-router-dom";
import Level_1 from "./component/Level_1";
import Level_2 from "./component/Level_2";
import Level_3 from "./component/Level_3";
import useWebSocket from "react-use-websocket";
import logconfig from "./config/dbconfig";
import { v4 as uuid } from "uuid";
import axios from "axios";
import ReactGA from "react-ga4";
import Procedure from "./component/Procedure";

function App() {
  const [ip, setIP] = useState("");
  const sid = uuid();

  useEffect(() => {
    localStorage.setItem("sessionid", sid);
  }, []);

  useEffect(() => {
    // to call get data function which return ip address
    getData();
  }, [ip]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    //console.log(res.data);
    setIP(res.data.ip);
    localStorage.setItem("clientip", ip);
  };

  const { sendJsonMessage, readyState } = useWebSocket(logconfig.logurl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onError: () => {
      console.log("WebSocket connection Error");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    ReactGA.initialize("G-ZLKNSX7SDM", {
      gaOptions: {
        gtag: true,
      },
    });
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/letusverify" element={<Homepage />} />
      <Route exact path="/theory" element={<TheoryPage />} />
      <Route exact path="/procedure" element={<Procedure />} />
      <Route exact path="/quiz" element={<MathsQuiz />} />
      <Route exact path="/launchpage/englishactivity" element={<Level_1 />} />
      <Route path="/level2" element={<Level_2 />} />
      <Route path="/level3" element={<Level_3 />} />
    </Routes>
  );
}

export default App;
