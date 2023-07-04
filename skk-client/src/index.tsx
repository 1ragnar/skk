import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { StateProvider } from "AppContext";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={15} autoHideDuration={2000}>
      <BrowserRouter>
        <StateProvider>
          <App />
        </StateProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();
