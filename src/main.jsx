import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./tools/store.js";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Search from "./pages/Search.jsx";

import Food from "./pages/Food.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />}></Route>
        <Route path=":id" element={<Food />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
