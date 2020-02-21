import { Dropbox } from "dropbox";

  // to access to the app
  const dbx = new Dropbox({clientId: "bc9lq9cup2tcfps"});
  // to get token by using getAuthenticationUrl 
  // we will get location.hash 
  // use queryString to parsel the location.hash to get the tokeniiiiiiiiiiiiiij;p
 export const tokenUrl = dbx.getAuthenticationUrl("http://localhost:3000/auth");


