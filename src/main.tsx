import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import "react-bubble-ui/dist/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Suspense>
    <App />
  </React.Suspense>
);
