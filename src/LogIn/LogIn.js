import React from "react";
import "./LogIn.css";
import logo from "../LogIn/images/logo.svg";
import cloud from "../LogIn/images/Component--login-cloud.svg";
import cloudIllustration from "../LogIn/images/Component--login-cloudIllus.svg";
import { tokenUrl } from "../getToken";

const LogIn = () => {
  return (
    <div className = "container-login">
      <img className="cloud-bg" src={cloud}/>
      <img className="cloud-img" src={cloudIllustration }/>
      <img className="logo-login" src={logo}/>
      <h1>CLOUD STORAGE</h1>
      <p>Cloud storage is a cloud computing model in which data is stored on remote servers accessed from the internet, or “cloud.” It is maintained, operated and managed by a cloud storage service provider on a storage servers that are built on virtualization techniques</p>
      <a href={tokenUrl}>connect</a>
    </div>
  );
};

export default LogIn;
