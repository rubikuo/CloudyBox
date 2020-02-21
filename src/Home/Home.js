import React, { useEffect, useState } from "react";
import { Dropbox } from "dropbox";
import { token$, updateToken } from "../store";

const Home = ({ location }) => {
  const [localToken, updateLocalToken] = useState(token$.value);
  console.log(location);
  useEffect(() => {
    const subscribe = token$.subscribe(token => {
      updateLocalToken(token);
    });

    return () => subscribe.unsubscribe();
  }, []);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
