import React, { useEffect, useState } from "react";
import { token$, favorites$, clearFavorites, updateToken } from "../store";
import Main from "../Main/Main";
import "./Home.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MemoFooter from "../Footer/Footer";
import topImage from "../Home/image/cloud-header-right.svg";
import "../Modals/Modals.css";
import { Redirect } from "react-router-dom";

const Home = ({ location }) => {
    const [localToken, updateLocalToken] = useState(token$.value);
    const [documents, updateDocs] = useState([]);
    const [choosenFiles, updateChoosenFiles] = useState([]);
    const [itemId, updateItemId] = useState("");
    const [itemName, updateItemName] = useState("");
    const [favorites, updateFavorite] = useState(favorites$.value);


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
        [updateFavorite]
    );

    const logOut = () => {
        clearFavorites(null);
        updateToken(null);
    }

    console.log("local", favorites$.value)

    if(!localToken) {
        return <Redirect to='/' />
    }

    return (<>
        <div className="image-top">
            <span className="imageTop-Span"></span>
            <img className="imageTop" src={topImage} alt="background" />
        </div>
        <div className="container">
            <div className="header">
                <Header logOut={logOut} />
            </div>
            <div className="content">
                <div className="mainArea">
                    <Main
                        localToken={localToken}
                        documents={documents}
                        updateDocs={updateDocs}
                        choosenFiles={choosenFiles}
                        itemName ={itemName}
                        updateItemName = {updateItemName}
                        itemId={itemId} 
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
                        location={location}
                    />
                </div>
            </div>
            <MemoFooter />
        </div>
    </>
    );
};

export default Home;
