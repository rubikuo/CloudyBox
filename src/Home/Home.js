import React, { useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import { Dropbox } from "dropbox";
import { token$ } from "../store";
import Main from "../Main/Main";
import "./Home.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import topImage from "../Home/image/cloud-header-right.svg";
import Remove from "../Modals/Remove";
import Create from "../Modals/Create";
import "../Modals/Modals.css";

const Home = ({ location }) => {
    const [localToken, updateLocalToken] = useState(token$.value);
    const [modals, updateModals] = useState(false);
    const [modalType, updateModalType] = useState("");

    let printModal;
    console.log(location);
    useEffect(() => {
        const subscribe = token$.subscribe(token => {
            updateLocalToken(token);
        });

    return () => subscribe.unsubscribe();
  }, []);

    if (modals){
     
     console.log("modal type", modalType)
        if(modalType === "create") {
            printModal = <Create updateModals = {updateModals} localToken={localToken}/>
        } else if (modalType === "remove") {
            printModal = <Remove />
        }
    } else {
        printModal = null;
    }

    console.log(printModal)

    return (<>
        <div className="image-top">
            <span className="imageTop-Span"></span>
            <img className="imageTop" src={topImage} alt="background" />
        </div>
        <div className="container">
            <div className="header">
                <Header />
            </div>
            <div className="content">
                <div className="sidebar menu">
                    <Sidebar name="sidebarMenu" />
                </div>
                <div className="mainArea">
                    <Main />
                </div>
                <div className="sidebar buttons">
                    <Sidebar updateModals = {updateModals} updateModalType = {updateModalType} localToken={localToken} name="sidebarButtons" />
                </div>
            </div>
            <Footer />    
        </div>
     {ReactDOM.createPortal(printModal, document.body)} 
    </>
  );
};

export default Home;
