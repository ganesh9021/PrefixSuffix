import React, { useEffect, useState, useRef } from "react";
import img from "../Img/download.png";
import wordList from "../word.json";

function GameDemo() {
  const getRandomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)].root;
  };

  let canvasRef = useRef(null);

  let [word, setWord] = useState(getRandomWord());
  let [isPaused, setIsPaused] = useState(false);
  let [result, setResult] = useState(false);
  let [imagePosition, setImagePosition] = useState({ x: 450, y: 500 });
  let requestId;

  const [state, setState] = useState({
    gravity: 1,
    speedX: 0,
    speedY: 0,
    x: 450,
    y: 0,
    width: 100,
    height: 50,
  });
  const [bubbles, setBubbles] = useState([
    { x: 50, y: 50, radius: 30, text: "anti", isHovered: false },
    { x: 50, y: 150, radius: 30, text: "aulti", isHovered: false },
    { x: 50, y: 250, radius: 30, text: "un", isHovered: false },
    { x: 50, y: 350, radius: 30, text: "pre", isHovered: false },
    { x: 50, y: 450, radius: 30, text: "sub", isHovered: false },
    { x: 50, y: 550, radius: 30, text: "post", isHovered: false },

    { x: 950, y: 50, radius: 30, text: "ed", isHovered: false },
    { x: 950, y: 150, radius: 30, text: "ing", isHovered: false },
    { x: 950, y: 250, radius: 30, text: "ly", isHovered: false },
    { x: 950, y: 350, radius: 30, text: "ness", isHovered: false },
    { x: 950, y: 450, radius: 30, text: "ship", isHovered: false },
    { x: 950, y: 550, radius: 30, text: "ful", isHovered: false },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const gameLoop = () => {
      clear();
      newPos();
      update();
      drawBubbles();
      requestId = requestAnimationFrame(gameLoop); // Request the next frame
    };

    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const newPos = () => {
      const { gravity, speedX, speedY } = state;
      setState((prevState) => ({
        ...prevState,
        speedY: prevState.speedY + gravity,
        x: prevState.x + speedX,
        y: prevState.y + speedY,
      }));
    };

    const update = () => {
      const canvas = canvasRef.current;

      const { x: imageX, y: imageY } = imagePosition;
      const { x, y, width, height } = state;

      const cubeSpeed = 1.0; // Adjust the speed as needed
      const imageSpeed = 1.0; // Adjust the speed as needed

      // Calculate the new positions
      let newY = y + cubeSpeed; // Move the cube downwards

      if (newY > canvas.height) {
        newY = 0; // Reset the cube's position to the top
        setWord(getRandomWord());
      }

      // Calculate new image position
      if (!isPaused) {
        let newImageY = imageY - imageSpeed; // Move the image upwards
        if (newImageY < canvas.height / 2) {
          newImageY = canvas.height / 2; // Stop the image at the middle
          setTimeout(() => {}, 2000);
        }
        setImagePosition({ x: imageX, y: newImageY });
      }

      setState((prevState) => ({
        ...prevState,
        y: newY,
      }));

      clear();

      context.fillStyle = "red";
      context.fillRect(x, newY, width, height);
      context.font = "16px Arial";
      context.fillStyle = "black";
      context.fillText(word, x + 40, newY + 25);

      const image = new Image();
      image.src = img;
      context.drawImage(image, imageX, imageY, 200, 200);
      context.font = "16px Arial";
      context.fillStyle = "black";
      result
        ? context.fillText("correct!", imageX + 100, imageY + 60)
        : context.fillText("InCorrect!", imageX + 100, imageY + 60);
    };

    const drawBubbles = () => {
      bubbles.forEach((bubble) => {
        context.beginPath();
        context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);

        if (bubble.isHovered) {
          context.fillStyle = "orange"; // Change the fill color when hovered
          context.arc(bubble.x, bubble.y, bubble.radius * 1.5, 0, Math.PI * 2);
        } else {
          context.fillStyle = "blue";
        }

        context.fill();
        context.closePath();

        context.font = "16px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(bubble.text, bubble.x, bubble.y);
      });
    };

    const handleBubbleClick = (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Check if the click is inside any of the bubbles
      bubbles.forEach((bubble) => {
        const dx = mouseX - bubble.x;
        const dy = mouseY - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= bubble.radius) {
          // Bubble clicked
          console.log("Bubble clicked:", bubble.text);

          let wordFormed;
          let word_arr = [];
          let prefix_arr = [];
          let suffix_arr = [];

          wordList.forEach((element) => {
            word_arr.push(element.word);
            prefix_arr.push(element.prefix);
            suffix_arr.push(element.suffix);
          });

          prefix_arr.includes(bubble.text)
            ? (wordFormed = bubble.text + word)
            : (wordFormed = word + bubble.text);

          // Handle the click action here
          if (word_arr.includes(wordFormed)) {
            setResult(true);
            setImagePosition({ x: 450, y: 500 });
          } else {
            setResult(false);
            setImagePosition({ x: 450, y: 500 });
          }
        }
      });
    };

    const handleBubbleHover = (event) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Check if the mouse is over any of the bubbles
      const updatedBubbles = bubbles.map((bubble) => {
        const dx = mouseX - bubble.x;

        const dy = mouseY - bubble.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= bubble.radius) {
          return { ...bubble, isHovered: true };
        } else {
          return { ...bubble, isHovered: false };
        }
      });

      setBubbles(updatedBubbles);
    };

    canvas.addEventListener("click", handleBubbleClick);
    canvas.addEventListener("mousemove", handleBubbleHover);

    requestAnimationFrame(gameLoop);

    return () => {
      canvas.removeEventListener("click", handleBubbleClick);
      canvas.removeEventListener("mousemove", handleBubbleHover);
      if (requestId) {
        cancelAnimationFrame(requestId); // This will stop the animation loop
      }
    };
  }, [state, word]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        className="canvas-background"
        width={1000}
        height={600}
        style={{ border: "1px solid #d3d3d3", backgroundColor: "transparent" }}
      />
    </div>
  );
}

export default GameDemo;
