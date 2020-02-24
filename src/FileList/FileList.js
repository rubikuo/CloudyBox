import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";

const FileList = ({doc}) => {
  return (
    <li className="item">
      <div className="itemSmlCtn">
      <FaStar className="starIcon" />
      <FaFolder className="folderIcon" />
  
      <p>{doc.name}</p>
      </div>
      <p>200 KB</p>
      <p>{doc.client_modified}</p>
      <FaTrash />
    </li>
  );
};

export default FileList;
