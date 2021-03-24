import { getToken } from '../utills/storage.js';
import { baseUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { displayMessage } from '../utills/error.js';

export default pushToApi;

async function pushToApi(title, price, products, description) {
	const url = baseUrl + products;
	const data = JSON.stringify({
		title,
		price,
		products,
		description
	});

	const token = getToken();

	const options = {
		method: 'POST',
		body: data,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();
		console.log(json);

		if (json.error) {
			displayMessage(json.error, json.message);
		}

		displayMessage(json.title, 'Was successfully added! You will be taken back shortly.');
		document.querySelector('#error').style.color = 'green';
	} catch (error) {
		console.log(error);
	} finally {
		setTimeout(function() {
			window.history.back();
		}, 8000);
	}
}