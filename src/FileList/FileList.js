/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaStar, FaRegStar, FaFile, FaFilePdf, FaBars} from 'react-icons/fa';
import './FileList.css';
import { convertDate } from './convertDate.js';
import { convertBytes } from './convertBytes.js';
import { toggleFavorite} from '../store';
import Remove from "../Modals/Remove";
import Rename from "../Modals/Rename";

const FileList = ({
	//doc,
	location,
	itemId,
	itemName,
	getLinkToFile,
	favorites,
	updateDocs,
	documents,
	tab,
}) => {
	const [ dropDown, updateDropDown ] = useState(false);
	const [ showRemoveModal, updateRemoveModal] =useState(false);
	const [ showRenameModal, updateRenameModal] =useState(false);

	const showDropDown = (e) => {
		updateDropDown(dropDown ? false : true);
	};

	const handleRemoveModal =()=>{
		updateRemoveModal(true);
	}

	const handleRenameModal =()=>{
		updateRenameModal(true);
	}


	let dropdownClass;
	let button;
	let doc;

	Array.from(documents).map((docData) => {
		doc = docData;
	});
	

	if (dropDown) {
		dropdownClass = 'dropDown active';
	} else {
		dropdownClass = 'dropDown';
	}

	const handleFav = (doc) => {
		toggleFavorite(doc);
	};
	if (tab === "name"){
		 return Array.from(documents).map((doc, index) => { 
			 if (doc) {
				let button;
			  
				if (favorites.find(x => x.id === doc.id)){
				  button = <FaStar size="20px"  style={{color: "rgb(250, 142, 0)", position:"relative", top: "3px"}}/>
				} else {
				  button = <FaRegStar size="20px"style={{position:"relative", top: "3px"}}/>
				}
		
				return (
					<li className="item" key={index}>
					<div className="itemSmlCtn">
					<span className="starIcon" onClick={() => handleFav(doc)}>
						<span>{button}</span>
					</span>
						{doc['.tag'] === 'file' ? (
							<>
								{doc.name.slice(doc.name.length - 3) === "pdf" ? (<FaFilePdf size="2rem" className="folderIcon"/>) : 
								(<FaFile size="2rem" className="folderIcon" />)}
								<a
									className="documentLink" //href will be a new key?
									onClick={() => getLinkToFile(doc.path_lower)}
								>
									{doc.name}
								</a>
							</>
						) : (
							<>
								<FaFolder size="2rem" className="folderIcon" />
								<Link to={"/home" + doc.path_lower} className="documentLink">{doc.name}</Link>
							</>
						)}
					</div>
					<p className="metaData">{doc['.tag'] === 'file' ? convertBytes(doc.size) : '--'}</p>
					<p className="modified">{convertDate(doc.client_modified)}</p>
					<div className="dropDownCtn">
						<button onClick={showDropDown} id={doc.id}>
							<FaBars size="14px" style={{position:"relative", top:"3px", color:"#737373"}}/>
						</button>
						<div className={dropdownClass}>
							<button
								className="deleteBtn"
								onClick={handleRemoveModal}
							>
								Delete
							</button>
							{showRemoveModal && <Remove updateRemoveModal={updateRemoveModal} location={location} itemId={itemId} itemName={itemName} doc={doc} updateDocs={updateDocs} documents={documents}  />}
	
							<button
								className="renameBtn"
								onClick={handleRenameModal}
							>
								Rename
							</button>
							{showRenameModal && <Rename doc={doc} updateRenameModal={updateRenameModal} documents={documents} updateDocs={updateDocs} />}
						</div>
					</div>
				</li>
				);
			}
		 }) 
		
	} else if (tab === "stared") {
		if (favorites.length === 0) {
			return <p>Folder is empty</p>
		} else {
				if(doc){
					if (favorites.find(x => x.id !== doc.id)){
						button = <FaStar size="20px"  style={{color: "rgb(250, 142, 0)", position:"relative", top: "3px"}}/>
						} else {
						button = <FaRegStar size="20px"style={{position:"relative", top: "3px"}}/>
						}
				}
			
		
		/* 	let button;
		  
			if (favorites.find(x => x.id === doc.id)){
			  button = <FaStar size="20px"  style={{color: "rgb(250, 142, 0)", position:"relative", top: "3px"}}/>
			} else {
			  button = <FaRegStar size="20px"style={{position:"relative", top: "3px"}}/>
			} */
			return favorites.map((docFav, index) => {
				return (<div key = {index}>
						<li className="item">
							<div className="itemSmlCtn">
							<span className="starIcon" onClick={() => handleFav(docFav)}>
								<span>{button}</span>
							</span>
								{docFav['.tag'] === 'file' ? (
									<>
										{docFav.name.slice(docFav.name.length - 3) === "pdf" ? (<FaFilePdf size="2rem" className="folderIcon"/>) : 
										(<FaFile size="2rem" className="folderIcon" />)}
										<a
											className="documentLink" //href will be a new key?
											onClick={() => getLinkToFile(docFav.path_lower)}
										>
											{docFav.name}
										</a>
									</>
								) : (
									<>
										<FaFolder size="2rem" className="folderIcon" />
										<Link to={"/home" + docFav.path_lower} className="documentLink">{docFav.name}</Link>
									</>
								)}
							</div>
							<p className="metaData">{docFav['.tag'] === 'file' ? convertBytes(docFav.size) : '--'}</p>
							<p className="modified">{convertDate(docFav.client_modified)}</p>
							<div className="dropDownCtn">
								<button onClick={showDropDown} id={docFav.id}>
									<FaBars size="14px" style={{position:"relative", top:"3px", color:"#737373"}}/>
								</button>
								<div className={dropdownClass}>
									<button
										className="deleteBtn"
										onClick={handleRemoveModal}
									>
										Delete
									</button>
									{showRemoveModal && <Remove updateRemoveModal={updateRemoveModal} location={location} itemId={itemId} itemName={itemName} doc={docFav} updateDocs={updateDocs} documents={documents}  />}

									<button
										className="renameBtn"
										onClick={handleRenameModal}
									>
										Rename
									</button>
									{showRenameModal && <Rename doc={docFav} updateRenameModal={updateRenameModal} documents={documents} updateDocs={updateDocs} />}
								</div>
							</div>
						</li>
					</div>
				);
			})
		}
	}

};

export default FileList;
