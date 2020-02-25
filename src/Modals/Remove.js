import React from 'react';
import { MdDelete } from 'react-icons/md';
import './Modals.css';

const Remove = (props) => {
    return (

        <div className="modalContainer">
            {/*same className for the modalContainer here and Create.js, same button classNames as well */}
            <div className="modalBox">
                <div className="modalHeadline">
                    <MdDelete style={{position: "relative", top: "0px", color:"#1293D6", marginRight: "3px"}}/>
                    <h5> Delete file?</h5>
                </div>

                <p>Are you sure you want to delete 
                    <span> FILENAME </span> 
                    from your CloudyBox?
                </p>

                <div className="modalsButtonsContainer">
                    <button type="submit"
                        className="modalButtons">Cancel</button>
                    <button type="submit"
                        className="modalButtons blueButtons">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Remove;