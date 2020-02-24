import React from 'react';
import { FaFolder } from 'react-icons/fa';
import './Modals.css';

const Create = (props) => {
    return (
        <div className="modalContainer"> 
        {/*same className for the modalContainer, 
        modalHeadline, modalButtons and blueButton here 
        and in Remove.js, same classNames for the buttons as well */}
            <div className="modalHeadline">
                <span><FaFolder /></span>
                <span><h3> Create Folder</h3></span>
            </div>

            <label htmlFor="createFolder">Name</label>
            <input
                type="text"
                name="createFolder"
                id="createFolder"
                placeholder="Folder Name"
            />
            <div>
                <button type="submit" className="modalButtons">Cancel</button>
                <button type="submit" className="modalButtons blueButton">Create</button>
            </div>
        </div >
    )
}

export default Create;