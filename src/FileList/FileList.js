/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaStar, FaTrash, FaRegStar, FaFile, FaFilePdf} from 'react-icons/fa';
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

	const activateModal = (name, id) => {
		updateModals(true);
		updateModalType('remove');
		updateItemName(name);
		updateItemId(id);
	};

	const handleFav = (doc) => {
    toggleFavorite(doc); 
  };

	if (doc) {

    let button;
      
        if (favorites.find(x => x.id === doc.id)){
          button = <FaStar size="20px"  style={{color: "rgb(250, 142, 0)", position:"relative", top: "3px"}}/>
        } else {
          button = <FaRegStar size="20px"style={{position:"relative", top: "3px"}}/>
        }

		return (
			<li className="item">
				<div className="itemSmlCtn">
          <span className="starIcon" onClick={() => handleFav(doc)}>
              <span>{button}</span>
          </span>
					{doc['.tag'] === 'file' ? (
						<>
							{doc.name.slice(doc.name.length - 3) === "pdf" ? (<FaFilePdf size="2rem" className="folderIcon"/>) : 
							(<FaFile size="2rem" className="folderIcon" />)}
							<a
								className="documentLink" //href will be a new key?
								onClick={() => getLinkToFile(doc.path_lower)}
							>
								{doc.name}
							</a>
						</>
					) : (
						<>
							<FaFolder size="2rem" className="folderIcon" />
							<Link to={"/home" + doc.path_lower} className="documentLink">{doc.name}</Link>
						</>
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
