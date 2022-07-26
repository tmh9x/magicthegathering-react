import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import React from "react";

export default function ClearFilterButton({ clearFilter }) {
  return (
    <IconButton variant="outlined" color="error" onClick={clearFilter}>
      <DeleteIcon />
    </IconButton>
  );
}
