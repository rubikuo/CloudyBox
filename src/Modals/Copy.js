/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import { token$ } from '../store';
import { Link } from 'react-router-dom';
import './Modals.css';
import { FaFolder} from 'react-icons/fa';

const Copy = (props) => {
    
    const handleCreateModal = (status)=>{
        props.updateCopyModal(status)
    }

	const copyFile = (fromPath, toPath) => {
		let formatedToPath = '/' + toPath;
		let dropbox = new Dropbox({ accessToken: token$.value });
		dropbox
			.filesCopyV2({ from_path: fromPath, to_path: formatedToPath })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
    };
    
    // const filterFolder =()=>{
    //     let documents = props.documents;
    //     let filteredFolder = documents.filter(doc=> doc[".tag"]==="folder");
    //     console.log(filteredFolder);
    //     updateFolders(filteredFolder)

    // }

	return ReactDOM.createPortal(
		<div className="modalContainer">
			<div className="modalBox copyBox">
				<div className="modalHeadline">
                    <p>Copy <span className="itemCopy">{props.doc.name}</span> to ...</p>

               </div>
               <span>Dropbox</span>
               <div className="relocateCtn">
                 {props.folders.map((folder)=>{
                     return(
                     <div key={folder.id}>
                         	<FaFolder size="2rem" className="folderIcon" />
                             <Link to={"/home" + folder.path_lower} className="documentLink">{folder.name}</Link>
                    </div>)
                    
                 })}
               </div>
          
               <div className="modalsButtonsContainer">
						<div onClick={()=>handleCreateModal(false)} className="modalButtons">
							Cancel
						</div>
						<button onClick={copyFile} className="modalButtons blueButtons">
							Copy
						</button>
					</div>
			</div>
		</div>,
		document.body
	);
};

export default Copy;
