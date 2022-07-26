import { createContext, useState } from "react";

export const charactersContext = createContext();

export const CharactersContextProvider = (props) => {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async (page) => {
    try {
      const response = await fetch(
        `https://api.magicthegathering.io/v1/cards?pageSize=20&page=${page}`
      );
      const results = await response.json();

      setCharacters(results.cards);
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
