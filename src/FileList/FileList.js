import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";
import { convertDate } from "./convertDate.js";
import { convertBytes } from "./convertBytes.js";
import { Link } from "react-router-dom";

const FileList = ({ doc, getLinkToFile, pathFile }) => {
  console.log(doc[".tag"]);

  return (
    <li className="item">
      <div className="itemSmlCtn">
        <FaStar className="starIcon" />
        <FaFolder className="folderIcon" />
        <Link className="documentLink" to={{
          pathName: `${pathFile}`,
        }}
          onClick={() => getLinkToFile(doc.path_lower)}>{doc.name}
        </Link>
      </div>
      <p>{doc[".tag"] === "file" ? convertBytes(doc.size) : "--"}</p>
      <p>{convertDate(doc.client_modified)}</p>
      <FaTrash />
    </li>
  );
};

export default FileList;
