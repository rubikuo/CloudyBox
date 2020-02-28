import React from "react";
import { MdCreateNewFolder, MdFileUpload } from "react-icons/md";
import "./Sidebar.css";
import { Dropbox } from "dropbox";
import { token$ } from "../store";


class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      choosedFiles: [],
      path: ""
    };

    this.createFolder = this.createFolder.bind(this);
  }

  createFolder() {
    this.props.updateModals(true);
    this.props.updateModalType("create");
  }

  uploadFiles = e => {
    const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
    let dropBox = new Dropbox({ accessToken: token$.value });
    let files = Array.from(e.target.files);

    if (files.length === 0) {
      return;
    }
    this.props.updateChoosenFiles({ files });

    if (files.some(file => file.size > UPLOAD_FILE_SIZE_LIMIT)) {
      alert("One of the files is too big!");
    } else {
      const promises = files.map(file =>
        dropBox.filesUpload({
          path: "/" + file.name,
          contents: file,
        })
      );

      Promise.all(promises)
        .then(responses => {
          console.log("promiseAll response", responses);
          const files = responses.map(response => ({
            ...response,
            ".tag": "file"
          }));
         const newDocuments = [...this.props.documents, ...files];
         this.props.updateDocs(newDocuments);

        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  render() {
    let elements;
      elements = (
        <div className="menu_list">
          <ul>
            <li>
              <label>
                <MdFileUpload
                  size="20px"
                  style={{
                    position: "relative",
                    top: "4px",
                    marginRight: "5px"
                  }}
                />
                Upload files
                <input
                  style={{ display: "none" }}
                  multiple
                  onChange={this.uploadFiles}
                  value={this.state.choosedFile}
                  type="file"
                 
                />
              </label>
            </li>
            <li>
              <label>
                <MdCreateNewFolder
                  size="20px"
                  style={{
                    position: "relative",
                    top: "4px",
                    marginRight: "5px"
                  }}
                />
                <button onClick={this.createFolder}>Create Folder</button>
              </label>
            </li>
          </ul>
        </div>
      );

    return <>{elements}</>;
  }
}

export default Sidebar;
