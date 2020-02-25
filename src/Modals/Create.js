import React from 'react';
import { FaFolder } from 'react-icons/fa';
import './Modals.css';

const Create = (props) => {
    return (
        <div className="modalContainer">
            {/*same className for the modalContainer, 
        modalHeadline, modalButtons and blueButton here 
        and in Remove.js, same classNames for the buttons as well */}
            
            <div className="modalBox">
                <div className="modalHeadline">
                    <FaFolder style={{position: "relative", top: "0px", color:"#1293D6", marginRight: "3px"}}/>
                    <h5> Create Folder</h5>
                </div>

                <label htmlFor="createFolder" style={{textAlign: "left", fontSize: "12px", marginBottom: "3px", marginTop: "10px"}}>Name</label>
                <input
                    type="text"
                    name="createFolder"
                    id="createFolder"
                    placeholder="Folder Name"
                    style={{borderRadius: "0.3rem", padding: "2%", border: "1px solid #ddd"}}
                />

                <div className="modalsButtonsContainer">
                    <button type="submit" className="modalButtons">Cancel</button>
                    <button type="submit" className="modalButtons blueButtons">Create</button>
                </div>

            </div>

        </div >
    )
}

export default Create;