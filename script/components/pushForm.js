import { getToken } from '../utills/storage.js';
import { baseUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { displayMessage } from '../utills/error.js';
import uploadImageToApi from '../components/uploadImage.js'

export default pushToApi;

async function pushToApi(title, price, description) {
	const url = baseUrl + products;
	const data = JSON.stringify({
		title,
		price,
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
		
		let myForm = document.querySelector('form');
		let formData = new FormData();
		const formElements = myForm.elements;
		const fileField = formElements.namedItem('img');
		console.log(fileField)

		if (fileField !== null) {
			const file = fileField.files[0];
			console.log(file)
			formData.append(`files`, file, file.name);
		}

		if (!fileField){
			displayMessage('form', 'Is missing an image')
		}
		const refId = json.id

		formData.append('refId', refId);
		formData.append('ref', 'products');
		formData.append('field', 'image');

		uploadImageToApi(formData);
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
