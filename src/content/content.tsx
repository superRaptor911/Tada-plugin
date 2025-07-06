

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   for (const module of MODULES) {
//     if (module.handleMessageEvent(message)) {
//       return true; // Stop processing further modules if one has handled the
//       message
//     }
//   }
// });
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import styles from "./content.css?inline"; // For Vite users, or import as string

const host = document.createElement("div");
host.id = "tada-root";

const shadowRoot = host.attachShadow({ mode: "open" });
document.body.appendChild(host);

// Inject styles
const style = document.createElement("style");
style.textContent = styles;
shadowRoot.appendChild(style);

// Create a root inside shadow DOM
const appContainer = document.createElement("div");
shadowRoot.appendChild(appContainer);

// Render React app
ReactDOM.createRoot(appContainer).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("Content script loaded and React app rendered in shadow DOM.");
