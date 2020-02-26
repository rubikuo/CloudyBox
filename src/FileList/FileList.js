import React from "react";
import { Link } from "react-router-dom";
import { FaFolder, FaStar, FaTrash } from "react-icons/fa";
import "./FileList.css";
import { convertDate } from "./convertDate.js";
import { convertBytes } from "./convertBytes.js";

 

const FileList = ({ doc, updateModalType, updateModals, updateItemId, updateItemName, getLinkToFile, pathFile }) => {
   const activateModal =(name, id)=>{
     updateModals(true);
     updateModalType("remove");
     updateItemName(name);
     updateItemId(id);
   }

  if(doc){
  console.log(doc[".tag"]);


  return (
    <li className="item">
      <div className="itemSmlCtn">
        <FaStar className="starIcon" />
        <FaFolder className="folderIcon" />
        {doc[".tag"] === "file" ? (
          <a className="documentLink"  //href will be a new key?
            onClick={() => getLinkToFile(doc.path_lower)}>{doc.name}
          </a> ) : (
              <Link to={doc.path_lower}>
                {doc.name}
              </Link>
          )
  }
      </div>
      <p className="metaData">{doc[".tag"] === "file" ? convertBytes(doc.size) : "--"}</p>
      <p className="modified">{convertDate(doc.client_modified)}</p>
      <button
        onClick={() => {
         activateModal(doc.name, doc.id)
        }}
      >
        <FaTrash />
      </button>
    </li >
  );
      }
};

export default FileList;
