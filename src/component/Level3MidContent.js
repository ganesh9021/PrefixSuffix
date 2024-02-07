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
import backgroundImg from "../img/PrefixSuffix.jpg";
import BalloonImg from "../img/BallonWord.png";
import Gameinstrudialog from "./Gameinstrudialog";
import coin from "../img/200.png";
import useWebSocket, { ReadyState } from "react-use-websocket";
import logconfig from "../config/dbconfig";
import { SendLogData } from "../config/wslog.js";
import ReactGA from "react-ga4";

const Level3MidContent = () => {
  const { sendJsonMessage } = useWebSocket(logconfig.logurl, { share: true });
  const pageName = "Level-3";
  let requestId;
  let navigate = useNavigate();
  let canvasRef = useRef(null);
  //cube and image speed
  let cubeSpeed = 1.0;
  let imageSpeed = 4.0;
  //making bubbles disable after one click
  const [clickDisabled, setClickDisabled] = useState(false);
  //setting random word on cube
  let [word, setWord] = useState("biotic");
  //checking whether cube is paused or nor
  let [isPaused, setIsPaused] = useState(false);
  //checking result is correct or incorrect
  let [result, setResult] = useState(false);
  //array of random words(10)
  let [randomWordArray, setRandomWordArray] = useState(["biotic"]);
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
  //help popup open-close
  var [open, setOpen] = useState(false);
  //prefix array
  const prefixArray = ["Anti", "Over", "Under", "Multi", "Auto", "Post"];
  //suffix array
  const suffixArray = ["ment", "less", "able", "ness", "ship", "hood"];
  shuffleWords(prefixArray);
  shuffleWords(suffixArray);
  const [canvasDimensions, setCanvasDimensions] = React.useState({
    width: 1160,
    height: 560,
  });
  //Image is far away from canvas bcuz i wanted to show it only on click.
  let [imagePosition, setImagePosition] = useState({
    x: 400,
    y: 20000,
  });
  const [bubbles, setBubbles] = useState([]);
  const [state, setState] = useState({
    gravity: 1,
    speedX: 0,
    speedY: 0,
    x: canvasDimensions.width / 2,
    y: 0,
    width: 300,
    height: 150,
  });

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const calculateBubblePositions = (prefixArray, suffixArray) => {
      const prefixBubbles = prefixArray.map((prefix, index) => {
        const x = canvasDimensions.width * 0.02;

        const y =
          index == 0
            ? canvasDimensions.height * 0.1
            : index == 1
            ? canvasDimensions.height * 0.25
            : index == 2
            ? canvasDimensions.height * 0.4
            : index == 3
            ? canvasDimensions.height * 0.55
            : index == 4
            ? canvasDimensions.height * 0.7
            : canvasDimensions.height * 0.85;

        return {
          x,
          y,
          height: 50,
          width: 100,
          radius: 20,
          text: prefix,
          isHovered: false,
        };
      });

      const suffixBubbles = suffixArray.map((suffix, index) => {
        const x = canvasDimensions.width * 0.85;

        const y =
          index == 0
            ? canvasDimensions.height * 0.1
            : index == 1
            ? canvasDimensions.height * 0.25
            : index == 2
            ? canvasDimensions.height * 0.4
            : index == 3
            ? canvasDimensions.height * 0.55
            : index == 4
            ? canvasDimensions.height * 0.7
            : canvasDimensions.height * 0.85;

        return {
          x,
          y,
          height: 50,
          width: 100,
          radius: 20,
          text: suffix,
          isHovered: false,
        };
      });
      setBubbles([...prefixBubbles, ...suffixBubbles]);
    };
    calculateBubblePositions(prefixArray, suffixArray);
  }, [canvasDimensions]);

  useEffect(() => {
    if (open) return;
    if (isPaused) return;

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
      const { y, width, height } = state;

      // Calculate the new positions
      let newY = y + cubeSpeed; // Move the cube downwards

      // Calculate new image position
      if (!isPaused) {
        let newImageY = imageY - imageSpeed; // Move the image upwards
        if (newImageY < canvasDimensions.height / 2 - 70) {
          newImageY = canvasDimensions.height / 2 - 70; // Stop the image at the middle
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
      context.drawImage(
        wordImage,
        canvasDimensions.width / 2 - 50,
        newY,
        width,
        height
      );
      context.font = "16px Arial";
      context.fillStyle = "black";
      context.fillText(word, canvasDimensions.width / 2 + 100, newY + 110);

      // Create a rounded rectangle with fillet radius for label
      var xpos = canvasDimensions.width / 2 - 115;
      var ypos = 0;
      var widthofscorebox = 230;
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
      var xpos_r = canvasDimensions.width * 0.01;
      var ypos_r = 0;
      var widthofscorebox_r = 140;
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
      context.fillText(`Score: ${score}/10`, xpos_r + 70, ypos + 25);

      //code of Main heading
      context.font = "24px Arial";
      context.fillStyle = "#FF4F18";
      context.fillText("Level-3 Prefix-Suffix", xpos + 115, ypos + 25);

      //code of CoinImage
      var coinImage = new Image();
      coinImage.src = coin;
      context.drawImage(coinImage, xpos_r + 140, ypos_r, 50, 50);

      // Draw "Exit" button with rounded corners
      const exitButtonX = canvasDimensions.width * 0.9;
      const exitButtonY = canvasDimensions.height * 0.01;
      const exitButtonWidth = 80;
      const exitButtonHeight = 30;
      const cornerRadius = 10; // Adjust the corner radius as needed
      context.fillStyle = "tomato";
      context.beginPath();
      context.moveTo(exitButtonX + cornerRadius, exitButtonY);
      context.arcTo(
        exitButtonX + exitButtonWidth,
        exitButtonY,
        exitButtonX + exitButtonWidth,
        exitButtonY + exitButtonHeight,
        cornerRadius
      );
      context.arcTo(
        exitButtonX + exitButtonWidth,
        exitButtonY + exitButtonHeight,
        exitButtonX,
        exitButtonY + exitButtonHeight,
        cornerRadius
      );
      context.arcTo(
        exitButtonX,
        exitButtonY + exitButtonHeight,
        exitButtonX,
        exitButtonY,
        cornerRadius
      );
      context.arcTo(
        exitButtonX,
        exitButtonY,
        exitButtonX + cornerRadius,
        exitButtonY,
        cornerRadius
      );
      context.fill();
      context.font = "16px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        "Exit",
        exitButtonX + exitButtonWidth / 2,
        exitButtonY + exitButtonHeight / 2
      );

      // Draw "Help" button with rounded corners
      const helpButtonX = canvasDimensions.width * 0.75;
      const helpButtonY = canvasDimensions.height * 0.01;
      const helpButtonWidth = 80;
      const helpButtonHeight = 30;
      context.fillStyle = "blue";
      context.beginPath();
      context.arc(
        helpButtonX + cornerRadius,
        helpButtonY + cornerRadius,
        cornerRadius,
        Math.PI,
        1.5 * Math.PI
      );
      context.arc(
        helpButtonX + helpButtonWidth - cornerRadius,
        helpButtonY + cornerRadius,
        cornerRadius,
        1.5 * Math.PI,
        2 * Math.PI
      );
      context.arc(
        helpButtonX + helpButtonWidth - cornerRadius,
        helpButtonY + helpButtonHeight - cornerRadius,
        cornerRadius,
        0,
        0.5 * Math.PI
      );
      context.arc(
        helpButtonX + cornerRadius,
        helpButtonY + helpButtonHeight - cornerRadius,
        cornerRadius,
        0.5 * Math.PI,
        Math.PI
      );
      context.fill();
      context.font = "16px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(
        "Help",
        helpButtonX + helpButtonWidth / 2,
        helpButtonY + helpButtonHeight / 2
      );

      //code of moving result image
      let image = new Image();
      image.src = result ? RightFBImage : WrongFBImage;
      context.drawImage(
        image,
        canvasDimensions.width / 2 - 200,
        imageY,
        400,
        290
      );
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
        context.fillText("Correct!", canvasDimensions.width / 2, imageY + 160);
        context.font = "14px Arial";
        context.fillStyle = "black";
        const originalFont = context.font;
        context.font = "bold " + originalFont;
        context.fillText(
          `${wordList.level3[randomNumber].root} : ${
            wordList.level3[randomNumber][wordList.level3[randomNumber].root]
          }`,
          canvasDimensions.width / 2,
          imageY + 180
        );
        context.fillText(
          `${word} : ${wordList.level3[randomNumber][word]}`,
          canvasDimensions.width / 2,
          imageY + 200
        );
        context.font = originalFont;
      } else {
        context.font = "18px Arial";
        context.fillStyle = "red";
        context.fillText(
          "Incorrect!",
          canvasDimensions.width / 2,
          imageY + 160
        );
        context.font = "14px Arial";
        context.fillStyle = "black";
        context.fillText(word, canvasDimensions.width / 2, imageY + 180);
        context.fillText(
          "Meaningful word not formed.",
          canvasDimensions.width / 2,
          imageY + 200
        );
      }
    };

    const drawBubbles = () => {
      canvas.style.cursor = "default";
      bubbles.forEach((bubble) => {
        const { x, y, width, height, radius, isHovered } = bubble;
        if (isHovered) {
          context.fillStyle = "#FFC400"; // Change the fill color when hovered
          canvas.style.cursor = "pointer"; // Set the cursor to pointer when hovered
        } else {
          context.fillStyle = "#FFA200";
        }
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
          let wordFormed = "";
          let word_arr = [];
          let prefix_arr = [];
          let suffix_arr = [];

          wordList.level3.forEach((element) => {
            word_arr.push(element.word);

            prefix_arr.push(element.prefix);

            suffix_arr.push(element.suffix);
          });

          prefix_arr.includes(bubble.text)
            ? (wordFormed = bubble.text + word)
            : (wordFormed = word + bubble.text);

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

      // Check if the mouse is over any of the bubbles
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

        // Check if the mouse is over the exit button
        const exitButtonX = canvasDimensions.width * 0.9;
        const exitButtonY = canvasDimensions.height * 0.01;
        const exitButtonWidth = 80;
        const exitButtonHeight = 40;

        const isHoveringExitButton =
          mouseX >= exitButtonX &&
          mouseX <= exitButtonX + exitButtonWidth &&
          mouseY >= exitButtonY &&
          mouseY <= exitButtonY + exitButtonHeight;

        // Check if the mouse is over the help button
        const helpButtonX = canvasDimensions.width * 0.75;
        const helpButtonY = canvasDimensions.height * 0.01;
        const helpButtonWidth = 80;
        const helpButtonHeight = 40;

        const isHoveringHelpButton =
          mouseX >= helpButtonX &&
          mouseX <= helpButtonX + helpButtonWidth &&
          mouseY >= helpButtonY &&
          mouseY <= helpButtonY + helpButtonHeight;

        if (
          distance <= rect.radius ||
          isHoveringHelpButton ||
          isHoveringExitButton
        ) {
          return { ...rect, isHovered: true };
        } else {
          return { ...rect, isHovered: false };
        }
      });

      setBubbles(updatedBubbles);
    };

    const getRandomWord = () => {
      let randomIndex = Math.floor(Math.random() * wordList.level3.length);
      let randomWord = wordList.level3[randomIndex].root;
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
              navigate("/level3");
            }
          });
        } else {
          playAudio(gameover);
          setCoinMessage(true);
          Swal.fire({
            title: "Good job!",
            text: `Your score is ${score}`,
            icon: "success",
            confirmButtonText: "Restart",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
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
    canvas.addEventListener("click", handleExitButtonClick);
    canvas.addEventListener("click", handleHelpButtonClick);
    canvas.addEventListener("mousemove", handleBubbleHover);

    requestAnimationFrame(gameLoop);

    return () => {
      canvas.removeEventListener("click", handleBubbleClick);
      canvas.removeEventListener("click", handleExitButtonClick);
      canvas.removeEventListener("click", handleHelpButtonClick);
      canvas.removeEventListener("mousemove", handleBubbleHover);
      if (requestId) {
        cancelAnimationFrame(requestId); // This will stop the animation loop
      }
    };
  }, [state, word, open, canvasDimensions]);

  const handleResize = () => {
    const canvasContainer = canvasRef.current.parentNode;
    const newWidth = canvasContainer.offsetWidth;
    const newHeight = canvasContainer.offsetHeight;
    // console.log("newWidth", newWidth);
    // console.log("newHeight", newHeight);
    setCanvasDimensions((prevDimensions) => ({
      ...prevDimensions,
      width: newWidth,
      height: newHeight,
    }));
  };

  function shuffleWords(wordArray) {
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
  }

  function handleClose() {
    setOpen(false);
    ReactGA.event({
      action: `Eng12|PrefixSuffix|Clicked on Start button of game instructions pop-up.`,
      category: `Eng12|Start button clicked`,
      label: `Eng12|Clicked on Start button of game instructions pop-up`,
    });

    SendLogData(
      sendJsonMessage,
      pageName,
      "Start",
      "Clicked",
      "Clicked to close the game instructions pop-up and start or resume the game",
      [{ input: "", answer: "", result: "" }],
      [
        {
          popuptype: "",
          popuptext: "",
        },
      ],
      [{ hint: "" }]
    );
  }

  function HandleHelp() {
    setOpen(true);
    ReactGA.event({
      action: `Eng12|PrefixSuffix|Clicked on Help button.`,
      category: `Eng12|Help button clicked`,
      label: `Eng12|Clicked on Help button`,
    });

    SendLogData(
      sendJsonMessage,
      pageName,
      "Help",
      "Clicked",
      "Clicked to read the game instructions",
      [{ input: "", answer: "", result: "" }],
      [
        {
          popuptype: "",
          popuptext: "",
        },
      ],
      [{ hint: "" }]
    );
  }

  function handleExit() {
    setIsPaused(true);
    Swal.fire({
      title: "Do you want to exit?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      } else if (result.isDenied) {
        setIsPaused(false);
        Swal.close();
      }
    });

    ReactGA.event({
      action: `Eng12|PrefixSuffix|Clicked on Exit button.`,
      category: `Eng12|Exit button clicked`,
      label: `Eng12|Clicked on Exit button`,
    });

    SendLogData(
      sendJsonMessage,
      pageName,
      "Exit",
      "Clicked",
      "Clicked to quit the game",
      [{ input: "", answer: "", result: "" }],
      [
        {
          popuptype: "",
          popuptext: "",
        },
      ],
      [{ hint: "" }]
    );
  }

  const handleExitButtonClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the click is inside the "Exit" button
    const exitButtonX = canvasDimensions.width * 0.9;
    const exitButtonY = canvasDimensions.height * 0.01;
    const exitButtonWidth = 80;
    const exitButtonHeight = 30;

    if (
      mouseX >= exitButtonX &&
      mouseX <= exitButtonX + exitButtonWidth &&
      mouseY >= exitButtonY &&
      mouseY <= exitButtonY + exitButtonHeight
    ) {
      handleExit();
    }
  };

  const handleHelpButtonClick = (event) => {
    console.log(canvasDimensions.height);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if the click is inside the "Help" button
    const helpButtonX = canvasDimensions.width * 0.75;
    const helpButtonY = canvasDimensions.height * 0.01;
    const helpButtonWidth = 80;
    const helpButtonHeight = 30;

    if (
      mouseX >= helpButtonX &&
      mouseX <= helpButtonX + helpButtonWidth &&
      mouseY >= helpButtonY &&
      mouseY <= helpButtonY + helpButtonHeight
    ) {
      HandleHelp();
    }
  };

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
        className="canvas-background"
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        style={{
          border: "2px solid #000",
          backgroundColor: "transparent",
          backgroundImage: "url(" + backgroundImg + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

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

export default Level3MidContent;
