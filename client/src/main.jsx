/**
 * @file main.jsx
 * @description React entry point. Mounts the root App component.
 * index.css contains all global styles — App.css (Vite default) is removed.
 */

import {BrowserRouter} from "react-router-dom";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app/App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
