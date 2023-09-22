import React from "react";
import { ListItemText } from "@mui/material";

const QuizPopupContent = () => {
  return (
    <>
      {" "}
      <ListItemText sx={{ display: "list-item" }}>
        Read all instructions given below.{" "}
      </ListItemText>
      <ListItemText sx={{ display: "list-item" }}>
        The quiz will start after clicking on the "OK" button, along with a
        timer.
      </ListItemText>{" "}
      <ListItemText sx={{ display: "list-item" }}>
        To select an option as an answer to a given question click on it.
      </ListItemText>{" "}
      <ListItemText sx={{ display: "list-item" }}>
        You will get two attempts to select the correct option to the question.
      </ListItemText>{" "}
      <ListItemText sx={{ display: "list-item" }}>
        You may skip the question, if you want.
      </ListItemText>{" "}
      <ListItemText sx={{ display: "list-item" }}>
        The score and timing are displayed on the top of the screen throughout
        the quiz.
      </ListItemText>{" "}
      <ListItemText sx={{ display: "list-item" }}>
        You will get +1 for each correct answer. There is no negative marking.
      </ListItemText>{" "}
      <ListItemText sx={{ display: "list-item" }}>
        The scorecard will be generated at the end of the quiz.
      </ListItemText>{" "}
    </>
  );
};

export default QuizPopupContent;
