import React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "../../components/Card/Card";
import Autocomplete from "@mui/material/Autocomplete";
import Pagination from "@mui/material/Pagination";
import "./Characters.css";
import ClearFilterButton from "../../components/ClearFilterButton/ClearFilterButton";

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);

  console.log("page", page);

  const getCharacters = async (page) => {
    try {
      const response = await fetch(
        `https://api.magicthegathering.io/v1/cards?page=${page}`
      );
      const results = await response.json();
      console.log("results", results.cards);
      console.log("results", results);
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

  const handleChange = (page) => {
    console.log("page", page);
    setPage(page);
  };

  const clearFilter = () => {
    setInput("");
  };

  useEffect(() => {
    getCharacters(page);
  }, [page]);

  if (!uniqueCharacters) {
    return <div>Characters not found</div>;
  }

  return (
    <div className="characters-container">
      <div>
        <Pagination
          className="pagination"
          count={10}
          onChange={(event, page) => handleChange(page)}
          page={page}
          size="normal"
        />
      </div>

      <div className="search-container">
        <div>
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
        </div>

        <div>
          <ClearFilterButton clearFilter={clearFilter} />
        </div>
      </div>

      <div>
        {filteredResults.map((character) => (
          <Card key={character.multiverseid} props={character} />
        ))}
      </div>
    </div>
  );
}

export default Characters;
