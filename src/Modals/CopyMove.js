/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import { token$ } from '../store';
import './Modals.css';
import { FaFolder, FaAngleRight, FaHome } from 'react-icons/fa';

const CopyMove = (props) => {
	const [ activeFolderChoosen ] = useState('');
	const [ redirectTo, updateRedirectTo ] = useState(null);
	const [ allRepo, updateAllRepo ] = useState([]);
	const [ choosenRepo, updateChoosenRepo ] = useState(null);
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
					return '' + copyNewParts.slice(0, idx + 1).join('/');
				});
			} else {
				paths[0] = 'Home';
				links = [ '' ];
				updatePathLinks(links);
			}
			updateParts(paths);
			//console.log(paths)
			//console.log('links', links);
			updatePathLinks(links);
			updateChoosenRepo(links[links.length - 1]);
		},
		[ props.location.pathname ]
	);

	useEffect(
		() => {
			let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
			console.log('copymove');
			if (choosenRepo !== null) {
				// console.log('HELLO', choosenRepo);
				dropbox.filesListFolder({ path: choosenRepo }).then((response) => {
					filterFolders(response.entries);
				});
				return;
			}
		},
		[ choosenRepo, filterFolders, props.onFilter ]
	);

	const chooseCurrentRepo = (item) => {
		updateChoosenRepo(item.path_lower);
		let newParts = item.path_lower.split('/');
		newParts[0] = 'Home';
		updateParts(newParts);
		let links;
		let copyNewParts = [ ...newParts ];
		copyNewParts[0] = '';
		links = copyNewParts.map((_, idx) => {
			return '' + copyNewParts.slice(0, idx + 1).join('/');
		});
		// console.log('links', links);
		updatePathLinks(links);
	};

	const choosePath = (item, idx) => {
		// console.log(item);
		updateChoosenRepo(item);
		let copyOfParts = [ ...parts ];
		let sliced = copyOfParts.slice(0, idx + 1);
		// console.log("sliced", sliced);
		updateParts(sliced);
	};

	const onSubmit = (fromPath, toPath) => {
		let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
		dropbox
			[props.method]({ from_path: fromPath, to_path: toPath })
			.then((response) => {
				//console.log('to', toPath);
				updateRedirectTo('/home' + pathLinks[pathLinks.length - 1]);
				props.onClose();
			})
			.catch((error) => {
				//console.log(error);
				updateErrorMsg(true);
			});
	};

	return ReactDOM.createPortal(
		<div className="modalContainer">
			{redirectTo && <Redirect to={redirectTo} />}
			<div className="modalBox copyMoveBox">
				<div className="modalHeadline">
					<p>
						{props.option} <span className="itemCopyMove">{props.doc.name}</span> to ...
					</p>
				</div>

				<nav className="repo-path">
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

				{errorMsg ? <span className="copyMove-error">This item is already in the folder!</span> : null}

				<div className="modalsButtonsContainer">
					<div onClick={props.onClose} className="modalButtons">
						Cancel
					</div>
					<button
						onClick={() => onSubmit(props.doc.path_lower, choosenRepo + '/' + props.doc.name)}
						className="modalButtons blueButtons"
					>
						{props.option}
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default CopyMove;
