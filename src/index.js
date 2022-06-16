import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { OrderProvider } from "./contexts/OrderContext";
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <OrderProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OrderProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
