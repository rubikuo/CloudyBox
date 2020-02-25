import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";
import { convertDate } from "./convertDate.js";


const convertBytes =(bytes)=> {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes) {
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (i === 0) {
      return bytes + " " + sizes[i];
    }

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }
};

const FileList = ({ doc }) => {
  console.log(doc[".tag"]);
  return (
    <li className="item">
      <div className="itemSmlCtn">
        <FaStar className="starIcon" />
        <FaFolder className="folderIcon" />
        <p>{doc.name}</p>
      </div>
      <p>{doc[".tag"]=== "file"? convertBytes(doc.size): "--"}</p> {/*convert fileSize*/}
      <p>{convertDate(doc.client_modified)}</p>
      <FaTrash />
    </li>
  );
};

export default FileList;
