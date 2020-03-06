/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { Redirect, Link } from "react-router-dom";
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import { token$ } from '../store';
import './Modals.css';
import { FaFolder, FaAngleRight, FaHome } from 'react-icons/fa';

const Copy = (props) => {
	const [newPath, updateNewPath] = useState('');
	const [activeFolderChoosen, updateFolderChoosen] = useState("");
	const [redirectTo, updateRedirectTo] = useState(null);
	const [allRepo, updateAllRepo] = useState([])
	const [choosenRepo, updateChoosenRepo] = useState("");
	const [childPath, updateChildPath] = useState("");
	const [childFolderContent, updateChildFolderContent ] = useState([]);

	const parts = props.location.pathname.substring(6).split("/");
	let links;
	if (parts[0] !== "") {
		links = parts.map((_, idx) => {
			// console.log("idx", parts.slice(0, idx + 1))
			return "/" + parts.slice(0, idx + 1).join("/");
		});
		parts.unshift("Home");
		links.unshift("");
	} else {
		parts[0] = "Home";
		links = [""];
	}

	const filterFolders = useCallback((docs) => {
		let filteredFolder = docs.filter(item => item[".tag"] === "folder" && item.id !== props.doc.id);
		updateAllRepo(filteredFolder)
	},[props.doc.id])
	 
	
	const searchChildItem = (folderName) => {
		let newChildPath = props.location.pathname.slice(5) + folderName;
		// updateChildPath(newChildPath);
		console.log("childPath")
	}


	useEffect(() => {
		console.log(choosenRepo);
		let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
		if (choosenRepo !== null) {
			dropbox
				.filesListFolder({ path: choosenRepo })
				.then((response) => {
					console.log(response);
					console.log('resonse.entries', response.entries);
					filterFolders(response.entries); // update in state
	
				});
			}
	    if (childPath){
				dropbox
				.filesListFolder({path: childPath })
				.then((response)=>{
					console.log("child", response.entries)
					updateChildFolderContent(response.entries)
				})
			}

	}, [choosenRepo, filterFolders])

	const chooseCurrentRepo = (repo) => {
		console.log("repo", repo)
		updateChoosenRepo(repo);
	}


	const handleCopyModal = (status) => {
		props.updateCopyModal(status);
	};

	const getNewPath = (item) => {
		console.log(item.path_lower);
		updateNewPath(item.path_lower);
		updateFolderChoosen(item);

	};

	const copyFile = (fromPath, toPath) => {
		let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
		dropbox
			.filesCopyV2({ from_path: fromPath, to_path: toPath })
			.then((response) => {
				// console.log(response);
				updateRedirectTo('/home' + newPath);
				handleCopyModal();
			})
			.catch((error) => {
				console.log(error);
				
			});
	};



	return ReactDOM.createPortal(
		<div className="modalContainer">
			{redirectTo && <Redirect to={redirectTo} />}
			<div className="modalBox copyBox">
				<div className="modalHeadline">
					<p>
						Copy <span className="itemCopy">{props.doc.name}</span> to ...
</p>
				</div>
				{choosenRepo === "home" ?
					<>
						<nav>
							{parts.map((part, idx) => {
								return <div className="paths" key={idx}>
									{idx === 0 ? <span><FaHome style={{ position: "relative", top: "2px", marginRight: "5px" }} />Home</span> : null}
								</div>
							})} </nav>
						<div className="relocateCtn">
							{allRepo.map((folder) => {
								// searchChildItem(folder.path_lower)
								let activeClass;
								if (activeFolderChoosen === folder) {
									activeClass = "folderCtn active"
								} else {
									activeClass = "folderCtn"
								}

								return (
									<div key={folder.id} className={activeClass} onClick={() => getNewPath(folder)}>
										<FaFolder size="2rem" className="folderIcon" />
										<p className="documentLink">
											{folder.path_display}
										</p>
									</div>
								);
							})}
						</div>
					</> :
					<>
						<nav>
							{parts.map((part, idx) => {
								return <div className="paths" key={idx}>
									<button onClick={() => chooseCurrentRepo(links[idx])} className="pathLink">{part}</button>
									{idx !== parts.length - 1 ? <span className="divider"><FaAngleRight style={{ position: 'relative', top: '4px' }} /></span> : null}
								</div>
							})} </nav>
						<div className="relocateCtn">
							{allRepo.map((folder, idx) => {
								let activeClass;
								if (activeFolderChoosen === folder) {
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
					</>
				}

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
