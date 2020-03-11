import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import './Modals.css';
import { Dropbox } from 'dropbox';
import { token$ } from '../store';
import ReactDOM from 'react-dom';

const Rename = (props) => {
	const [ rename, updateRename ] = useState(props.doc.name);
	const [ errorMsg, updateErrorMsg ] = useState(false);

	const handleRenameModal = () => {
		props.updateRenameModal(false);
	};

	const handleRename = (e) => {
		updateRename(e.target.value);
	};

	const submitRename = (fromPath, toPath, e) => {
		e.preventDefault();
		if (toPath === '') return;
		let formatedToPath = props.location.pathname.slice(5) + '/' + toPath;
		let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
		dropbox
			.filesMoveV2({ from_path: fromPath, to_path: formatedToPath })
			.then((response) => {
				// console.log(response);
				console.log("RENDER from RENAME")
				let copyDocument = [ ...props.documents ];
				let replacedIndex = copyDocument.findIndex((doc) => doc.id === response.metadata.id);
				// console.log(replacedIndex);
				copyDocument[replacedIndex] = response.metadata;
				props.updateDocs(copyDocument);
				handleRenameModal();
			})
			.catch((err) => {
				console.log(err.response.status);
				updateErrorMsg(true);
			});
	};

	return ReactDOM.createPortal(
		<div className="modalContainer">
			<div className="modalBox">
				<div className="modalHeadline">
					<FaEdit
						style={{
							position: 'relative',
							top: '0px',
							color: '#1293D6',
							marginRight: '3px'
						}}
					/>
					<h5> Rename </h5>
				</div>
				<form
					onSubmit={(e) => {
						submitRename(props.doc.path_lower, rename, e);
					}}
				>
					<input
						type="text"
						value={rename}
						onChange={handleRename}
						style={{ borderRadius: '0.3rem', padding: '2%', border: '1px solid #ddd', marginBottom: '5px' }}
					/>
					{errorMsg ? (
						<span className="rename-error">This item name is already used, please choose another one!</span>
					) : null}
					<div className="modalsButtonsContainer">
						<div onClick={handleRenameModal} className="modalButtons">
							Cancel
						</div>
						<button type="submit" className="modalButtons blueButtons">
							Rename
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.body
	);
};

export default Rename;
