import React from "react";
import { MdDelete } from "react-icons/md";
import { token$ } from "../store";
import { Dropbox } from "dropbox";
import "./Modals.css";

const Remove = props => {
  const cancelModal = () => {
    props.updateModals(false);
  };
  const deleteItem = (path, id) => {
    console.log(path, id);
    let dropbox = new Dropbox({ accessToken: token$.value });
    dropbox
      .filesDeleteV2({ path: `/${path}` })
      .then(response => {
        console.log("deleteResponse", response);
        const newDocuments = props.documents.filter(x => x.id !== id);
        props.updateDocs(newDocuments);
      })
      .catch(err => {
        console.log(err);
      });
    props.updateModals(false);
  };

  return (
    <div className="modalContainer">
      {/*same className for the modalContainer here and Create.js, same button classNames as well */}
      <div className="modalBox">
        <div className="modalHeadline">
          <MdDelete
            style={{
              position: "relative",
              top: "0px",
              color: "#1293D6",
              marginRight: "3px"
            }}
          />
          <h5> Delete file?</h5>
        </div>

        <p>
          Are you sure you want to delete
          <span> {props.itemName} </span>
          from your CloudyBox?
        </p>

        <div className="modalsButtonsContainer">
          <button onClick={cancelModal} className="modalButtons">
            Cancel
          </button>

          <button
            onClick={() => {
              deleteItem(props.itemName, props.itemId);
            }}
            className="modalButtons blueButtons"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Remove;
