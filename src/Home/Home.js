import React, { useEffect, useState } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";
import Main from "../Main/Main";
import "./Home.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import topImage from "../Home/image/cloud-header-right.svg";

const Home = ({ location }) => {
  const [localToken, updateLocalToken] = useState(token$.value);
  console.log(location);
  useEffect(() => {
    const subscribe = token$.subscribe(token => {
      updateLocalToken(token);
    });

    return () => subscribe.unsubscribe();
  }, []);

  return (<>
            <div className="image-top">
                <span className="imageTop-Span"></span>
                <img className="imageTop" src={topImage}/>
            </div>
            <div className = "container">
                <div className = "header">
                    <Header />
                </div>
                <div className = "content">
                    <div className ="sidebar menu">
                        <Sidebar name = "sidebarMenu"/>
                    </div>
                    <div className ="mainArea">
                        <Main />
                    </div>
                    <div className ="sidebar buttons">
                        <Sidebar localToken={localToken} name = "sidebarButtons"/>
                    </div>
                </div>  
                <Footer />
            </div>
        </>
  );
};

export default Home;
