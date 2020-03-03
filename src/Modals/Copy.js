/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import { token$ } from '../store';
import { Link } from 'react-router-dom';
import './Modals.css';
import { FaFolder} from 'react-icons/fa';

const Copy = (props) => {
	const [newPath, updateNewPath]=useState("");
    
    const handleCreateModal = (status)=>{
        props.updateCopyModal(status)
	}
	
	const getNewPath = (item) =>{
		console.log(props.doc)
		console.log(item)
		updateNewPath(item.path_lower);
        
	}

	const copyFile = (fromPath, toPath) => {
	
		let dropbox = new Dropbox({ accessToken: token$.value });
		dropbox
			.filesCopyV2({ from_path: fromPath, to_path: toPath })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
    };
    
 

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
                     <div key={folder.id} className="folderCtn">
                         	<FaFolder size="2rem" className="folderIcon" />
                             <p onClick={()=>getNewPath(folder)} className="documentLink">{folder.name}</p>
                     </div>)
                    
                 })}
               </div>
          
               <div className="modalsButtonsContainer">
						<div onClick={()=>handleCreateModal(false)} className="modalButtons">
							Cancel
						</div>
						<button onClick={()=>copyFile(props.doc.path_lower, newPath)} className="modalButtons blueButtons">
							Copy
						</button>
					</div>
			</div>
		</div>,
		document.body
	);
};

export default Copy;
