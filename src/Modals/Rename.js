import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import './Modals.css';
import { Dropbox } from 'dropbox';
import { token$ } from '../store';
import ReactDOM from 'react-dom';

const Rename = (props) => {
	const [ rename, updateRename ] = useState(props.doc.name);
	const [ errorMsg, updateErrorMsg ] = useState('');

	const handleRenameModal = () => {
		props.updateRenameModal(false);
	};

	const handleRename = (e) => {
		updateRename(e.target.value);
	};

	const submitRename = (fromPath, toPath) => {
		if (toPath === '') return;
		let formatedToPath = '/' + toPath;
		let dropbox = new Dropbox({ accessToken: token$.value });
		dropbox
			.filesMoveV2({ from_path: fromPath, to_path: formatedToPath })
			.then((response) => {
				console.log(response);
				let copyDocument = [ ...props.documents ];
				let replacedIndex = copyDocument.findIndex((doc) => doc.id === response.metadata.id);
				console.log(replacedIndex);
				copyDocument[replacedIndex] = response.metadata;
				props.updateDocs(copyDocument);
			})
			.catch((err) => {
				console.log(err.response.status);
				if (err.response.status === 409) {
					updateErrorMsg("can't have same name on different file");
				}
			});
		handleRenameModal();
	};

	console.log('rename', rename);

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
					onSubmit={() => {
						submitRename(props.doc.path_lower, rename);
					}}
				>
					<input
						type="text"
						value={rename}
						onChange={handleRename}
						style={{ borderRadius: '0.3rem', padding: '2%', border: '1px solid #ddd' }}
					/>
					{errorMsg ? <span>hello</span> : null}
					<div className="modalsButtonsContainer">
						<button onClick={handleRenameModal} className="modalButtons">
							Cancel
						</button>

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
