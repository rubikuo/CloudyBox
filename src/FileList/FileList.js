import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";
import { convertDate } from "./convertDate.js";
import {convertBytes} from "./convertBytes.js";




const FileList = ({ doc }) => {
  console.log(doc[".tag"]);
  return (
    <li className="item">
      <div className="itemSmlCtn">
        <FaStar className="starIcon" />
        <FaFolder className="folderIcon" />
        <link to="/">{doc.name}</link>
      </div>
      <p>{doc[".tag"]=== "file"? convertBytes(doc.size): "--"}</p> {/*convert fileSize*/}
      <p>{convertDate(doc.client_modified)}</p>
      <FaTrash />
    </li>
  );
};

export default FileList;
