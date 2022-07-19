import Characters from "./views/Characters/Characters";
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CharacterDetails from "./views/CharacterDetails/CharacterDetails";

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path=":id" element={<CharacterDetails />} />
        <Route path="*" element={<h1>Route does not exist</h1>} />
      </Routes>
    </div>
  );
}

export default App;
