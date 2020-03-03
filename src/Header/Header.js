import React from 'react';
import logo from './logo-cloudybox.svg';
import { GoSearch } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import "./Header.css";

const Header = ({logOut, location}) => {
    console.log("location propname", location.pathname)
    

    const parts = location.pathname.substring(6).split("/");
    let links;
    if (parts[0] !== ""){
        links = parts.map((_, idx) => {
            return "/home/"  + parts.slice(0, idx + 1).join("/");
        });
        parts.unshift("Home");
        links.unshift("/home");
    } else {
        parts[0] = "Home";
        links = ["/home"];
    }

    return (
        <div className='header-container'>

            <div className="logo-search-container">

                <div className="logo-container">
                    <img src={logo} alt="cloudbox logo uploading files" className="logo-header" />
                </div>

                <div className='search-field' style={{ border: '1px solid #ddd' }}>
                    <GoSearch style={{position: 'absolute', top: '25%', fontSize: '1.2em', color: "#106BAC"}}/>
                    <input
                        className="search-input"
                        style={{ border: 'none' }}
                        type='text'
                        placeholder='Search folder'
                        name='search'
                        id='search'
                    />
                </div>

            </div>

            <div className="path-logout-container">
                <div className="header-path">
                    {/*each part of the path should be clickable*/}
                    <nav>
                        {parts.map((part, idx) => {
                            return <div key={idx}>
                                        <Link to={links[idx]} className="pathLink">{part}</Link>
                                        {idx !== parts.length - 1 ? <span className="divider"><FaAngleRight style={{position: 'relative', top: '4px'}}/></span> : null} 
                                  </div>
                        })}
                    </nav>
                </div>
                <button className='logout-button' onClick={logOut}>Log out</button>
            </div>
        </div>
    )
}

export default Header;