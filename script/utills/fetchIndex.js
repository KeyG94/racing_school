import { baseUrl } from './baseUrl.js';
import { products } from './settings.js';
import { createFeatured } from './createFeatured.js';
import signInUser from './userSetting.js';

export default getIndexApi;

async function getIndexApi() {
	try {
		const fetchFromApi = await fetch(baseUrl + products);
		const data = await fetchFromApi.json();
		data.forEach((item) => createFeatured(item));
	} catch (error) {
		console.log(error);
	}
}

signInUser();
