import React from 'react';
import { MdDelete } from 'react-icons/md';
import { token$ } from '../store';
import { Dropbox } from 'dropbox';
import ReactDOM from 'react-dom';
import './Modals.css';

const Remove = (props) => {
	const handleRemoveModal = () => {
		props.updateRemoveModal(false);
	};
	const deleteItem = (doc) => {
		let dropbox = new Dropbox({ fetch: fetch, accessToken: token$.value });
		dropbox
			.filesDeleteV2({ path: doc.path_lower })
			.then((response) => {
				console.log('deleteResponse', response);
				const newDocuments = props.documents.filter((x) => x.id !== response.metadata.id);
				props.updateDocs(newDocuments); 
				console.log("RENDER from REMOVE")
			})
			.catch((err) => {
				console.log(err);
			});

		handleRemoveModal();
		return;
	};

	return ReactDOM.createPortal(
		<div className="modalContainer">
			{/*same className for the modalContainer here and Create.js, same button classNames as well */}
			<div className="modalBox">
				<div className="modalHeadline">
					<MdDelete
						style={{
							position: 'relative',
							top: '0px',
							color: '#1293D6',
							marginRight: '3px'
						}}
					/>
					<h5> Delete file?</h5>
				</div>

				<p>
					Are you sure you want to delete
					<span className="itemDelete"> {props.doc.name} </span>
					from your CloudyBox?
				</p>

				<div className="modalsButtonsContainer">
					<button onClick={handleRemoveModal} className="modalButtons">
						Cancel
					</button>

					<button
						onClick={() => {
							deleteItem(props.doc);
						}}
						className="modalButtons blueButtons"
					>
						Delete
					</button>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Remove;
