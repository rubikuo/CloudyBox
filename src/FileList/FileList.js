import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";
import { convertDate } from "./convertDate.js";
import { convertBytes } from "./convertBytes.js";

const FileList = ({ doc, deleteItem, getLinkToFile, pathFile }) => {
  if (doc) {
    console.log(doc[".tag"]);

    return (
      <li className="item">
        <div className="itemSmlCtn">
          <FaStar className="starIcon" />
          <FaFolder className="folderIcon" />
          <a className="documentLink" href={doc.href} //href will be a new key?
            onClick={() => getLinkToFile(doc.path_lower)}>{doc.name}
          </a>
        </div>
        
    

      <p className="metaData">{doc[".tag"] === "file" ? convertBytes(doc.size) : "--"}</p>
      <p className="modified">{convertDate(doc.client_modified)}</p>
      <button
        onClick={() => {
          deleteItem(doc.name, doc.id);
        }}
      >
        <FaTrash />
      </button>
    </li >
  );
      }
};

export default FileList;
