import React from "react";
import { authContext } from "../contexts/authContext";
import { useContext } from "react";

function useIsAuthenticated() {
  const { user } = useContext(authContext);

  const isAuthenticated = user !== null ? true : false;

  return isAuthenticated;
}

export default useIsAuthenticated;
