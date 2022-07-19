import React from "react";
import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";

function Characters() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    try {
      const response = await fetch(`https://api.magicthegathering.io/v1/cards`);
      const results = await response.json();
      console.log("results", results.cards);
      setCharacters(results.cards);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("characters", characters);
  console.log("characters", typeof characters);

  useEffect(() => {
    getCharacters();
  }, []);

  if (!characters) {
    return <div>Characters not found</div>;
  }

  return (
    <>
      {characters &&
        characters.map((character) => (
          <Card key={character.id} props={character} />
        ))}
    </>
  );
}

export default Characters;
