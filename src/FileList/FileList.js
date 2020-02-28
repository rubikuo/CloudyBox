/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FaFolder, FaStar, FaTrash } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import './FileList.css';
import { convertDate } from './convertDate.js';
import { convertBytes } from './convertBytes.js';
import { Link } from 'react-router-dom';
import { favorites$, toggleFavorite } from '../store';

const FileList = ({ doc, updateModalType, updateModals, updateItemId, updateItemName, getLinkToFile }) => {
	const [ dropDown, updateDropDown ] = useState(false);

	const showDropDown = (e) => {
		console.log(e.target.id);
		updateDropDown(dropDown ? false : true);
	};
	const activateModal = (name, id) => {
		updateModals(true);
		updateModalType('remove');
		updateItemName(name);
		updateItemId(id);
	};

	let dropdownClass;
	if (dropDown) {
		dropdownClass = 'dropDown active';
	} else {
		dropdownClass = 'dropDown';
	}

	const handleFav = (doc) => {
		console.log(favorites$.value);

		toggleFavorite(doc);
	};

	if (doc) {
		return (
			<li className="item">
				<div className="itemSmlCtn">
					<FaStar
						onClick={() => {
							handleFav(doc);
						}}
						className="starIcon"
					/>
					<FaFolder className="folderIcon" />
					{doc['.tag'] === 'file' ? (
						<a
							className="documentLink" //href will be a new key?
							onClick={() => getLinkToFile(doc.path_lower)}
						>
							{doc.name}
						</a>
					) : (
						<Link to={doc.path_lower}>{doc.name}</Link>
					)}
				</div>
				<p className="metaData">{doc['.tag'] === 'file' ? convertBytes(doc.size) : '--'}</p>
				<p className="modified">{convertDate(doc.client_modified)}</p>
				<div className="dropDownCtn">
					<button onClick={showDropDown} id={doc.id}>
						<MdMenu />
					</button>
					<div className={dropdownClass}>
						<Link
							to="/"
							className="deleteLink"
							onClick={() => {
								activateModal(doc.name, doc.id);
							}}
						>
							Delete
						</Link>
					</div>
				</div>
			</li>
		);
	}
};

export default FileList;
