import { baseUrl } from './baseUrl.js';
import { products } from './settings.js';
import { createFeatured } from './createFeatured.js';
import { displayMessage, errorMessage } from './error.js';
import { getUser } from './storage.js';

export default getIndexApi;
async function getIndexApi() {
    try {
        const fetchFromApi = await fetch(baseUrl + products);
        const data = await fetchFromApi.json();
        console.log(data)
        data.forEach((item) => createFeatured(item));
    }
    catch (error){
        console.log(error)
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