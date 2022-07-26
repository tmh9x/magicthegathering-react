import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <Button
      type="button"
      color="error"
      variant="outlined"
      onClick={handleClick}
    >
      Back
    </Button>
  );
}
