import React, { useState, useEffect } from "react";
import FileList from "../FileList/FileList";
import "./Main.css";
import { FaLanguage, FaStar } from "react-icons/fa";
import { Dropbox } from "dropbox";

const Main = ({localToken}) => {
  const [tab, updateTab] = useState("name");
  const [documents, updateDocs] = useState([]);
  console.log(localToken)

  useEffect(()=>{
    let dropbox = new Dropbox({accessToken:localToken});
    dropbox.filesListFolder({path:""})
    .then((response)=>{
      console.log(response.entries)
      updateDocs(response.entries)
    })


  },[])


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
        {documents.map(doc=>{
          return(
            <FileList key={doc.id} doc={doc} />
          )
        })}
       
      </ul>
    </main>
  );
};

export default Main;
