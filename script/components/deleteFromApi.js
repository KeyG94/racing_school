import { baseUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { getToken } from '../utills/storage.js';
import { displayMessage } from '../utills/error.js';

export default deleteRequest;

async function deleteRequest(id) {
	const url = baseUrl + products + '/' + id;
	const token = getToken();
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();

		if (json.error) {
			displayMessage(json.error, json.message);
		}

		displayMessage(
			'',
			json.title + ' Was successfully deleted.. You will be redirected back shortly, or you could click Go back.'
		);
		document.querySelector('#error').style.color = 'green';
	} catch (error) {
		console.log(error);
	} finally {
		setTimeout(function() {
			location.href = './admin.html';
		}, 8000);
	}
}
