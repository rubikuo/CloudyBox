import React from "react";
import "./App.css";
import LogIn from "./LogIn/LogIn";
import Home from "./Home/Home";
import Auth from "./Auth";
import { Route, BrowserRouter as Router } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
        <Route path="/home" component={Home} />
        <Route path="/auth" component={Auth} />
        <Route exact path="/" component={LogIn} />
      </Router>
    </div>
  );
}

export default App;
