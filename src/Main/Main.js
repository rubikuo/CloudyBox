import React from "react";
import FileList from "../FileList/FileList";
import "./Main.css";
import { FaLanguage, FaStar } from "react-icons/fa";

const Main = () => {
  return (
    <main>
      <div className="titleBar">
          <div className="tabsCtn">
        <div className="tabs">
          <p>Name</p>
          <FaLanguage />
        </div>
        <div className="tabs">
          <p>Stared</p>
          <FaStar />
        </div>
        </div>
        <p>MetaData</p>
        <p>Modified</p>
      </div>
      <ul>
        {/* map out the FileLsit, now just example*/}
        <FileList />
      </ul>
    </main>
  );
};

export default Main;
