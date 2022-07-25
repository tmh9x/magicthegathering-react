import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

function ClearFilterButton({ clearFilter }) {
  return (
    <IconButton variant="outlined" color="error" onClick={clearFilter}>
      <DeleteIcon />
    </IconButton>
  );
}

export default ClearFilterButton;
