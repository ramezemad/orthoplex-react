import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const setFavicon = (href) => {
  const link = document.querySelector("link[rel='icon']");
  link.href = href;
};

setFavicon("/favicon-loading.ico");

window.addEventListener("load", () => {
  setFavicon("/favicon.ico");
});
