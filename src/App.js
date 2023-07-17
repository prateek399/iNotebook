import "./App.css";
import React, { useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoteState from "./context/Notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert({ msg: "", type: "" });
    }, 2000);
  };
  return (
    <NoteState>
      <Router>
        <Navbar showAlert={showAlert} />
        <Alert alert={alert} />
        <div className="container">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert} />
            </Route>
            <Route exact path="/">
              <Home showAlert={showAlert} />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
