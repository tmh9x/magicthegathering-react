import "./Home.css";

import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { charactersContext } from "../../contexts/charactersContext";

function Home() {
  const { characters } = useContext(charactersContext);
  const { user } = useContext(authContext);

  console.log("characters", characters);
  return (
    <div className="home-container">
      <div>
        <h2>WELCOME</h2>
        {user && (
          <div>
            <h4>{user.email}</h4>
            <p>You are successfully logged in!</p>
          </div>
        )}
      </div>

      {!user && (
        <div>
          <p>
            Please <Link to="login">Login</Link> to Your Account!
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
