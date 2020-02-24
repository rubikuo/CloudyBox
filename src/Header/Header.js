import React from 'react';
import { GoSearch } from 'react-icons/go';
import "./Header.css";

const Header = () => {
    return (
        <div className='headerContainer'>
            <img src="" alt="" className="logo-header"/>
            
            {/*each part of the path should be clickable*/}
            <nav>Home >> Folder >> example.pdf</nav>
            
            <div className='headerSearchContainer' style={{border: '1px solid #ddd'}}>
                <GoSearch />
                <input
                    style={{border: 'none'}}
                    type='text'
                    placeholder='Search folder or file...'
                    name='search'
                    id='search'
                />
            </div>

        </div>
    )
}

export default Header;