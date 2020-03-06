/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import { token$ } from '../store';
import { Dropbox } from 'dropbox';
import './Modals.css';
import { FaFolder } from 'react-icons/fa';

const Copy = (props) => {
	const [ newPath, updateNewPath ] = useState('');
	const [ activeFolderChoosen, updateFolderChoosen] = useState("");
	const [redirectTo, updateRedirectTo] = useState(null);
	const [ allRepo, updateAllRepo ] =useState([])

	const getAllRepositories =()=>{
		let dropbox = new Dropbox({ fetch:fetch, accessToken: token$.value });
		if (location.pathname === '/home') {

		}
        
	}

	useEffect(() => {
		return () => {
			cleanup
		};
	}, [input])

	const handleCopyModal = (status) => {
		props.updateCopyModal(status);
	};

	const getNewPath = (item) => {
		console.log(item.path_lower);
		updateNewPath(item.path_lower);
		updateFolderChoosen(item);

	};

	const copyFile = (fromPath, toPath) => {
		let dropbox = new Dropbox({ fetch:fetch, accessToken: token$.value });
		dropbox
			.filesCopyV2({ from_path: fromPath, to_path: toPath })
			.then((response) => {
				console.log(response);
				updateRedirectTo('/home' + newPath);
				// window.location.href = 'home' + newPath;
				handleCopyModal();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return ReactDOM.createPortal(

		<div className="modalContainer">
			{ redirectTo && <Redirect to={redirectTo} />}
			<div className="modalBox copyBox">
				<div className="modalHeadline">
					<p>
						Copy <span className="itemCopy">{props.doc.name}</span> to ...
					</p>
				</div>
				<span>Dropbox</span>
				<div className="relocateCtn">
					{props.folders.map((folder) => {
						let activeClass;
						if(activeFolderChoosen === folder){
						activeClass = "folderCtn active"
						} else {
						activeClass = "folderCtn"
						}
						return (
						<div key={folder.id} className={activeClass} onClick={() => getNewPath(folder)}>
								<FaFolder size="2rem" className="folderIcon" />
								<p className="documentLink">
									{folder.name}
								</p>
							</div>
						);
					})}
				</div>

				<div className="modalsButtonsContainer">
					<div onClick={() => handleCopyModal(false)} className="modalButtons">
						Cancel
					</div>
					<button
						onClick={() => copyFile(props.doc.path_lower, newPath + '/' + props.doc.name)}
						className="modalButtons blueButtons"
					>
						Copy
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Copy;
