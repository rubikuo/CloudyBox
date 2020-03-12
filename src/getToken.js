import { Dropbox } from "dropbox";

  // to access to the app
  const dbx = new Dropbox({fetch:fetch, clientId: "bc9lq9cup2tcfps"}); // to go to the right dropbox app
  // to get token by using getAuthenticationUrl 
  // we will get location.hash 
  // use queryString to parsel the location.hash to get the token;p
 export const tokenUrl = dbx.getAuthenticationUrl("https://cloudybox.surge.sh/auth");


