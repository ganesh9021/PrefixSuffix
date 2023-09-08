import React, { useState, useEffect } from "react";
import "../App.css"; // Import your CSS file for styles

const WordReel = () => {
  const wordList = [
    "Un",
    "Dis",
    "Re",
    "Pre",
    "Mis",
    "Im",
    "In",
    "Over",
    "Under",
    "Sub",
    "Inter",
    "Intra",
    "Multi",
    "Anti",
    "Auto",
    "Bi",
    "Co",
    "Ex",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === wordList.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Adjust the interval duration (in milliseconds) as needed

    return () => clearInterval(interval);
  }, [wordList]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100%" }}
    >
      <div className="word-reel-container">
        <div className="rectangularbox">
        <div className="word-reel" >
          {wordList.map((word, index) => (
            <div
              className={`word ${index === currentIndex ? "active" : ""}`}
              key={index}
            >
              {word}
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default WordReel;
