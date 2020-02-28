/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaStar, FaTrash } from 'react-icons/fa';
import './FileList.css';
import { convertDate } from './convertDate.js';
import { convertBytes } from './convertBytes.js';
import { favorites$, toggleFavorite } from '../store';

const FileList = ({
	doc,
	updateModalType,
	updateModals,
	updateItemId,
	updateItemName,
	getLinkToFile,
	pathFile,
	favorites,
	updateFavorite
}) => {
	const activateModal = (name, id) => {
		updateModals(true);
		updateModalType('remove');
		updateItemName(name);
		updateItemId(id);
	};

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
				<button
					onClick={() => {
						activateModal(doc.name, doc.id);
					}}
				>
					<FaTrash />
				</button>
			</li>
		);
	}
};

export default FileList;
