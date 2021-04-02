import { baseUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { displayMessage } from '../utills/error.js';
import { baseImageUrl } from '../utills/baseUrl.js';
import updateToApi from '../components/updateForm.js';
import uploadImageToApi from '../components/uploadImage.js';
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
const image = document.querySelector('img');
const idInput = document.querySelector('#id');
const messageOutput = document.querySelector('#error');
const loader = document.querySelector('.loader');
const deleteBtn = document.querySelector('#delete');
const newImage = document.querySelector('#img');
const featuredBox = document.querySelector('#featured');


(async function() {
	try {
		const response = await fetch(objectUrl);
		const dataObject = await response.json();

		title.value = dataObject.title;
		price.value = dataObject.price;
		featuredBox.checked = dataObject.featured;

		console.log(featuredBox.checked)
		description.value = dataObject.description;
		idInput.value = dataObject.id;
		image.src = `${baseImageUrl + dataObject.image.formats.thumbnail.url}`;
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

newImage.addEventListener('change', function() {
	let reader = new FileReader();
	reader.readAsDataURL(this.files[0]);
	reader.onload = (e) => {
		image.src = e.target.result;
	};
});

form.addEventListener('submit', (e) => upDate(e));

function upDate(event) {
	event.preventDefault();
	let myForm = document.querySelector('form');
	let formData = new FormData();

	const formElements = myForm.elements;

	const fileField = formElements.namedItem('img');
	if (fileField.files[0] !== undefined) {
		const file = fileField.files[0];
		formData.append(`files`, file, file.name);
	}
	const refId = formElements.namedItem('refId').value;

	formData.append('refId', refId);
	formData.append('ref', 'products');
	formData.append('field', 'image');

	const titleValue = title.value.trim();
	const priceValue = price.value.trim();
	const featuredValue = featuredBox.checked;
	const descriptionValue = description.value.trim();
	const idValue = idInput.value.trim();
	const imageValue = newImage;

	messageOutput.innerHTML = '';

	if (!titleValue || !priceValue || !descriptionValue) {
		return displayMessage('Warning', 'Please fill out all the fields');
	}

	if (imageValue.files) {
		uploadImageToApi(formData);
		updateToApi(titleValue, priceValue, descriptionValue, featuredValue, idValue);
	} else {
		updateToApi(titleValue, priceValue, descriptionValue, featuredValue, idValue);
	}
}
