import React, { useState, useEffect } from "react";
import FileList from "../FileList/FileList";
import "./Main.css";
import { FaLanguage, FaStar } from "react-icons/fa";
import { Dropbox } from "dropbox";

const Main = ({ localToken, documents, updateDocs, choosenFiles, updateModalType, updateModals, updateItemName, updateItemId }) => {
  const [tab, updateTab] = useState("name");
  const [pathFile, updatePathFile] = useState("");
  console.log(localToken);

  useEffect(() => {
    let dropbox = new Dropbox({ accessToken: localToken });
    dropbox.filesListFolder({ path: "" })
    .then(response => {
      console.log("resonse.entries", response.entries);
      updateDocs(response.entries);
      return response.entries;
    })
    .then ( (docs) => {
      // adding a new key to the data, to be able to control the check button next to the list
      console.log(docs)
      let datas = [...docs];
      console.log(datas);
      datas.map(data => {
        return data.href = "", data.favorite = false;
      })
      // save the data with the new key
      updateDocs(datas) 
    })
  }, [localToken, updateDocs]);

  const showTab = tabName => {
    updateTab(tabName);
  };

  let tabActiveStyle = {
    backgroundColor: "rgb(235, 235, 235)",
    color: "rgb(34, 138, 208)"
  };

  const getLinkToFile = (path) => {
    console.log("this is hej!")
    let dropbox = new Dropbox({accessToken: localToken});
  
    dropbox.filesGetTemporaryLink({ path: path})
      .then(response => {
        console.log(response.link, response.fileBinary); //instead <Link to=''> maybe use <a> ???
        updatePathFile(response.link);
      })
      /*.then(response => {
        let downloading = browser.downloads.download(pathFile);
        console.log(pathFile);
      })*/
      .catch(function(error) {
        console.error(error, "Error by downloading file");
      });
  }

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
         
          return <FileList 
          key={doc.id} doc={doc} 
          getLinkToFile={getLinkToFile}
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
