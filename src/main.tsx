import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "./ErrorBoundary";
import App from "./App";

// Import CSS dynamically to avoid externalization issue
import("./styles/globals.css").catch(err => {
  console.warn("Could not load globals.css:", err);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
