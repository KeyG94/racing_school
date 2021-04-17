import { baseUrl } from './baseUrl.js';
import { products } from './settings.js';
import createFilterList from './createFilteredList.js';
import { displayMessage, errorMessage } from './error.js';
import createProduct from './createProductElements.js';

export default getProducts;

async function getProducts() {
	try {
		const fetchApi = await fetch(baseUrl + products);
		const data = await fetchApi.json();
		const searchBox = document.querySelector('#search');
		// create products
		data.forEach((item) => createProduct(item));

		searchBox.addEventListener('keyup', function() {
			createFilterList(data, searchBox.value);
		});
	} catch (error) {
		console.log('fetch error');
		displayMessage(error, errorMessage);
	}
}
