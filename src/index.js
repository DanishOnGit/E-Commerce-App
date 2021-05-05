import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CartProvider, ToastProvider, AuthProvider } from "./Contexts";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <CartProvider>
        <ToastProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ToastProvider>
      </CartProvider>
    </Router>
  </StrictMode>,
  rootElement
);
