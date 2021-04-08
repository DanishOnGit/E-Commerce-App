import { StrictMode } from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./database/productsDatabase";
import { CartProvider } from "./Contexts";
import {ToastProvider} from "./Contexts"
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
setupMockServer();

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
