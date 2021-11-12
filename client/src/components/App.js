import React from "react";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./User/User";

function App() {
  return (
    <div className="main_app">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user" element={<User/>} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
