import {BehaviorSubject} from 'rxjs';
// save the accesstoken to store so we can subscribe later when we want to use token
export const token$ = new BehaviorSubject(localStorage.getItem("token"));
// function to  save and remove token depend if the token is active or not. If active, then save the token to a local storage so that it's still available even if the page got refreshed
//else if user want logout or the token validation time has expired, then remove the token from the local storage so the page will redirect automatically to a login page
export function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  token$.next(token);
}