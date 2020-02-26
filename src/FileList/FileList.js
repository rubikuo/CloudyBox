import React, { useState } from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import "./FileList.css";
import { convertDate } from "./convertDate.js";
import { convertBytes } from "./convertBytes.js";
import { Link } from "react-router-dom";

const FileList = ({
  doc,
  updateModalType,
  updateModals,
  updateItemId,
  updateItemName
}) => {
  const [dropDown, updateDropDown] = useState(false);

  const showDropDown = e => {
    console.log(e.target.id);
    updateDropDown(dropDown? false:true);
  };
  const activateModal = (name, id) => {
    updateModals(true);
    updateModalType("remove");
    updateItemName(name);
    updateItemId(id);
  };

  let dropdownClass;
  if(dropDown){
    dropdownClass = "dropDown active";
  } else {
    dropdownClass = "dropDown"
  }

  if (doc) {
    return (
      <li className="item">
        <div className="itemSmlCtn">
          <FaStar className="starIcon" />
          <FaFolder className="folderIcon" />
          <Link className="documentLink" to="/">
            {doc.name}
          </Link>
        </div>
        <p className="metaData">
          {doc[".tag"] === "file" ? convertBytes(doc.size) : "--"}
        </p>
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
