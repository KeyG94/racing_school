import { baseUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { getToken } from '../utills/storage.js';
import { displayMessage } from '../utills/error.js';

export default updateToApi;

async function updateToApi(title, price, description, featured, id) {
	const url = baseUrl + products + '/' + id;
	const data = JSON.stringify({
		title,
		price,
		description,
		featured,
		id
	});

	const token = getToken();

	const options = {
		method: 'PUT',
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

		displayMessage(json.title, 'Was successfully updated! You will be taken back shortly.');
		document.querySelector('#error').style.color = 'green';
	} catch (error) {
		console.log(error);
	} finally {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		console.log(urlParams)

		if(!urlParams.has('#')){
			console.log(true)
		} else {
			setTimeout(function() {
				window.location.reload();
			}, 5000);

		}
		
	}
}
