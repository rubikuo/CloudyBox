import React, {useState} from 'react';
import { Dropbox } from "dropbox";
import { FaFolder } from 'react-icons/fa';
import './Modals.css';

const Create = (props) => {

    const [pathName, updatePathName] = useState("");

    const cancelModal = () => {
        props.updateModals(false)
    }

    const onChangeInput = (e) => {
        console.log(e.target.value)
        updatePathName(e.target.value);
    }

    const createFolder = () => {
        console.log(pathName)
        var dbx = new Dropbox({ accessToken: props.localToken  });

        dbx.filesCreateFolderV2({path: "/"+pathName, autorename:true})
        .then(function(response) {
            console.log(response);
            const newDocuments = [...props.documents, response.metadata];
            props.updateDocs(newDocuments);
        })
        .catch(function(error) {
            console.error(error);
        }); 

        props.updateModals(false)
    }
   

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
                    onChange = {onChangeInput}
                    type="text"
                    name="createFolder"
                    id="createFolder"
                    placeholder="Folder Name"
                    style={{borderRadius: "0.3rem", padding: "2%", border: "1px solid #ddd"}}
                />

                <div className="modalsButtonsContainer">
                    <button onClick = {cancelModal} className="modalButtons">Cancel</button>
                    <button onClick = {createFolder} className="modalButtons blueButtons">Create</button>
                </div>

            </div>

        </div >
    )
}

export default Create;