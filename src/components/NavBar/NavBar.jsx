import "./NavBar.css";

import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  let navigate = useNavigate();
  const handleClick = () => {
    navigate("login");
  };

  return (
    <Box className="button-app-bar" sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Magic the Gathering
            </Typography>
            <Button color="inherit" onClick={handleClick}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
