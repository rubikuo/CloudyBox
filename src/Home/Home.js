import React, { useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import { token$, favorites$ } from "../store";
import Main from "../Main/Main";
import "./Home.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MemoFooter from "../Footer/Footer";
import topImage from "../Home/image/cloud-header-right.svg";
import Remove from "../Modals/Remove";
import Create from "../Modals/Create";
import { Redirect } from 'react-router-dom';
import "../Modals/Modals.css";

const Home = ({ location }) => {
    const [localToken, updateLocalToken] = useState(token$.value);
    const [modals, updateModals] = useState(false);
    const [modalType, updateModalType] = useState("");
    const [documents, updateDocs] = useState([]);
    const [choosenFiles, updateChoosenFiles ] = useState([]);
    const [itemId, updateItemId] = useState("");
    const [itemName, updateItemName] = useState("");
    const [favorites, updateFavorite] = useState(favorites$.value);

    let printModal;

  // console.log(location)

    useEffect(() => {
    const subscribe = token$.subscribe(token => {
      updateLocalToken(token);
  
    })

    return () => subscribe.unsubscribe();
  
    }, []);

    useEffect(
		() => {
			const subscribe = favorites$.subscribe((favorite) => {
				updateFavorite(favorite);
			});
			return () => subscribe.unsubscribe();
		},
		[ updateFavorite ]
	);

    if (modals){
     
    //  console.log("modal type", modalType)
        if(modalType === "create") {
            printModal = <Create updateModals = {updateModals} localToken={localToken} documents={documents} updateDocs={updateDocs} location={location}/>
        } else if (modalType === "remove") {
          console.log(itemId, itemName);
            printModal = 
            <Remove 
            itemId={itemId} 
            itemName ={itemName}
            updateModals = {updateModals} 
            documents={documents} 
            updateDocs={updateDocs}
            location={location}
            />
        }
    } else {
        printModal = null;
    }

    // console.log(printModal)
    console.log("local", favorites$.value)

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
                <div className="mainArea">
                    <Main 
                        localToken={localToken} 
                        documents={documents} 
                        updateDocs={updateDocs} 
                        choosenFiles={choosenFiles} 
                        updateModalType={updateModalType}
                        updateModals={updateModals}
                        updateItemName = {updateItemName}
                        updateItemId = {updateItemId}
                        favorites = {favorites}
                        updateFavorite ={updateFavorite} 
                        location={location}
                    />
                </div>
                <div className="sidebar buttons">
                    <Sidebar 
                        localToken={localToken} 
                        documents={documents} 
                        updateDocs={updateDocs} 
                        choosenFiles={choosenFiles} 
                        updateChoosenFiles={updateChoosenFiles}
                        updateModals = {updateModals} 
                        updateModalType = {updateModalType}
                        location={location}
                    />
                </div>
            </div>
            <MemoFooter />    
            {ReactDOM.createPortal(printModal, document.body)} 
     </div>
    </>
  );
};

export default Home;
