import "./App.css";

import { Route, Routes } from "react-router-dom";

import CharacterDetails from "./views/CharacterDetails/CharacterDetails";
import Characters from "./views/Characters/Characters";
import { CharactersContextProvider } from "./contexts/charactersContext";
/* import Login from "./views/Login/Login"; */
import NavBar from "./components/NavBar/NavBar";

export default function App() {
  return (
    <div className="App">
      <CharactersContextProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path=":id" element={<CharacterDetails />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="*" element={<h1>Route does not exist</h1>} />
        </Routes>
      </CharactersContextProvider>
    </div>
  );
}
