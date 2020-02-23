import React, { useEffect, useState } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import Main from "../Main/Main";
import "./Home.css";

const Home = ({ location }) => {
  const [localToken, updateLocalToken] = useState(token$.value);
  console.log(location);
  useEffect(() => {
    const subscribe = token$.subscribe(token => {
      updateLocalToken(token);
    });

    return () => subscribe.unsubscribe();
  }, []);

  return (
        <div className = "container">
            <div className = "header">
               
            </div>
            <div className = "content">
                <div className ="sidebar menu">

                </div>
                <div className ="mainArea">
                    <Main />
                </div>
                 <div className ="sidebar buttons">

                 </div>
            </div>  
            <div className = "footer">

            </div>
        </div>
  );
};

export default Home;
