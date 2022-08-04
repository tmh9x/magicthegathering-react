import "./Drawer.css";

import { Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Box from "@mui/material/Box";
import ChatIcon from "@mui/icons-material/Chat";
import CollectionsIcon from "@mui/icons-material/Collections";
import Divider from "@mui/material/Divider";
import InfoIcon from "@mui/icons-material/Info";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { authContext } from "../../contexts/authContext";

export default function Drawer() {
  const { user, logout } = useContext(authContext);

  let navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2>Menu</h2>

      <List>
        {!user && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <Link to="/login">Login</Link>
            </ListItemButton>
          </ListItem>
        )}
        {user && (
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Link className="logout" to="/">
                Logout
              </Link>
            </ListItemButton>
          </ListItem>
        )}
        {!user && (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <Link to="/register">Register</Link>
            </ListItemButton>
          </ListItem>
        )}
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <Link to="/characters">Characters</Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <Link to="/chat">Chat</Link>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <a href="mailto:contact@mtg.com">Contact</a>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
            onClick={toggleDrawer(anchor, true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
