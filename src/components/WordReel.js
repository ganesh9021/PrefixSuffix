import React from "react";
import TextTransition, { presets } from "react-text-transition";

const WordReel = () => {
  const TEXTS = [
    "Forest",
    "Building",
    "Tree",
    "Color",
    "table",
    "chair",
    "bag",
    "umbrella",
    "monitor",
    "accessories",
  ];
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => (index + 1) % TEXTS.length), // Ensure index stays within bounds
      2000 // Change word every 2 seconds
    );
    return () => clearInterval(intervalId); // Use clearInterval to clear the interval
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-info"
      style={{ height: "100vh", width: "100%" }}
    >
      <span style={{ border: "1px solid green", padding: "2%" }}>
        <TextTransition springConfig={presets.wobbly} direction="down">
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </span>
    </div>
  );
};

export default WordReel;
