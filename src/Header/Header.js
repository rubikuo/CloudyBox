import React from 'react';
import logo from './LOGO.png';
import { GoSearch } from 'react-icons/go';
import "./Header.css";

const Header = () => {
    return (
        <div className='headerContainer'>

            <div className="logoContainer">
                <img src={logo} alt="cloudbox logo uploading files" className="logoHeader" />
            </div>

            <div className="headerPathSearchContainer">
                {/*each part of the path should be clickable*/}
                <nav>
                    <span>Home</span>
                    <span> > Folder</span>
                </nav>

                <div className='headerSearchContainer' style={{ border: '1px solid #ddd' }}>
                    <GoSearch />
                    <input
                    className="searchInput"
                        style={{ border: 'none' }}
                        type='text'
                        placeholder='Search folder'
                        name='search'
                        id='search'
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;