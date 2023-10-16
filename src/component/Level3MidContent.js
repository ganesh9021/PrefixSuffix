import React, { useEffect, useState, useRef, Fragment } from "react";
import img from "../img/download.png";
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

const Level3MidContent = () => {
  let navigate = useNavigate();
  let canvasRef = useRef(null);
  //coin message
  let [coinMessage, setCoinMessage] = useState(false);

  //cube and image speed
  let [cubeSpeed, setCubeSpeed] = useState(1.0);
  let [imageSpeed, setImageSpeed] = useState(4.0);
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
  //prefix array
  const [prefixArray, setPrefixArray] = useState([
    "Anti",
    "Over",
    "Under",
    "Multi",
    "Auto",
    "Post",
  ]);
  //suffix array
  const [suffixArray, setSuffixArray] = useState([
    "ment",
    "less",
    "able",
    "ness",
    "ship",
    "hood",
  ]);

  //Image is far away from canvas bcuz i wanted to show it only on click.
  let [imagePosition, setImagePosition] = useState({
    x: 450,
    y: 20000,
  });
  let requestId;

  const [state, setState] = useState({
    gravity: 1,
    speedX: 0,
    speedY: 0,
    x: 560,
    y: 0,
    width: 100,
    height: 50,
  });

  shuffleWords(prefixArray);
  shuffleWords(suffixArray);
  const [bubbles, setBubbles] = useState([
    { x: 50, y: 50, radius: 30, text: prefixArray[0], isHovered: false },
    { x: 50, y: 140, radius: 30, text: prefixArray[1], isHovered: false },
    { x: 50, y: 230, radius: 30, text: prefixArray[2], isHovered: false },
    { x: 50, y: 320, radius: 30, text: prefixArray[3], isHovered: false },
    { x: 50, y: 410, radius: 30, text: prefixArray[4], isHovered: false },
    { x: 50, y: 500, radius: 30, text: prefixArray[5], isHovered: false },

    { x: 1110, y: 50, radius: 30, text: suffixArray[0], isHovered: false },
    { x: 1110, y: 140, radius: 30, text: suffixArray[1], isHovered: false },
    { x: 1110, y: 230, radius: 30, text: suffixArray[2], isHovered: false },
    { x: 1110, y: 320, radius: 30, text: suffixArray[3], isHovered: false },
    { x: 1110, y: 410, radius: 30, text: suffixArray[4], isHovered: false },
    { x: 1110, y: 500, radius: 30, text: suffixArray[5], isHovered: false },
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
            setImagePosition({ x: 450, y: 20000 });
          }, 3000);
        }
        setImagePosition({ x: imageX, y: newImageY });
      }

      setState((prevState) => ({
        ...prevState,
        y: newY,
      }));

      clear();

      //code of moving cube
      context.fillStyle = "red";
      context.fillRect(x, newY, width, height);
      context.font = "16px Arial";
      context.fillStyle = "black";
      context.fillText(word, x + 50, newY + 25);

      //code of score
      context.font = "32px Arial";
      context.fillStyle = "black";
      context.strokeText(`Score: ${score}/10`, 600, 50);

      //code of moving result image
      let image = new Image();
      image.src = img;
      context.drawImage(image, imageX + 60, imageY, 200, 200);
      context.font = "16px Arial";
      context.fillStyle = "black";

      if (newY > canvas.height) {
        newY = 0; // Reset the cube's position to the top
        setClickDisabled(false);
        setcongratulationsMessage(false);
        getRandomWord();
        setClickedDuringCycle(false);

        if (!clickedDuringCycle) {
          // Show a message when the user didn't click on any bubble this cycle
          toast.warning("You miss the previous word!!!", {
            position: "top-center",
            autoClose: 1000,
            theme: "dark",
          });
        }

        if (newY == 0) {
          setImagePosition((prevState) => ({ ...prevState, x: 450, y: 20000 }));
        }
      }

      if (result) {
        context.fillStyle = "green";
        context.fillText("Correct!", imageX + 160, imageY + 50);
        context.strokeText(
          `Root -> ${wordList.level3[randomNumber].root} -> ${
            wordList.level3[randomNumber][wordList.level3[randomNumber].root]
          }`,
          imageX + 160,
          imageY + 70
        );
        context.strokeText(
          `Word -> ${word} -> ${wordList.level3[randomNumber][word]}`,
          imageX + 160,
          imageY + 90
        );
      } else {
        context.fillStyle = "red";
        context.fillText("Incorrect!", imageX + 160, imageY + 50);
        context.strokeText(word, imageX + 160, imageY + 70);
        context.strokeText(
          "Meaningful word not formed.",
          imageX + 160,
          imageY + 90
        );
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
      setClickedDuringCycle(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      if (clickDisabled) {
        // toast.error("You are allowed to click only once during a cycle !!", {
        //   position: "top-center",
        //   autoClose: 2000,
        // });
        // toast.error('🦄 You are allowed to click only once during a cycle !!!', {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        //   });
        return;
      }

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
          //console.log("Bubble clicked:", bubble.text);

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
            setImagePosition({ x: 450, y: 600 });
            setcongratulationsMessage(true);
            playAudio(correctanswer);
            setWord(wordFormed);
            setResult(true);
            setClickDisabled(true);
            let newScore = score + 1;
            setScore(newScore);
            setImagePosition({ x: 450, y: 600 });
          } else {
            setImagePosition({ x: 450, y: 600 });
            playAudio(wronganswer);
            setWord(wordFormed);
            setResult(false);
            setClickDisabled(true);
            setImagePosition({ x: 450, y: 600 });
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
            confirmButtonText: "Home",
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

  function shuffleWords(wordArray) {
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
  }
  return (
    <div
      className="d-flex justify-content-center align-items-center canvas-background"
      style={{ height: "100%", width: "100%" }}
    >
      <canvas
        ref={canvasRef}
        className="canvas-background"
        width={1160}
        height={560}
        style={{
          border: "2px solid #000",
          backgroundColor: "transparent",
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
      {coinMessage && <GoldCoinsEarned coins={300} />}
    </div>
  );
};

export default Level3MidContent;
