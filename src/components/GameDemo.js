import React, { useEffect, useState } from "react";
import img from "../Img/download.png";

function GameDemo() {
  let [result, setResult] = useState(false);
  const [isImageVisible, setImageVisibility] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 450, y: 500 });
  const [state, setState] = useState({
    gravity: 0.0000005,
    speedX: 0,
    speedY: 0,
    x: 450,
    y: -10,
    width: 100,
    height: 50,
  });

  const [bubbles, setBubbles] = useState([
    { x: 50, y: 50, radius: 30, text: "Anti", isHovered: false },
    { x: 50, y: 150, radius: 30, text: "Multi", isHovered: false },
    { x: 50, y: 250, radius: 30, text: "Un", isHovered: false },
    { x: 50, y: 350, radius: 30, text: "Pre", isHovered: false },
    { x: 50, y: 450, radius: 30, text: "Mis", isHovered: false },
    { x: 50, y: 550, radius: 30, text: "Under", isHovered: false },

    { x: 950, y: 50, radius: 30, text: "ed", isHovered: false },
    { x: 950, y: 150, radius: 30, text: "ing", isHovered: false },
    { x: 950, y: 250, radius: 30, text: "ly", isHovered: false },
    { x: 950, y: 350, radius: 30, text: "ness", isHovered: false },
    { x: 950, y: 450, radius: 30, text: "tion", isHovered: false },
    { x: 950, y: 550, radius: 30, text: "ful", isHovered: false },
  ]);

  const canvasRef = React.createRef();
  let interval;
  let pauseTimeout;
  let isPaused = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is mounted
    const context = canvas.getContext("2d");

    const startGame = () => {
      interval = setInterval(updateGameArea, 20);
      updateGameArea();
    };

    const updateGameArea = () => {
      clear();
      newPos();
      update();
      drawBubbles();
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
      const speed = 0.05; // Adjust the speed as needed

      // Calculate the new positions
      let newY = y + speed; // Move the cube downwards
      

      // Calculate new image position
      const imageSpeed = 0.1; // Adjust the speed as needed

      if (!isPaused) {
        let newImageY = imageY - imageSpeed; // Move the image upwards

        if (newImageY < canvas.height / 2) {
          newImageY = canvas.height / 2; // Stop the image at the middle
          // Pause the image for 2 seconds
          clearTimeout(pauseTimeout);
          setTimeout(() => {
            isPaused = false; // Resume image movement
            setImagePosition({ x: -200, y: -200 });
          }, 9000); // 9 seconds in milliseconds
        }

        setImagePosition({ x: imageX, y: newImageY });
      }

      setState((prevState) => ({
        ...prevState,
        y: newY,
      }));

      // Clear and redraw everything
      clear();

      context.fillStyle = "red";
      context.fillRect(x, newY, width, height);
      context.font = "16px Arial";
      context.fillStyle = "black";
      context.fillText("Beauty", x + 40, newY + 25);

      if (isImageVisible) {
        const image = new Image();
        image.src = img;
        context.drawImage(image, imageX, imageY, 200, 200);
        context.font = "16px Arial";
        context.fillStyle = "black";
        result
          ? context.fillText("correct!", imageX + 100, imageY + 60)
          : context.fillText("InCorrect!", imageX + 100, imageY + 60);
      }
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
          // Handle the click action here
          if (bubble.text === "ful") {
            setResult(true);
            setImageVisibility(true);
            setImagePosition({ x: 450, y: 500 });
          } else {
            setResult(false);
            setImageVisibility(true);
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
        <p>Gravity makes the red square fall to the ground and beyond.</p>;
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

    startGame();

    return () => {
      clearInterval(interval);
      clearTimeout(pauseTimeout);
    };
  }, [state, bubbles]);

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
