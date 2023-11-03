import React from "react";
import { ListItemText } from "@mui/material";

const ActStartPopupContent = () => {
  return (
    <>
      <ListItemText sx={{ display: "list-item" }}>
        We are going to play a game to learn prefixes and suffixes.
      </ListItemText>
      <ListItemText sx={{ display: "list-item" }}>
        There are three levels in the game.
      </ListItemText>
      <ListItemText sx={{ display: "list-item" }}>
        In level 1, students will select the appropriate prefix for the given
        word.
      </ListItemText>
      <ListItemText sx={{ display: "list-item" }}>
        In level 2, students will select the appropriate suffix for the given
        word.
      </ListItemText>
      <ListItemText sx={{ display: "list-item" }}>
        In level 3, students will select the appropriate prefix and suffix for
        the given word.
      </ListItemText>
    </>
  );
};

export default ActStartPopupContent;
