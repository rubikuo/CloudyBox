import React from "react";
import "./LogIn.css";
import logo from "../LogIn/images/LOGO.png";
import cloud from "../LogIn/images/Component--login-cloud.svg";
import cloudIllustration from "../LogIn/images/background.svg";
import { tokenUrl } from "../getToken";
import { token$ } from "../store";
import { Redirect } from 'react-router-dom';

const LogIn = () => {
  if (token$.value) {
    return <Redirect to="/home" />
  } else {

    return (
      <div className="container-login">
        <img className="cloud-bg" src={cloud} alt="background-cloud" />
        <img className="cloud-img" src={cloudIllustration} alt="background-illustration" />
        <img className="logo-login" src={logo} alt="cloudbox-logo" />
        <h1>CLOUD STORAGE</h1>
        <p>Cloud storage is a cloud computing model in which data is stored on remote servers accessed from the internet, or “cloud.” It is maintained, operated and managed by a cloud storage service provider on a storage servers that are built on virtualization techniques</p>
        <a href={tokenUrl}>connect</a>
      </div>
    );
  }
};

export default LogIn;
