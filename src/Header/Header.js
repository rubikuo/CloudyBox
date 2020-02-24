import React from 'react';
import logo from './logo.svg';
import { GoSearch } from 'react-icons/go';
import "./Header.css";

const Header = () => {
    return (
        <div className='headerContainer'>
            <img src={logo} alt="logo with clouds" className="logo-header" />

            <div className="headerPathSearchContainer">
                {/*each part of the path should be clickable*/}
                <nav>Home >> Folder </nav>

                <div className='headerSearchContainer' style={{ border: '1px solid #ddd' }}>
                    <GoSearch />
                    <input
                        style={{ border: 'none' }}
                        type='text'
                        placeholder='Search folder or file...'
                        name='search'
                        id='search'
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;