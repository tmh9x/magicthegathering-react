import React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "../../components/Card/Card";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import "./Characters.css";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");

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

  const uniqueNames = [];

  const uniqueCharacters = characters.filter((element) => {
    const isDuplicate = uniqueNames.includes(element.name);

    if (!isDuplicate) {
      uniqueNames.push(element.name);
      return true;
    }
    return false;
  });

  console.log("uniqueCharacters", uniqueCharacters);

  const getInput = (event) => {
    setInput(event.target.textContent);
  };
  console.log("input", input);

  const filteredResults = !input
    ? uniqueCharacters
    : uniqueCharacters.filter((uniqueCharacter) =>
        uniqueCharacter.name.toLowerCase().includes(input.toLowerCase())
      );

  useEffect(() => {
    getCharacters();
  }, []);

  if (!uniqueCharacters) {
    return <div>Characters not found</div>;
  }

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        className="search"
        onChange={getInput}
        disableClearable
        options={uniqueCharacters.map((character) => character.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            sx={{ width: 300 }}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      {uniqueCharacters &&
        filteredResults.map((character) => (
          <Card key={character.multiverseid} props={character} />
        ))}
    </>
  );
}

export default Characters;
