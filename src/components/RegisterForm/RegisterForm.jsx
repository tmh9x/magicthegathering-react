import "./RegisterForm.css";

import React, { useContext, useState } from "react";

import BackButton from "../BackButton/BackButton";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { authContext } from "../../contexts/authContext";

export default function RegisterForm() {
  const { register } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <>
      <div className="register-form-container">
        <h2>Register</h2>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          type="email"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          required
        />

        <Button
          type="button"
          color="primary"
          variant="contained"
          onClick={handleRegister}
        >
          Register
        </Button>
      </div>
    </>
  );
}
