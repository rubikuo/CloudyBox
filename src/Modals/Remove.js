import React from 'react';
import { MdDelete } from 'react-icons/md';
import './Modals.css';

const Remove = (props) => {
    return (
        
        <div className="modalContainer">
            {/*same className for the modalContainer here and Create.js, same button classNames as well */}
            <div className="modalHeadline">
                <span><MdDelete /></span>
                <span><h5> Delete file?</h5></span>
            </div>
            
            <p>Are you sure you want to delete FILENAME from your CloudyBox?</p>
            
            <div>
                <button type="submit" className="modalButtons">Cancel</button>
                <button type="submit" className="modalButtons blueButton">Delete</button>
            </div>
        </div>
    )
}

export default Remove;