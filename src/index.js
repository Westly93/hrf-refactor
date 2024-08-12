import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Provider  from "./redux/Provider";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
