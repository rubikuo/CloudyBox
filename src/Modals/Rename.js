import React,{useState} from 'react';
import { FaEdit } from 'react-icons/fa';
import './Modals.css';
import { Dropbox } from 'dropbox';
import { token$} from "../store";

const Rename = (props) => {
    const [ rename, updateRename ] = useState("");
	const cancelModal = () => {
		props.updateModals(false);
    };
    
    const handleRename = (e) => {
		updateRename(e.target.value);
	};

    const submitRename = (fromPath, toPath) => {
		if (toPath === '') return;
		let formatedToPath = '/' + toPath;
		let dropbox = new Dropbox({ accessToken: token$.value });
		dropbox.filesMoveV2({ from_path: fromPath, to_path: formatedToPath }).then((response) => {
			console.log(response);
			let copyDocument = [ ...props.documents ];
			let replacedIndex = copyDocument.findIndex((doc) => doc.id === response.metadata.id);
			console.log(replacedIndex);
			copyDocument[replacedIndex] = response.metadata;
			props.updateDocs(copyDocument);
		});
    };
    
    console.log("rename", rename);

	return (
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

                <input type="text" value={rename} onChange={handleRename} />
				<div className="modalsButtonsContainer">
					<button onClick={cancelModal} className="modalButtons">
						Cancel
					</button>
                   

					<button
						onClick={() => {
							submitRename(props.itemName, rename);
						}}
						className="modalButtons blueButtons"
					>
						Rename
					</button>
				</div>
			</div>
		</div>
	);
};

export default Rename;
