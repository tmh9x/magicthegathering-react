import { createContext, useState } from "react";

export const charactersContext = createContext();

export const CharactersContextProvider = (props) => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async (page) => {
    try {
      const response = await fetch(
        `https://api.magicthegathering.io/v1/cards?page=${page}`
      );
      const results = await response.json();

      const seen = new Set();
      const uniqueCharacters = results.cards.filter((e) => {
        const duplicate = seen.has(e.name);
        seen.add(e.name);
        return !duplicate;
      });
      setCharacters(uniqueCharacters);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <charactersContext.Provider value={{ characters, getCharacters }}>
      {props.children}
    </charactersContext.Provider>
  );
};
