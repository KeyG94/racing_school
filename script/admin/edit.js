import { baseUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { displayMessage } from '../utills/error.js';
import {baseImageUrl} from '../utills/baseUrl.js';
import updateToApi from '../components/updateForm.js';
import deleteRequest from '../components/deleteFromApi.js';

const queryBarString = document.location.search;
const params = new URLSearchParams(queryBarString);
export const id = params.get('id');

if (!id) {
	document.location.href = '/';
}

const objectUrl = baseUrl + products + '/' + id;

const form = document.querySelector('form');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const image = document.querySelector('img')
const idInput = document.querySelector('#id');
const messageOutput = document.querySelector('#error');
const loader = document.querySelector('.loader');
const deleteBtn = document.querySelector('#delete');
const newImage = document.querySelector('#img');

(async function() {
	try {
		const response = await fetch(objectUrl);
		console.log(response)
		const dataObject = await response.json();

		title.value = dataObject.title;
		price.value = dataObject.price;
		description.value = dataObject.description;
		idInput.value = dataObject.id;
		image.src = `${baseImageUrl + dataObject.image.formats.thumbnail.url}`;
		console.log(dataObject);
		deleteBtn.addEventListener('click', function() {
			deleteRequest(dataObject.id);
		});
	} catch (error) {
		console.log(error);
	} finally {
		loader.style.display = 'none';
		form.style.display = 'block';
	}
})();

form.addEventListener('submit', submitForm);

function submitForm(event) {
	event.preventDefault();

	messageOutput.innerHTML = '';

	const titleValue = title.value.trim();
	const priceValue = price.value.trim();
	const descriptionValue = description.value.trim();
	const idValue = idInput.value.trim();
	const imageValue = newImage;
	console.log(imageValue);

	if (!titleValue || !priceValue || !descriptionValue) {
		return displayMessage('Warning', 'Please fill out all the fields');
	}

	updateToApi(titleValue, priceValue, descriptionValue, idValue);
}
