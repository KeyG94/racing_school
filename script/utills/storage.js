import { listKey } from './settings.js';
import { listKeyUser, tokenKey } from './settings.js';

export const checkStorage = () => {
	const favoriteList = localStorage.getItem(listKey);
	return favoriteList ? JSON.parse(favoriteList) : [];
};

export const isInStorage = (id) => !!checkStorage().find((item) => item.id == id);

export const saveToStorage = (favorite) => {
	localStorage.setItem(listKey, JSON.stringify(favorite));
	console.log(favorite);
};

export const saveUser = (user) => {
	localStorage.setItem(listKeyUser, JSON.stringify(user));
};

export const saveToken = (token) => {
	localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
	return localStorage.getItem(tokenKey);
};

export const getUser = () => {
	return getFromStorage(listKeyUser);
};

const getFromStorage = (key) => {
	const value = localStorage.getItem(key);
	if (!value) {
		return [];
	}

	return JSON.parse(value);
};
