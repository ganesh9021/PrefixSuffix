import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions } from "@mui/material";
import { ListItemText } from "@mui/material";

const Gameinstrudialog = ({ open, handleClose }) => {
  return (
    <div className="">
      <Dialog
        className="animate__animated animate__fadeInTopLeft"
        open={open}
        hideBackdrop
      >
        <DialogTitle className="text-center text-white bg-primary fw-bolder fs-4">
          Do you know how to play? 🤔
        </DialogTitle>
        <DialogContent className="bg-transparent bg-opacity-10">
          <ul className="mt-4">
            <ListItemText sx={{ display: "list-item" }}>
              Click on the "START" button to initiate the game.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              There are three levels in the activity.
            </ListItemText>
            <ol>
              <ListItemText sx={{ display: "list-item" }}>
                Level - 1 Prefix
              </ListItemText>
              <ListItemText sx={{ display: "list-item" }}>
                Level - 2 Suffix
              </ListItemText>
              <ListItemText sx={{ display: "list-item" }}>
                Level - 3 Prefix and suffix
              </ListItemText>
            </ol>
            <ListItemText sx={{ display: "list-item" }}>
              The word is written on the hot air balloon.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              Prefixes/suffixes are given in boxes left and right side.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              There are 10 words in the each level.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              You can only select the prefix or suffix till word is going out of
              the screen.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              If your answer is correct, you will earn +1 score.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              The score is shown upperside of the game.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              If you score is less than 6 then you need to reattempt the quiz
              else you can go to the next level.
            </ListItemText>
            <ListItemText sx={{ display: "list-item" }}>
              You can exit the game at any time by clicking on the "Exit"
              button.
            </ListItemText>
          </ul>
        </DialogContent>

        <DialogActions className="d-flex justify-content-center">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleClose}
          >
            START
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Gameinstrudialog;
