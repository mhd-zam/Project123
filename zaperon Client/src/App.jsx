import "./App.css";
import React from "react";
import Themprovider from "./Themprovider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import InsideAuth from "./pages/InsideAuth";
import OutsideAuth from "./pages/OutsideAuth";

function App() {
  return (
    <Themprovider>
      <BrowserRouter>
        <Routes>
          <Route  element={<OutsideAuth/>} >
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<InsideAuth/>} >
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Themprovider>
  );
}

export default App;
