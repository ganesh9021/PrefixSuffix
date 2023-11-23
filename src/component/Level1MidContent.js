import React, { useEffect, useState, useRef, Fragment } from "react";
import RightFBImage from "../img/RightFBImage.png";
import WrongFBImage from "../img/WrongFBImage.png";
import wordList from "../word.json";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import correctanswer from "../sound/correctanswer.wav";
import wronganswer from "../sound/wronganswer.wav";
import gameover from "../sound/gameover.wav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/style.css";
import GoldCoinsEarned from "./GoldCoinsEarned";
import backgroundImg from "../img/Prefix.jpg";
import BalloonImg from "../img/BallonWord.png";
import Gameinstrudialog from "./Gameinstrudialog";
import coin from "../img/o.png";

const Level1MidContent = () => {
  let navigate = useNavigate();
  let canvasRef = useRef(null);
  //cube and image speed
  let [cubeSpeed, setCubeSpeed] = useState(1.0);
  let [imageSpeed, setImageSpeed] = useState(4.0);
  //making bubbles disable after one click
  const [clickDisabled, setClickDisabled] = useState(false);
  //setting random word on cube
  let [word, setWord] = useState("known");
  //checking whether cube is paused or nor
  let [isPaused, setIsPaused] = useState(false);
  //checking result is correct or incorrect
  let [result, setResult] = useState(false);
  //array of random words(10)
  let [randomWordArray, setRandomWordArray] = useState(["known"]);
  //score out of 10
  let [score, setScore] = useState(0);
  //react confetti activation or deactivation
  let [congratulationsMessage, setcongratulationsMessage] = useState(false);
  //checking whether user click on bubble or not during a cycle.
  const [clickedDuringCycle, setClickedDuringCycle] = useState(false);
  //random number
  let [randomNumber, setRandomNumber] = useState(0);
  //coin message
  let [coinMessage, setCoinMessage] = useState(false);
  //prefix array
  const [prefixArray, setPrefixArray] = useState([
    "Un",
    "Dis",
    "Re",
    "Pre",
    "Sub",
    "Co",
  ]);
  //help popup open-close
  var [open, setOpen] = useState(true);
  //Image is far away from canvas bcuz i wanted to show it only on click.
  let [imagePosition, setImagePosition] = useState({
    x: 400,
    y: 20000,
  });
  let requestId;

  const [state, setState] = useState({
    gravity: 1,
    speedX: 0,
    speedY: 0,
    x: 560,
    y: 0,
    width: 300,
    height: 150,
  });

  shuffleWords(prefixArray);
  const [bubbles, setBubbles] = useState([
    {
      x: 50,
      y: 100,
      height: 50,
      width: 100,
      radius: 20,
      text: prefixArray[0],
      isHovered: false,
    },
    {
      x: 50,
      y: 260,
      height: 50,
      width: 100,
      radius: 20,
      text: prefixArray[1],
      isHovered: false,
    },
    {
      x: 50,
      y: 420,
      height: 50,
      width: 100,
      radius: 20,
      text: prefixArray[2],
      isHovered: false,
    },
    {
      x: 1000,
      y: 100,
      height: 50,
      width: 100,
      radius: 20,
      text: prefixArray[3],
      isHovered: false,
    },
    {
      x: 1000,
      y: 260,
      height: 50,
      width: 100,
      radius: 20,
      text: prefixArray[4],
      isHovered: false,
    },
    {
      x: 1000,
      y: 420,
      height: 50,
      width: 100,
      radius: 20,
      text: prefixArray[5],
      isHovered: false,
    },
  ]);

  useEffect(() => {
    if (open) return;

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

      if (!canvas) {
        return; // Return early if canvasRef is null or undefined
      }

      const { x: imageX, y: imageY } = imagePosition;
      const { x, y, width, height } = state;

      // Calculate the new positions
      let newY = y + cubeSpeed; // Move the cube downwards

      // Calculate new image position
      if (!isPaused) {
        let newImageY = imageY - imageSpeed; // Move the image upwards
        if (newImageY < canvas.height / 2) {
          newImageY = canvas.height / 2; // Stop the image at the middle
          setTimeout(() => {
            setImagePosition({ x: 400, y: 20000 });
          }, 3000);
        }
        setImagePosition({ x: imageX, y: newImageY });
      }

      setState((prevState) => ({
        ...prevState,
        y: newY,
      }));

      clear();

      // Wait for the image to load (you can use an event listener)
      var wordImage = new Image();
      wordImage.src = BalloonImg;
      context.drawImage(wordImage, x - 105, newY, width, height);
      context.font = "16px Arial";
      context.fillStyle = "black";
      context.fillText(word, x + 50, newY + 110);

      // Create a rounded rectangle with fillet radius
      var xpos = canvas.width / 2 - 100;
      var ypos = canvas.height / 2 - 280;
      var widthofscorebox = 200;
      var heightofscorebox = 50;
      var radius = 20; // Adjust the radius as needed
      context.fillStyle = "white";
      context.beginPath();
      context.moveTo(xpos + radius, ypos);
      context.lineTo(xpos + widthofscorebox - radius, ypos);
      context.lineTo(xpos + widthofscorebox, ypos);
      context.arcTo(
        xpos + widthofscorebox,
        ypos + heightofscorebox,
        xpos + widthofscorebox - radius,
        ypos + heightofscorebox,
        radius
      );
      context.lineTo(xpos + radius, ypos + heightofscorebox);
      context.arcTo(
        xpos,
        ypos + heightofscorebox,
        xpos,
        ypos + heightofscorebox - radius,
        radius
      );
      context.lineTo(xpos, ypos);
      context.fill();
      context.closePath();

      // Creating a rounded rectangle for score
      var xpos_r = canvas.width / 2 - 550;
      var ypos_r = canvas.height / 2 - 280;
      var widthofscorebox_r = 200;
      var heightofscorebox_r = 50;
      var radius_r = 20; // Adjust the radius as needed
      context.fillStyle = "#4893FF";
      context.beginPath();
      context.moveTo(xpos_r + radius_r, ypos_r);
      context.lineTo(xpos_r + widthofscorebox_r - radius_r, ypos_r);
      context.arcTo(
        xpos_r + widthofscorebox_r,
        ypos_r,
        xpos_r + widthofscorebox_r,
        ypos_r + radius_r,
        radius_r
      );
      context.lineTo(
        xpos_r + widthofscorebox_r,
        ypos_r + heightofscorebox_r - radius_r
      );
      context.arcTo(
        xpos_r + widthofscorebox_r,
        ypos_r + heightofscorebox_r,
        xpos_r + widthofscorebox_r - radius_r,
        ypos_r + heightofscorebox_r,
        radius_r
      );
      context.lineTo(xpos_r + radius_r, ypos_r + heightofscorebox_r);
      context.arcTo(
        xpos_r,
        ypos_r + heightofscorebox_r,
        xpos_r,
        ypos_r + heightofscorebox_r - radius_r,
        radius_r
      );
      context.lineTo(xpos_r, ypos_r + radius_r);
      context.arcTo(xpos_r, ypos_r, xpos_r + radius_r, ypos_r, radius_r);
      context.fill();
      context.closePath();

      //code of score
      context.font = "24px Arial";
      context.fillStyle = "white";
      context.fillText(`Score: ${score}/10`, xpos - 350, ypos + 25);

      //code of Main heading
      context.font = "24px Arial";
      context.fillStyle = "#FF4F18";
      context.fillText("Level-1 Prefix", xpos + 100, ypos + 25);

      //code of CoinImage
      var coinImage = new Image();
      coinImage.src = coin;
      context.drawImage(coinImage, xpos - 230, ypos, 50, 50);

      //code of moving result image
      let image = new Image();
      image.src = result ? RightFBImage : WrongFBImage;
      context.drawImage(image, imageX, imageY, 400, 290);
      context.font = "14px Arial";
      context.strokeStyle = "black";

      if (newY > canvas.height) {
        newY = -200; // Reset the cube's position to the top
        setClickDisabled(false);
        setcongratulationsMessage(false);
        getRandomWord();
        setClickedDuringCycle(false);

        if (!clickedDuringCycle) {
          // Show a message when the user didn't click on any bubble this cycle
          toast.warning("You miss the previous word!", {
            position: "top-center",
            autoClose: 1000,
            theme: "dark",
          });
        }

        if (newY == -200) {
          setImagePosition((prevState) => ({ ...prevState, x: 400, y: 20000 }));
        }
      }

      if (result) {
        context.font = "18px Arial";
        context.fillStyle = "green";
        context.fillText("Correct!", imageX + 200, imageY + 160);
        context.font = "14px Arial";
        context.fillStyle = "black";
        const originalFont = context.font;
        // Set a bolder font
        context.font = "bold " + originalFont;
        // Draw the first text with the bolder font
        context.fillText(
          `${wordList.level1[randomNumber].root} : ${wordList.level1[randomNumber].rootmeaning}`,
          imageX + 200,
          imageY + 180
        );
        // Draw the second text with the original font
        context.fillText(
          `${word} : ${wordList.level1[randomNumber].Prefixrootmeaning}`,
          imageX + 200,
          imageY + 200
        );
        // Restore the original font setting
        context.font = originalFont;
      } else {
        context.font = "18px Arial";
        context.fillStyle = "red";
        context.fillText("Incorrect!", imageX + 200, imageY + 160);
        context.font = "14px Arial";
        context.fillStyle = "black";
        context.fillText(word, imageX + 200, imageY + 180);
        context.fillText(
          "Meaningful word not formed.",
          imageX + 200,
          imageY + 200
        );
      }
    };

    const drawBubbles = () => {
      bubbles.forEach((bubble) => {
        const { x, y, width, height, radius } = bubble;
        context.beginPath();
        // context.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.arcTo(x + width, y, x + width, y + radius, radius);
        context.lineTo(x + width, y + height - radius);
        context.arcTo(
          x + width,
          y + height,
          x + width - radius,
          y + height,
          radius
        );
        context.lineTo(x + radius, y + height);
        context.arcTo(x, y + height, x, y + height - radius, radius);
        context.lineTo(x, y + radius);
        context.arcTo(x, y, x + radius, y, radius);

        if (bubble.isHovered) {
          context.fillStyle = "#FFC400"; // Change the fill color when hovered
        } else {
          context.fillStyle = "#FFA200";
        }

        context.fill();
        context.closePath();
        context.strokeStyle = "white"; // Border color
        context.lineWidth = 3; // Border width
        context.stroke();

        context.font = "16px Arial";
        context.fillStyle = "#000000";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(bubble.text, bubble.x + 50, bubble.y + 25);
      });
    };

    const handleBubbleClick = (event) => {
      setClickedDuringCycle(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (clickDisabled) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      // Check if the click is inside any of the bubbles
      bubbles.forEach((bubble) => {
        const isInsideX =
          mouseX >= bubble.x && mouseX <= bubble.x + bubble.width;
        const isInsideY =
          mouseY >= bubble.y && mouseY <= bubble.y + bubble.height;

        const dx = isInsideX
          ? 0
          : Math.min(
              Math.abs(bubble.x - mouseX),
              Math.abs(mouseX - (bubble.x + bubble.width))
            );
        const dy = isInsideY
          ? 0
          : Math.min(
              Math.abs(bubble.y - mouseY),
              Math.abs(mouseY - (bubble.y + bubble.height))
            );
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= bubble.radius) {
          // Bubble clicked
          //console.log("Bubble clicked:", bubble.text);

          let wordFormed = "";
          let word_arr = [];
          let prefix_arr = [];

          wordList.level1.forEach((element) => {
            word_arr.push(element.word);
            prefix_arr.push(element.prefix);
          });

          wordFormed = bubble.text + word;

          // Handle the click action here
          if (word_arr.includes(wordFormed)) {
            setImagePosition({ x: 400, y: 600 });
            setcongratulationsMessage(true);
            playAudio(correctanswer);
            setWord(wordFormed);
            setResult(true);
            setClickDisabled(true);
            let newScore = score + 1;
            setScore(newScore);
            setImagePosition({ x: 400, y: 600 });
          } else {
            setImagePosition({ x: 400, y: 600 });
            playAudio(wronganswer);
            setWord(wordFormed);
            setResult(false);
            setClickDisabled(true);
            setImagePosition({ x: 400, y: 600 });
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

      // Check if the mouse is over any of the rounded rectangles
      const updatedBubbles = bubbles.map((rect) => {
        const isInsideX = mouseX >= rect.x && mouseX <= rect.x + rect.width;
        const isInsideY = mouseY >= rect.y && mouseY <= rect.y + rect.height;

        // Calculate the distance to the rounded corners
        const dx = isInsideX
          ? 0
          : Math.min(
              Math.abs(rect.x - mouseX),
              Math.abs(mouseX - (rect.x + rect.width))
            );
        const dy = isInsideY
          ? 0
          : Math.min(
              Math.abs(rect.y - mouseY),
              Math.abs(mouseY - (rect.y + rect.height))
            );

        // Calculate the distance to the rounded corners using Pythagoras' theorem
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= rect.radius) {
          return { ...rect, isHovered: true };
        } else {
          return { ...rect, isHovered: false };
        }
      });

      setBubbles(updatedBubbles);
    };

    const getRandomWord = () => {
      let randomIndex = Math.floor(Math.random() * wordList.level1.length);
      let randomWord = wordList.level1[randomIndex].root;
      //console.log(randomWordArray);
      if (randomWordArray.length !== 10) {
        if (randomWordArray.includes(randomWord)) {
          getRandomWord();
        } else {
          setWord(randomWord);
          setRandomNumber(randomIndex);
          setRandomWordArray((prevState) => [...prevState, randomWord]);
        }
      } else {
        setState({});
        playAudio(gameover);
        if (score < 6) {
          Swal.fire({
            title: "Need to improve!",
            text: `Your score is ${score}`,
            icon: "warning",
            confirmButtonText: "Try again",
          }).then((result) => {
            window.location.reload();
            if (result.isConfirmed) {
              navigate("/level1");
            }
          });
        } else {
          setCoinMessage(true);
          playAudio(gameover);
          Swal.fire({
            title: "Good job!",
            text: `Your score is ${score}`,
            icon: "success",
            confirmButtonText: "Proceed to Level-2",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/level2");
            }
          });
        }
      }
    };

    const playAudio = (soundsorce) => {
      try {
        if (!soundsorce) {
          throw new Error("No audio source provided.");
        }

        const audioElement = new Audio(soundsorce);
        audioElement.currentTime = 0;
        setTimeout(() => {
          audioElement.play();
        }, 1000);
      } catch (error) {
        // Handle the error gracefully, e.g., log it or display a message to the user.
        console.error("Audio playback error:", error.message);
      }
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
  }, [state, word, open]);

  function shuffleWords(wordArray) {
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
  }

  function handleClose() {
    setOpen(false);
  }

  function HandleHelp() {
    setOpen(true);
  }

  function handleExit() {
    navigate("/");
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center canvas-background"
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: "url(" + backgroundImg + ")",
        borderRadius: "20px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <canvas
        ref={canvasRef}
        width={1160}
        height={560}
        style={{
          border: "2px solid #000",
          backgroundColor: "transparent",
          backgroundImage: "url(" + backgroundImg + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      <button
        className="exit-button"
        style={{
          position: "absolute",
          top: "14%",
          left: "90%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={handleExit}
      >
        Exit
      </button>

      <button
        className="stylish-button"
        style={{
          position: "absolute",
          top: "14%",
          left: "75%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={HandleHelp}
      >
        Help
      </button>

      {congratulationsMessage ? (
        <Fragment>
          <Confetti numberOfPieces={200} gravity={0.15} />
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}

      <div className="custom-toast-container">
        <ToastContainer />
      </div>

      {coinMessage && <GoldCoinsEarned />}

      <Gameinstrudialog
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Level1MidContent;
