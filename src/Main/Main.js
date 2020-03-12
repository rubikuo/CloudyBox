import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import FileList from '../FileList/FileList';
import './Main.css';
import { FaStar } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { Dropbox } from 'dropbox';
import { removeFavoriteByPath } from '../store';

const Main = ({
  localToken,
  documents,
  updateDocs,
  favorites,
  updateFavorite,
  updateRename,
  location,
  search,
}) => {
  const [tab, updateTab] = useState('name');
  const [errorStatus, updateErrorStatus] = useState(false);

	const loadFiles = useCallback(
		() => {
			// console.log('location Name', location.pathname);

			let dropbox = new Dropbox({ fetch: fetch, accessToken: localToken });
			//let dropbox = new Dropbox({ accessToken: localToken });

			if (location.pathname === '/home') {
				dropbox.filesListFolder({ path: '' }).then((response) => {
					console.log('resonse.entries', response.cursor);
					updateDocs(response.entries); // update in state
					updateErrorStatus(false);
					updateTab('name');
				});
			} else {
				//console.log('this is not a home, link is', location.pathname);
				let newPath = location.pathname.slice(5);
				console.log(newPath);
				dropbox
					.filesListFolder({ path: newPath })
					.then((response) => {
						updateDocs(response.entries);
						updateErrorStatus(false);
						updateTab('name');
					})
					.catch((response) => {
						console.log(response.error.error_summary);
						removeFavoriteByPath(newPath);
						updateErrorStatus(true);
					});
			}
		},
		[ location.pathname, localToken, updateDocs ]
	);

	useEffect(
		() => {
			loadFiles();
		},
		[ loadFiles ]
	);

	const longpoll = useCallback(
		() => {
			let dbx = new Dropbox({ fetch: fetch, accessToken: localToken });

			let originalPath = location.pathname;

			dbx
				.filesListFolderGetLatestCursor({
					path: '',
					recursive: true,
					include_media_info: false,
					include_deleted: false,
					include_has_explicit_shared_members: false
				})
				.then((res) => {
					updateLongPoll(res.cursor);
				})
				.catch((err) => {
					console.log(err);
				});

			const updateLongPoll = (cursor) => {
				dbx
					.filesListFolderLongpoll({ cursor: cursor, timeout: 30 })
					.then((response) => {
						// console.log('resonse.entries', response);
						if (response.changes) {
							//console.log('TEST', originalPath, window.location.pathname);
							if (originalPath === window.location.pathname) {
								loadFiles();
							}
						} else {
							return;
						}

						longpoll();
					})
					.catch((err) => {
						console.log(err);
					});
			};
		},
		[ loadFiles, localToken, location.pathname ]
	);

	useEffect(
		() => {
			longpoll();
			console.log('long');
		},
		[ longpoll ]
	);

	const showTab = (tabName) => {
		updateTab(tabName);
	};

	let tabActiveStyle = {
		backgroundColor: '#F7F7F7',
		color: 'rgb(34, 138, 208)'
  };
  
	const getLinkToFile = (path) => {
		// console.log(path);
		let dropbox = new Dropbox({ accessToken: localToken });
		dropbox
			.filesGetTemporaryLink({ path: path })
			.then((response) => {
				window.location.href = response.link;
			})
			.catch((error) => {
				console.error(error, 'Error by downloading file');
			});
	};

	if (errorStatus) {
		return ReactDOM.createPortal(
			<div className="modalContainer">
				<div className="modalBox">
					<div className="modalHeadline">
						<MdError
							size="25px"
							style={{ position: 'relative', top: '-3px', color: 'red', marginRight: '3px' }}
						/>
						<h5>Error!</h5>
					</div>
					<div className="errorMessages">
						<p>The requested folder does not exist or has already been removed.</p>
					</div>
					<Link to="/home">Back to Home</Link>
				</div>
			</div>,
			document.body
		);
	}

	let arrayPrint;

	if (tab === 'name') {
		arrayPrint = documents
			.filter((doc) => {
				if (doc.name.toLowerCase().includes(search.toLowerCase())) {
					return (
						<FileList
							key={doc.id}
							doc={doc}
							getLinkToFile={getLinkToFile}
							favorites={favorites}
							updateFavorite={updateFavorite}
							updateRename={updateRename}
							location={location}
							documents={documents}
							updateDocs={updateDocs}
							localToken={localToken}
						/>
					);
				} else {
					return null;
				}
			})
			.map((doc) => {
				return (
					<FileList
						key={doc.id}
						doc={doc}
						getLinkToFile={getLinkToFile}
						favorites={favorites}
						updateFavorite={updateFavorite}
						updateRename={updateRename}
						location={location}
						documents={documents}
						updateDocs={updateDocs}
						localToken={localToken}
					/>
				);
			});
	} else if (tab === 'stared') {
		arrayPrint = favorites
			.filter((docFav) => {
				if (docFav.name.toLowerCase().includes(search.toLowerCase())) {
					return (
						<FileList
							key={docFav.id}
							doc={docFav}
							getLinkToFile={getLinkToFile}
							favorites={favorites}
							updateFavorite={updateFavorite}
							updateRename={updateRename}
							location={location}
							documents={documents}
							updateDocs={updateDocs}
							localToken={localToken}
						/>
					);
				} else {
					return null;
				}
			})
			.map((docFav) => {
				return (
					<FileList
						key={docFav.id}
						doc={docFav}
						getLinkToFile={getLinkToFile}
						favorites={favorites}
						updateFavorite={updateFavorite}
						updateRename={updateRename}
						location={location}
						documents={documents}
						updateDocs={updateDocs}
						localToken={localToken}
					/>
				);
			});
	}

	return (
		<main>
			<div className="titleBar">
				<div className="tabsCtn">
					<div className="tabs" style={tab === 'name' ? tabActiveStyle : {}} onClick={() => showTab('name')}>
						<p>All Files</p>
					</div>
					<div
						className="tabs"
						style={tab === 'stared' ? tabActiveStyle : {}}
						onClick={() => showTab('stared')}
					>
						<p>Starred</p>
						<FaStar size="18px" style={{ position: 'relative', top: '-1px' }} />
					</div>
				</div>
				<div className="tagCtn">
					<p className="metaTag">Size</p>
					<p className="modifiedTag">Modified</p>
				</div>
			</div>
			<ul>{arrayPrint}</ul>
		</main>
	);
};

export default Main;
