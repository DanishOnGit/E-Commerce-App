import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider, ToastProvider } from "./Contexts";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <CartProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </CartProvider>
    </Router>
  </StrictMode>,
  rootElement
);
