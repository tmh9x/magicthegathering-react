import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  return (
    <IconButton
      type="button"
      color="error"
      variant="outlined"
      onClick={handleClick}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
}
