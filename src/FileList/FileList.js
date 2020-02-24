import React from "react";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";

const FileList = ({ doc }) => {
  const convertDate =(isoDate)=> {
    if(isoDate){
    var timeStr = isoDate;
    var date = new Date(timeStr);
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dateStr = month + "/" + day + "/" + year;
    return dateStr;
  }
  }

  return (
    <li className="item">
      <div className="itemSmlCtn">
        <FaStar className="starIcon" />
        <FaFolder className="folderIcon" />

        <p>{doc.name}</p>
      </div>
      <p>200 KB</p>
      <p>{convertDate(doc.client_modified)}</p>
      <FaTrash />
    </li>
  );
};

export default FileList;
