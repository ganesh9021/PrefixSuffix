import React, { useEffect, useState } from "react";
import wordList from "../word.json";

const Trial = () => {
  const [word, setWord] = useState("power");
  let [randomWordArray, setRandomWordArray] = useState(["power"]);

  const handleword = () => {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    let randomWord = wordList[randomIndex].root;
    if (randomWordArray.length !== 10) {
      if (randomWordArray.includes(randomWord)) {
        handleword();
      } else {
        setWord(randomWord);
        setRandomWordArray((prevState) => [...prevState, randomWord]);
      }
    } else {
      setRandomWordArray(() => ["power"]);
      alert("congratulations!!!");
    }

    console.log(randomWordArray);
  };

  return (
    <div>
      <button onClick={handleword}>Get random word</button>
      <br />
      {word}

      <div className="maintitle">START</div>

      <div className="subtitle">Objective</div>

      <div className="content">content</div>

      <div
        
        style={{
          fontSize: "calc(0.5rem + 1.5vw)",
          fontFamily: "montserrat",
          background: "#f29706",
          color: "white",
          borderRadius: "50px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          fontWeight: "bolder",
        }}
      >
        START
      </div>
    </div>
  );
};

export default Trial;
