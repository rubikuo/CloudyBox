import React from "react";
import { MdCreateNewFolder, MdFileUpload, MdNoteAdd } from "react-icons/md";
import "./Sidebar.css";

class Sidebar extends React.PureComponent {
    constructor(props){
        super(props);
    }

    render() {

        let elements;
        if(this.props.name === "sidebarMenu") {
            elements = (
                <div className ="menu_list">
                    <ul>
                        <li>Home</li>
                        <li>Files</li>
                    </ul>
                </div>
            )
        }

        if ( this.props.name === "sidebarButtons") {
            elements = (
                <div className ="menu_list">
                    <ul>
                        <li><MdNoteAdd size="20px" style ={{position: "relative", top: "4px", marginRight: "5px"}} />Upload files</li>
                        <li><MdFileUpload size="20px" style ={{position: "relative", top: "4px", marginRight: "5px"}}/>Upload folder</li>
                        <li><MdCreateNewFolder size="20px" style ={{position: "relative", top: "4px", marginRight: "5px"}}/>New Folder</li>
                    </ul>
                </div>
            )
        }

        return <>
                {elements}
               </>
        
    }
}

export default Sidebar;