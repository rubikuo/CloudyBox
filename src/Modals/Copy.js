/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import { token$ } from '../store';
import './Modals.css';
import { FaFolder, FaCopy} from 'react-icons/fa';

const Copy = (props) => {
	const [ newPath, updateNewPath ] = useState('');
	const handleCreateModal = (status) => {
		props.updateCopyModal(status);
	};

	const getNewPath = (item) => {
		console.log(item.path_lower);
		updateNewPath(item.path_lower);
	};

	const copyFile = (fromPath, toPath) => {
		let dropbox = new Dropbox({ fetch:fetch, accessToken: token$.value });
		dropbox
			.filesCopyV2({ from_path: fromPath, to_path: toPath })
			.then((response) => {
				console.log(response);
				window.location.href = 'home' + newPath;
			})
			.catch((error) => {
				console.log(error);
			});
		handleCreateModal();
	};

	return ReactDOM.createPortal(
		<div className="modalContainer">
			<div className="modalBox copyBox">
				<div className="modalHeadline">
					<FaCopy
						style={{
							position: 'relative',
							top: '0px',
							color: '#1293D6',
							marginRight: '3px'
						}}
					/>
					<h5>Copy File or Folder</h5>
				</div>
				<p>
					Copy <span className="itemCopy">{props.doc.name}</span> to ...
				</p>
				<span>CloudyBox Folder</span>
				<div className="relocateCtn">
					{props.folders.map((folder) => {
						return (
							<div key={folder.id} className="folderCtn" onClick={() => getNewPath(folder)}>
								<FaFolder size="2rem" style={{marginLeft: "20px"}} className="folderIcon" />
								<p className="documentLink">
									{folder.name}
								</p>
							</div>
						);
					})}
				</div>

				<div className="modalsButtonsContainer">
					<div onClick={() => handleCreateModal(false)} className="modalButtons">
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
