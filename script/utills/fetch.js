import { baseUrl } from './baseUrl.js';
import { products } from './settings.js';
import { createElement, createFilterList } from './createElement.js';
import { displayMessage, errorMessage } from './error.js';
import { getUser } from './storage.js';

export default getApi;
async function getApi() {
	try {
		const fetchApi = await fetch(baseUrl + products);
		const data = await fetchApi.json();
		const searchBox = document.querySelector('#search');

		data.forEach((item) => createElement(item));

		searchBox.addEventListener('keyup', function() {
			createFilterList(data, searchBox.value);
		});
	} catch (error) {
		displayMessage(error, errorMessage);
	}
}

export const signInUser = () => {
	const value = getUser();
	const adminButton = document.querySelector('#admin-nav');

	if (value.length === 0) {
		adminButton.innerHTML = 'Login';
	} else {
		adminButton.innerHTML = `${value.username}`;
	}

	adminButton.addEventListener('click', function() {
		console.log(value);
		if (value.length === 0) {
			location.href = './login.html';
		} else {
			location.href = './admin.html';
		}
	});
};
