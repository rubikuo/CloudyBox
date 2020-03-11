import React, { useState } from 'react';
import { Dropbox } from 'dropbox';
import { FaFolder } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import './Modals.css';

const Create = (props) => {
	const [pathName, updatePathName] = useState('');
	//const [redirectTo, updateRedirectTo] = useState(null);
	//console.log('location propname', props.location.pathname);

	const handleCreateModal = (status) => {
		//console.log(status)
		props.handleCreateModal(status)
	}

	const onChangeInput = (e) => {
		updatePathName(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		//console.log(pathName);
		const root = props.location.pathname.slice(5);

		let dropbox = new Dropbox({ fetch: fetch, accessToken: props.localToken });
		dropbox
			.filesCreateFolderV2({ path: root + '/' + pathName, autorename: true })
			.then(function (response) {
				console.log(response)
				console.log("RENDER from CREATE")
				let copyData = [...props.documents];
				let newData = {
					".tag": "folder",
					...response.metadata,
				}
				const newDocuments = [...copyData, newData];
				//console.log(newDocuments);
				props.updateDocs(newDocuments);
		
			})
			.catch(function (error) {
				console.error(error);
			});
		handleCreateModal(false);

	};

	return ReactDOM.createPortal(
		<div className="modalContainer">
			{/*same className for the modalContainer, 
        modalHeadline, modalButtons and blueButton here 
        and in Remove.js, same classNames for the buttons as well */}
			<div className="modalBox">
				<div className="modalHeadline">
					<FaFolder style={{ position: 'relative', top: '0px', color: '#1293D6', marginRight: '3px' }} />
					<h5> Create Folder</h5>
				</div>

				<label
					htmlFor="createFolder"
					style={{ textAlign: 'left', fontSize: '12px', marginBottom: '3px', marginTop: '10px' }}
				>
					Name
				</label>
				<form onSubmit={onSubmit}>
					<input
						onChange={onChangeInput}
						type="text"
						name="createFolder"
						id="createFolder"
						placeholder="Folder Name"
						style={{ borderRadius: '0.3rem', padding: '2%', border: '1px solid #ddd' }}
					/>
					<div className="modalsButtonsContainer">
						<div onClick={() => handleCreateModal(false)} className="modalButtons">
							Cancel
						</div>
						<button type="submit" className="modalButtons blueButtons">
							Create
						</button>
					</div>
				</form>
			</div>
		</div>,
		document.body
	);
};

export default Create;
