import { Fragment } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

const App = () => (
  <Fragment>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Fragment>
);

export default App;
