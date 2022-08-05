import "./NavBar.css";

import React, { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import BackButton from "../BackButton/BackButton";
import Box from "@mui/material/Box";
import Drawer from "../Drawer/Drawer";
import Toolbar from "@mui/material/Toolbar";
import magic from "../../assets/magic.png";
import { useLocation } from "react-router-dom";

export default function NavBar() {
  let location = useLocation();
  console.log("location", location);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  return (
    <Box className="button-app-bar" sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static">
          <Toolbar>
            <div className="nav-container">
              <div className="back-button">
                {location.pathname === "/chat" && <BackButton />}
              </div>
              <div className="logo">
                <img src={magic} className="magic-img" alt="" />
              </div>
              <div className="drawer">
                <Drawer className="drawer" />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
