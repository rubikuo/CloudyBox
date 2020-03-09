/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import { token$ } from '../store';
import './Modals.css';
import { FaFolder, FaAngleRight, FaHome } from 'react-icons/fa';

const Copy = (props) => {
	const [ activeFolderChoosen, updateFolderChoosen ] = useState('');
	const [ redirectTo, updateRedirectTo ] = useState(null);
	const [ allRepo, updateAllRepo ] = useState([]);
	const [ choosenRepo, updateChoosenRepo ] = useState('');
	const [ parts, updateParts ] = useState([]);
	const [ pathLinks, updatePathLinks ] = useState([]);
	const [ errorMsg, updateErrorMsg ] = useState(false);

	const filterFolders = useCallback(
		(docs) => {
			let filteredFolder = docs.filter((item) => item['.tag'] === 'folder' && item.id !== props.doc.id);
			updateAllRepo(filteredFolder);
		},
		[ props.doc.id ]
	);

	useEffect(
		() => {
			let paths = props.location.pathname.substring(6).split('/');
			let links;
			if (paths[0] !== '') {
				paths.unshift('Home');
				let copyNewParts = [ ...paths ];
				copyNewParts[0] = '';
				links = copyNewParts.map((_, idx) => {
					// console.log('idx', copyNewParts.slice(0, idx + 1));
					return '' + copyNewParts.slice(0, idx + 1).join('/');
				});
				console.log('links', links);
			} else {
				paths[0] = 'Home';
				links =[""];
				updatePathLinks(links)
			}
			updateParts(paths);
			console.log(paths)
			updatePathLinks(links)
			updateChoosenRepo(links[links.length-1]);
		},
		[ props.location.pathname]
	);

	useEffect(
		() => {
			let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
			if (choosenRepo !== null) {
				dropbox.filesListFolder({ path: choosenRepo }).then((response) => {
					console.log('choosen', choosenRepo);
					filterFolders(response.entries); // update in state
				});
				return;
			}
		},
		[ choosenRepo, filterFolders ]
	);

	const chooseCurrentRepo = (item) => {
		updateChoosenRepo(item.path_lower);
		let newParts = [ ...parts, item.name ];
		updateParts(newParts);
		let links;
		let copyNewParts = [ ...newParts ];
		copyNewParts[0] = '';
		links = copyNewParts.map((_, idx) => {
			// console.log('idx', copyNewParts.slice(0, idx + 1));
			return '' + copyNewParts.slice(0, idx + 1).join('/');
		});
		console.log('links', links);
		updatePathLinks(links);
	};

	const choosePath = (item, idx) => {
		console.log(item);
		updateChoosenRepo(item);
		let copyOfParts = [ ...parts ];
		let sliced = copyOfParts.slice(0, idx + 1);
		console.log(sliced);
		updateParts(sliced);
	};

	const handleCopyModal = (status) => {
		props.updateCopyModal(status);
	};

	const copyFile = (fromPath, toPath) => {
		let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
		dropbox
			.filesCopyV2({ from_path: fromPath, to_path: toPath })
			.then((response) => {
				console.log('to', toPath);
				updateRedirectTo('/home' + pathLinks[pathLinks.length - 1]);
				handleCopyModal();
			})
			.catch((error) => {
				console.log(error);
				updateErrorMsg(true);
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

				<nav className="copy-path">
					{parts.map((part, idx) => {
						return (
							<div className="paths" key={idx}>
								{idx === 0 ? (
									<span>
										<FaHome style={{ position: 'relative', top: '2px', marginRight: '5px' }} />
									</span>
								) : null}
								<button onClick={() => choosePath(pathLinks[idx], idx)} className="pathLink">
									{part}
								</button>
								{idx !== parts.length - 1 ? (
									<span className="divider">
										<FaAngleRight style={{ position: 'relative', top: '4px' }} />
									</span>
								) : null}
							</div>
						);
					})}
				</nav>

				<div className="relocateCtn">
					{allRepo.map((folder, idx) => {
						let activeClass;
						if (activeFolderChoosen === folder) {
							activeClass = 'folderCtn active';
						} else {
							activeClass = 'folderCtn';
						}
						return (
							<div key={folder.id} className={activeClass} onClick={() => chooseCurrentRepo(folder)}>
								<FaFolder size="2rem" className="folderIcon" />
								<p className="documentLink">{folder.name}</p>
							</div>
						);
					})}
				</div>

				{errorMsg ? <span className="copy-error">This item is already in the folder!</span> : null}

				<div className="modalsButtonsContainer">
					<div onClick={() => handleCopyModal(false)} className="modalButtons">
						Cancel
					</div>
					<button
						onClick={() => copyFile(props.doc.path_lower, choosenRepo + '/' + props.doc.name)}
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
