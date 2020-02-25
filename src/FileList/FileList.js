import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";
import { convertDate } from "./convertDate.js";
import { convertBytes } from "./convertBytes.js";
import { Link } from "react-router-dom";

const FileList = ({ doc, deleteItem }) => {
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
      <p className="metaData">{doc[".tag"] === "file" ? convertBytes(doc.size) : "--"}</p>
      <p className="modified">{convertDate(doc.client_modified)}</p>
      <button
        onClick={() => {
          deleteItem(doc.name);
        }}
      >
        <FaTrash />
      </button>
    </li>
  );
};

export default FileList;
