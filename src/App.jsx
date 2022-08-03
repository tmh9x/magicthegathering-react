import "./App.css";

import { Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/authContext";
import CharacterDetails from "./views/CharacterDetails/CharacterDetails";
import Characters from "./views/Characters/Characters";
import { CharactersContextProvider } from "./contexts/charactersContext";
import Chat from "./views/Chat/Chat";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Register from "./views/Register/Register";
import { app } from "./firebase";

export default function App() {
  console.log("app", app);
  return (
    <div className="App">
      <AuthContextProvider>
        <NavBar />
        <CharactersContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/characters"
              element={
                <ProtectedRoute>
                  <Characters />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="/characters/:id"
              element={<ProtectedRoute>{<CharacterDetails />}</ProtectedRoute>}
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<h1>Route does not exist</h1>} />
          </Routes>
        </CharactersContextProvider>
      </AuthContextProvider>
    </div>
  );
}
