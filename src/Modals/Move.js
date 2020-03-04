import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Dropbox } from 'dropbox';
import { FaFolder } from 'react-icons/fa';

const Move = (props) =>{

	const [ newPath, updateNewPath ] = useState('');
	const handleMoveModal = (status) => {
		props.updateMoveModal(status);
	};

    return ReactDOM.createPortal(
        <div className="modalContainer">
			<div className="modalBox copyBox">
				<div className="modalHeadline">
					<p>
						Move <span className="itemCopy">{props.doc.name}</span> to ...
					</p>
				</div>
				<span>Dropbox</span>
				<div className="relocateCtn">
					{props.folders.map((folder) => {
						return (
							<div key={folder.id} className="folderCtn" onClick={() => getNewPath(folder)}>
								<FaFolder size="2rem" className="folderIcon" />
								<p className="documentLink">
									{folder.name}
								</p>
							</div>
						);
					})}
				</div>

				<div className="modalsButtonsContainer">
					<div onClick={() => handleMoveModal(false)} className="modalButtons">
						Cancel
					</div>
					<button
						onClick={() => moveFile(props.doc.path_lower, newPath + '/' + props.doc.name)}
						className="modalButtons blueButtons"
					>
						Copy
					</button>
				</div>
			</div>
		</div>,
		document.body


    );


}

export default Move;


