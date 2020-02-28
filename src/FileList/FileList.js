/* eslint-disable jsx-a11y/anchor-is-valid */
<<<<<<< HEAD
import React, { useState } from 'react';
import { FaFolder, FaStar } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import './FileList.css';
import { convertDate } from './convertDate.js';
import { convertBytes } from './convertBytes.js';
import { Link } from 'react-router-dom';
import { toggleFavorite } from '../store';

const FileList = ({ doc, updateModalType, updateModals, updateItemId, updateItemName, getLinkToFile, favorites }) => {
  const [ dropDown, updateDropDown ] = useState(false);

	const showDropDown = (e) => {
		console.log(e.target.id);
		updateDropDown(dropDown ? false : true);
	};
=======

import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaStar, FaTrash, FaRegStar } from 'react-icons/fa';
import './FileList.css';
import { convertDate } from './convertDate.js';
import { convertBytes } from './convertBytes.js';
import { toggleFavorite } from '../store';

const FileList = ({
	doc,
	updateModalType,
	updateModals,
	updateItemId,
	updateItemName,
  getLinkToFile,
  favorites,
}) => {
>>>>>>> e6eda7602b18b88d3db38872a696a98d46b6a867
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
<<<<<<< HEAD

		toggleFavorite(doc);
	};
=======
    toggleFavorite(doc); 
  };
>>>>>>> e6eda7602b18b88d3db38872a696a98d46b6a867

	if (doc) {

    let button;
      
        if (favorites.find(x => x.id === doc.id)){
          button = <FaStar size="20px"  style={{color: "rgb(250, 142, 0)", position:"relative", top: "3px"}}/>
        } else {
          button = <FaRegStar size="20px"/>
        }

		return (
			<li className="item">
				<div className="itemSmlCtn">
<<<<<<< HEAD
          {/* {favorites.find(x => x.id === doc.id) ? "fav" : "not fav"} */}
					<FaStar
						onClick={() => {
							handleFav(doc);
						}}
						className="starIcon"
					/>
=======
          <span className="starIcon" onClick={() => handleFav(doc)}>
              <span>{button}</span>
          </span>
>>>>>>> e6eda7602b18b88d3db38872a696a98d46b6a867
					<FaFolder className="folderIcon" />
					{doc['.tag'] === 'file' ? (
						<a
							className="documentLink" //href will be a new key?
							onClick={() => getLinkToFile(doc.path_lower)}
						>
							{doc.name}
						</a>
					) : (
						<Link to={doc.path_lower} className="documentLink">{doc.name}</Link>
					)}
				</div>
				<p className="metaData">{doc['.tag'] === 'file' ? convertBytes(doc.size) : '--'}</p>
				<p className="modified">{convertDate(doc.client_modified)}</p>
				<div className="dropDownCtn">
					<button onClick={showDropDown} id={doc.id}>
						<MdMenu />
					</button>
					<div className={dropdownClass}>
						<button
							className="deleteBtn"
							onClick={() => {
								activateModal(doc.name, doc.id);
							}}
						>
							Delete
						</button>
            <button
							className="renameBtn"
							onClick={() => {
								
							}}
						>
							Rename
						</button>
					</div>
				</div>
			</li>
		);
	}
};

export default FileList;
