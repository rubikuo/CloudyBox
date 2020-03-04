import { BehaviorSubject } from 'rxjs';
// save the accesstoken to store so we can subscribe later when we want to use token
export const token$ = new BehaviorSubject(localStorage.getItem('token'));
// function to  save and remove token depend if the token is active or not. If active, then save the token to a local storage so that it's still available even if the page got refreshed
//else if user want logout or the token validation time has expired, then remove the token from the local storage so the page will redirect automatically to a login page
export function updateToken(token) {
	if (token) {
		localStorage.setItem('token', token);
	} else {
		localStorage.removeItem('token');
	}
	token$.next(token);
}

export const favorites$ = new BehaviorSubject(JSON.parse(localStorage.getItem('favorites') || '[]'));

export function toggleFavorite(doc) {
	const newFavorites = [ ...favorites$.value ]; // to copy the array from localstorage
	if (newFavorites.find((x) => x.id === doc.id)) {
		// check if its in the array
		let altered = newFavorites.filter((x) => x.id !== doc.id); //then remove
		localStorage.setItem('favorites', JSON.stringify(altered));
		favorites$.next(altered); // update localstorage
	} else {
		newFavorites.push(doc); // if there is not then push
		localStorage.setItem('favorites', JSON.stringify(newFavorites));
		favorites$.next(newFavorites);
	}
}

export function removeFavoriteByPath(path) {
	const newFavorites = favorites$.value.filter(x => x.path_lower !== path);
	localStorage.setItem('favorites', JSON.stringify(newFavorites));
	favorites$.next(newFavorites);
}

export function clearFavorites() {
	favorites$.next([]);
	localStorage.removeItem("favorites");
}