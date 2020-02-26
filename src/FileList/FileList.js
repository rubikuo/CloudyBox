import React, { useState } from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import "./FileList.css";
import { convertDate } from "./convertDate.js";
import { convertBytes } from "./convertBytes.js";
import { Link } from "react-router-dom";

const FileList = ({ doc, deleteItem }) => {
  const [dropDown, updateDropDown] = useState(false);
  const showDropDown = e => {
    updateDropDown(true);
  };
  if (doc) {
    console.log(doc[".tag"]);
    return (
      <li className="item">
        <div className="itemSmlCtn">
          <FaStar className="starIcon" />
          <FaFolder className="folderIcon" />
          <Link className="documentLink" to="/">
            {doc.name}
          </Link>
        </div>
        <p>{doc[".tag"] === "file" ? convertBytes(doc.size) : "--"}</p>
        <p>{convertDate(doc.client_modified)}</p>
        <div className="">
          <button onClick={showDropDown}>
            <MdMenu />
          </button>
          <div className="dropDown">
            <Link
              to="/"
              className="deleteLink"
              onClick={() => {
                deleteItem(doc.name, doc.id);
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
