import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { AuthContextProvider } from "./context/authContext/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <App />
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
