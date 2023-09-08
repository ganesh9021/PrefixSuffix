import React, { useEffect, useState } from "react";
import img from "../Img/download.png";

function GameDemo() {
  const [state, setState] = useState({
    gravity: 0.0000005,
    speedX: 0,
    speedY: 0,
    x: 450,
    y: 0,
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is mounted

    const context = canvas.getContext("2d");

    const startGame = () => {
      interval = setInterval(updateGameArea, 20);
      updateGameArea();
    };

    const clear = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const updateGameArea = () => {
      clear();
      newPos();
      update();
      drawBubbles();
    };

    const update = () => {
      const { x, y, width, height } = state;
      const canvas = canvasRef.current;

      if (y + height > canvas.height) {
        setState((prevState) => ({
          ...prevState,
          y: 0,
        }));
      }

      context.fillStyle = "red";
      context.fillRect(x, y, width, height);
      context.font = "16px Arial";
      context.fillStyle = "black";
      context.fillText("Beauty", x + 40, y + 25);
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

          if (bubble.text == "ful") {
            const image = new Image();
            image.src = img; // Set the image source URL

            image.onload = () => {
              context.drawImage(image, 100, 100, 1000, 600);
              context.font = "16px Arial";
              context.fillStyle = "black";
              context.fillText("Beauty", 140, 125);
            };
          } else {
            const image = new Image();
            image.src = img; // Set the image source URL

            image.onload = () => {
              context.drawImage(image, 200, 200, 1000, 600);
              context.font = "16px Arial";
              context.fillStyle = "black";
              context.fillText("Beauty", 140, 125);
            };
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
      canvas.removeEventListener("click", handleBubbleClick);
      canvas.removeEventListener("mousemove", handleBubbleHover);
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
