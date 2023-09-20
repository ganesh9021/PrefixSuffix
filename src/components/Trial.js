import React, { useRef } from "react";
import gameSound from '../sound/gamesound.wav'

function Trial() {
  const canvasRef = useRef(null);

  const playAudio = () => {
    const audioElement = new Audio(gameSound);
    audioElement.play();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        style={{ border: "1px solid #d3d3d3" }}
        onClick={playAudio}
      >
        Your browser does not support the HTML5 canvas element.
      </canvas>
    </div>
  );
}

export default Trial;
