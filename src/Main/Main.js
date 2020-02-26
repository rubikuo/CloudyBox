import React, { useState, useEffect } from "react";
import FileList from "../FileList/FileList";
import "./Main.css";
import { FaLanguage, FaStar } from "react-icons/fa";
import { Dropbox } from "dropbox";

const Main = ({ localToken, documents, updateDocs, choosenFiles, updateModalType, updateModals, updateItemName, updateItemId }) => {
  const [tab, updateTab] = useState("name");

  useEffect(() => {
    let dropbox = new Dropbox({ accessToken: localToken });
    dropbox.filesListFolder({ path: "" }).then(response => {
      console.log("resonse.entries", response.entries);
      updateDocs(response.entries);
    });
  }, [localToken, updateDocs]);

  

  const showTab = tabName => {
    updateTab(tabName);
  };

  let tabActiveStyle = {
    backgroundColor: "rgb(235, 235, 235)",
    color: "rgb(34, 138, 208)"
  };

  return (
    <main>
      <div className="titleBar">
        <div className="tabsCtn">
          <div
            className="tabs"
            style={tab === "name" ? tabActiveStyle : {}}
            onClick={() => showTab("name")}
          >
            <p>Name</p>
            <FaLanguage />
          </div>
          <div
            className="tabs"
            style={tab === "stared" ? tabActiveStyle : {}}
            onClick={() => showTab("stared")}
          >
            <p>Stared</p>
            <FaStar />
          </div>
        </div>
        <div className="tagCtn">
          <p className="metaTag">MetaData</p>
          <p className="modifiedTag">Modified</p>
        </div>
      </div>
      <ul>
        {/* map out the FileLsit, now just example*/}
        {documents.map(doc => {
          return <FileList key={doc.id} doc={doc} 
          updateModalType={updateModalType}
          updateModals={updateModals} 
          updateItemId = {updateItemId}
          updateItemName = {updateItemName}/>;
        })}
      </ul>
    </main>
  );
};

export default Main;
