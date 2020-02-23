import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";

const FileList = () => {
  return (
    <li className="item">
      <div className="itemSmlCtn">
      <FaStar className="starIcon" />
      <FaFolder className="folderIcon" />
  
      <p>My new folder</p>
      </div>
      <p>200 KB</p>
      <p>2020-02-22 10:55</p>
      <FaTrash />
    </li>
  );
};

export default FileList;
