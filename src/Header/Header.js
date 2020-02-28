import React from 'react';
import logo from './LOGO.png';
import { GoSearch } from 'react-icons/go';
import "./Header.css";

const Header = () => {
    return (
        <div className='header-container'>

            <div className="logo-search-container">

                <div className="logo-container">
                    <img src={logo} alt="cloudbox logo uploading files" className="logo-header" />
                </div>


                <div className='search-field' style={{ border: '1px solid #ddd' }}>
                    <GoSearch />
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
                        <span>Home</span>
                        <span> > Folder</span>
                    </nav>
                </div>
                <button className='logout-button'>Log out</button>
            </div>
        </div>
    )
}

export default Header;