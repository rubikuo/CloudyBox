import React, { useEffect, useState } from "react";
import { token$, favorites$, clearFavorites, updateToken } from "../store";
import Main from "../Main/Main";
import "./Home.css";
import { Dropbox } from 'dropbox';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import MemoFooter from "../Footer/Footer";
import topImage from "../Home/image/clouds.svg";
import "../Modals/Modals.css";
import { Redirect } from "react-router-dom";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

const Home = ({ location }) => {
    const [localToken, updateLocalToken] = useState(token$.value);
    const [documents, updateDocs] = useState([]);
    const [choosenFiles, updateChoosenFiles] = useState([]);
    const [itemId, updateItemId] = useState("");
    const [itemName, updateItemName] = useState("");
    const [favorites, updateFavorite] = useState(favorites$.value);
    const [search, updateSearch] = useState('');
    const [userName, updateUserName] = useState("");
    const [sidebarDropdown, updateSidebarDropdown] = useState(false);

    const filterSearch = (e) => {
        updateSearch(e.target.value);
    }

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

    useEffect(() => {
        const dropbox = new Dropbox({ fetch: fetch, accessToken: localToken });
        dropbox
          .usersGetCurrentAccount()
          .then(function (response) {
            updateUserName(response.name.given_name);
          })
          .catch(function (error) {
            console.error(error);
          });
      }, [localToken]);

    const logOut = () => {
        clearFavorites(null);
        updateToken(null);
    }

    const toggleSidebarDropdown = () => {
        updateSidebarDropdown(sidebarDropdown === false ? true : false); 
    }

    // console.log("local", favorites$.value)

    if (!localToken) {
        return <Redirect to='/' />
    }
    let sidebarDropdown_class;
    let toggleIcon;
    if(sidebarDropdown) {
        sidebarDropdown_class = "sb-dropdown active";
        toggleIcon = <AiOutlineMenuUnfold size="20px"/>

    } else {
        sidebarDropdown_class = "sb-dropdown"
        toggleIcon = <AiOutlineMenuFold size="20px"/>
    }

    return (<>
        <div className="image-top">
            <span className="imageTop-Span"></span>
            <img className="imageTop" src={topImage} alt="background" />
        </div>
        <div className="container">
            <div className="header">
                <Header 
                    filterSearch={filterSearch}
                    logOut={logOut}
                    location={location}
                    search={search}
                    userName={userName}
                />
            </div>
            <div className="content">
                <div className="mainArea">
                    <Main
                        localToken={localToken}
                        documents={documents}
                        updateDocs={updateDocs}
                        choosenFiles={choosenFiles}
                        itemName={itemName}
                        updateItemName={updateItemName}
                        itemId={itemId}
                        updateItemId={updateItemId}
                        favorites={favorites}
                        updateFavorite={updateFavorite}
                        location={location}
                        search={search}
                    />
                     <div className="sidebar-dropdown" onClick={toggleSidebarDropdown}>
                        {toggleIcon}
                        <div className={sidebarDropdown_class}>
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
