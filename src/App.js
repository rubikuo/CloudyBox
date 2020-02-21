import React from "react";
import "./App.css";
import LogIn from "./LogIn/LogIn";

import { Dropbox } from "dropbox";

function App() {

  // to access to the app
  const dbx = new Dropbox({clientId: "bc9lq9cup2tcfps"});
  // to get token by using getAuthenticationUrl 
  // we will get location.hash 
  // use queryString to parsel the location.hash to get the token
  const url = dbx.getAuthenticationUrl("http://localhost:3000/auth");

  return (
    <div className="App">
      <LogIn />
      <a href={url}>Connect</a>
    </div>
  );
}

export default App;
