import { hydrateRoot } from "react-dom/client";
import { Router as WouterRouter } from "wouter";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("RGB789 root element was not found");
}

hydrateRoot(
  root,
  <WouterRouter>
    <App />
  </WouterRouter>,
);
