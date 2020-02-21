import React from "react";
import { tokenUrl } from "../getToken";

const LogIn = () => {
  return (
    <>
      <h1>Log In</h1>
      <div className="">Image</div>
      <a href={tokenUrl}>log in</a>
    </>
  );
};

export default LogIn;
