import "./Home.css";

import React, { useContext } from "react";

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
        {user && <h4>{user.email}</h4>}
      </div>

      {!user && (
        <div>
          <p>Please Login to Your Account!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
