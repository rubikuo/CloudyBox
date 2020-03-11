/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaStar, FaRegStar, FaFile, FaFilePdf, FaBars } from 'react-icons/fa';
import './FileList.css';
import { convertDate } from './convertDate.js';
import { convertBytes } from './convertBytes.js';
import { toggleFavorite } from '../store';
import { Dropbox } from 'dropbox';
import Remove from "../Modals/Remove";
import Rename from "../Modals/Rename";
import CopyMove from "../Modals/CopyMove";

const FileList = ({
	doc,
	location,
	getLinkToFile,
	favorites,
	localToken,
	updateDocs,
	documents,
}) => {
	const [dropDown, updateDropDown] = useState(false);
	const [showRemoveModal, updateRemoveModal] = useState(false);
	const [showRenameModal, updateRenameModal] = useState(false);
	const [showCopyModal, updateCopyModal] = useState(false);
	const [showMoveModal, updateMoveModal] = useState(false);
	const [thumbnailUrl, updateThumbnailUrl] = useState(null);

	
	const nodeDropdown = useRef();

	const showDropDown = useCallback(() => {
		updateDropDown(dropDown ? false : true);
	}, [dropDown]);

	const handleRemoveModal = () => {
		updateRemoveModal(true);
	}

	const handleRenameModal = () => {
		updateRenameModal(true);
	}


	const handleCopyModal = () => {
		updateCopyModal(true);
	}

	const handleMoveModal = () => {
		updateMoveModal(true);
	}

	const handleClickOutside = useCallback((e) => {
		if (nodeDropdown.current.contains(e.target)) {
			// inside click
			return;
		}
		// outside click 
		showDropDown(dropDown);
	}, [showDropDown, dropDown]);

	useEffect(() => {
		//this document.addEventListerner can only be used inside a useEffect
		if (dropDown) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropDown, handleClickOutside]);


	useEffect(() => {
		let dropbox = new Dropbox({ fetch: fetch, accessToken: localToken })
		console.log("TRY TO FETCH THUMBNAIL")
		if (doc.name.slice(doc.name.length - 3) === 'jpg' ||
			doc.name.slice(doc.name.length - 4) === 'jpeg' ||
			doc.name.slice(doc.name.length - 3) === 'png') {
			dropbox
				.filesGetThumbnail({
					path: doc.path_lower,
					size: 'w32h32'
				})
				.then(response => {
					if (response.fileBlob) {
						const url = URL.createObjectURL(response.fileBlob);
						updateThumbnailUrl(url);
					}
					console.log("RENDER from THUMBNAIL")
				})
				.catch(function (error) {
					console.log(error, 'Error by creating thumbnail');
				});
		}
	}, [doc.name, updateThumbnailUrl, doc.path_lower, localToken]);


	let dropdownClass;
	if (dropDown) {
		dropdownClass = 'dropDown active';
	} else {
		dropdownClass = 'dropDown';
	}

	const handleFav = (doc) => {
		toggleFavorite(doc);
	};


	if (doc) {

		return (
			<li className="item">
				<div className="itemSmlCtn">
					<span className="starIcon" onClick={() => handleFav(doc)}>
						{favorites.find(x => x.id === doc.id)
							? <span><FaStar size="20px" style={{ color: "rgb(250, 142, 0)", position: "relative", top: "3px" }} /></span>
							: <span><FaRegStar size="20px" style={{ position: "relative", top: "3px" }} /></span>}
					</span>
					{doc['.tag'] === 'file' ? (
						<>
							{
								doc.name.slice(doc.name.length - 3) === "pdf"
									? <FaFilePdf size="2rem" style={{color: "rgb(34, 130, 208)", marginRight:"10px"}}/>
									: thumbnailUrl
										? <img src={thumbnailUrl} alt='' style={{ marginRight: '10px' }} />
										: <FaFile size="2rem" className="folderIcon" />
							}
							<a
								className="documentLink"
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
				<div className="dropDownCtn" ref={nodeDropdown}>
					<button onClick={showDropDown} id={doc.id} >
						<FaBars size="14px" style={{ position: "relative", top: "3px", color: "#737373" }} />
					</button>
					<div className={dropdownClass}>
						<button
							className="deleteBtn"
							onClick={handleRemoveModal}
						>
							Delete
							</button>
						{showRemoveModal && <Remove updateRemoveModal={updateRemoveModal} location={location} doc={doc} updateDocs={updateDocs} documents={documents} />}

						<button
							className="renameBtn"
							onClick={handleRenameModal}
						>
							Rename
						</button>
						{showRenameModal && <Rename doc={doc} updateRenameModal={updateRenameModal} documents={documents} updateDocs={updateDocs} location={location} />}
						<button
							className="copyBtn"
							onClick={handleCopyModal}
						>
							Copy
						</button>
						{showCopyModal && <CopyMove method="filesCopyV2" option="Copy" doc={doc} onClose={(e) => updateCopyModal(false)}  getLinkToFile={getLinkToFile} location={location} />}
						<button
							className="moveBtn"
							onClick={handleMoveModal}
						>
							Move
						</button>
						{showMoveModal && <CopyMove method="filesMoveV2" option="Move" doc={doc} onClose={(e) => updateMoveModal()} getLinkToFile={getLinkToFile} location={location} />}
					</div>
				</div>
			</li>
		);
	}
};

export default FileList;
