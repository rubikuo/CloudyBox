import React, {useEffect, useState} from "react";
import * as queryString from "query-string";
import {Redirect} from "react-router-dom";
import { updateToken } from "./store";

// 
const Auth =()=>{
    const [tokenSaved, updateTokenSaved] = useState(false);

    useEffect(() => {
        const accessToken = queryString.parse(window.location.hash).access_token;
        updateToken(accessToken);

        updateTokenSaved(true);
    }, []);
  

    return tokenSaved ? <Redirect to="/home" /> : null;
}

export default Auth;