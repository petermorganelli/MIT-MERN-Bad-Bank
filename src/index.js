import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import Register from "./routes/register";
import Deposit from "./routes/deposit";
import Withdrawl from "./routes/withdrawl";
import Data from "./routes/mydata";
import Login from "./routes/login";
import NotFound from "./routes/notFound";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/deposit" element={<Deposit/>} />
          <Route path="/withdrawl" element={<Withdrawl/>} />
          <Route path="/mydata" element={<Data/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
