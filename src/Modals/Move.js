import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Dropbox } from 'dropbox';
import { FaFolder } from 'react-icons/fa';
import { token$ } from '../store';

const Move = (props) =>{

	const [ newPath, updateNewPath ] = useState('');
	const handleMoveModal = (status) => {
		props.updateMoveModal(status);
    };

    const getNewPath = (item) => {
		console.log(item.path_lower);
		updateNewPath(item.path_lower);
	};
    
    const moveFile = (fromPath, toPath) => {
		// if (toPath === '') return;
		// let formatedToPath = '/' + toPath;
		let dropbox = new Dropbox({ accessToken: token$.value });
		dropbox
			.filesMoveV2({ from_path: fromPath, to_path: toPath })
			.then((response) => {
				console.log(response);
				window.location.href = 'home' + newPath;
				handleMoveModal();
			})
			.catch((err) => {
				console.log(err.response.status);
			});
		
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
						Move
					</button>
				</div>
			</div>
		</div>,
		document.body


    );


}

export default Move;


