import { Navigate } from "react-router-dom";
import React from "react";
import { authContext } from "../../contexts/authContext";
import { useContext } from "react";
import useIsAuthenticated from "../../utils/useIsAuthenticated";

function ProtectedRoute({ children }) {
  console.log("children >>>", children);
  const { user } = useContext(authContext);

  const isAuth = useIsAuthenticated();

  return <div>{isAuth ? children : <Navigate to="/" />}</div>;
}

export default ProtectedRoute;
