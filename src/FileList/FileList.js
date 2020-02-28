/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaFolder, FaStar, FaTrash, FaRegStar } from 'react-icons/fa';
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

  useEffect(() => {
    console.log("favorites token", favorites$.value)

    let favItems = favorites$.value;
    console.log("fav.items", favItems);
   
    if (favItems !== undefined){
    //console.log(favItems[0].id)
     const favId = favItems.find(x => x.id === doc.id);
    //console.log("fav.id", favId.id);
 
     /* if (favId.id === doc.id){
       doc.favorite = true;
     } */
    }
  }, [favorites$.value])
  

	if (doc) {
    

    let button;
        if (doc.favorite){
          button = <FaStar size="25px"  style={{color: "rgb(250, 142, 0)"}}/>
        } else {
          button = <FaRegStar size="25px"/>
        }

		return (
			<li className="item">
				<div className="itemSmlCtn">
          <span className="starIcon" onClick={() => handleFav(doc)}>
              <span>{button}</span>
          </span>
					{/* <FaStar
						onClick={() => {
							handleFav(doc);
						}}
						className="starIcon"
					/> */}
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
