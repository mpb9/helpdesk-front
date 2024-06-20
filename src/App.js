import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Link to="/">
            <h2>Home</h2>
          </Link>
          <Link to="/admin">
            <h2 className="App-admin">Admin</h2>
          </Link>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
