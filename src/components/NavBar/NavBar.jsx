import "./NavBar.css";

import React, { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "../Drawer/Drawer";
import Toolbar from "@mui/material/Toolbar";
import magic from "../../assets/magic.png";

export default function NavBar() {
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
