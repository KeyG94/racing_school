import { displayMessage } from '../utills/error.js';
import pushToApi from '../components/pushForm.js';

const form = document.querySelector('form');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const description = document.querySelector('#description');
const messageOutput = document.querySelector('#error');
const newImage = document.querySelector('#img');
const image = document.querySelector('img');
const featuredBox = document.querySelector('#featured');

newImage.addEventListener('change', function() {
	let reader = new FileReader();
	reader.readAsDataURL(this.files[0]);
	reader.onload = (e) => {
		image.src = e.target.result;
	};
});

form.addEventListener('submit', (e) => submitForm(e));

function submitForm(e) {
	e.preventDefault();

	const titleValue = title.value.trim();
	const priceValue = price.value.trim();
	const descriptionValue = description.value.trim();	
	const imageValue = newImage;
	const featuredValue = featuredBox.checked;

	messageOutput.innerHTML = '';

	if (!titleValue || !priceValue || !descriptionValue || imageValue.files.length === 0) {
		return displayMessage('Warning', 'Please fill out all the fields and upload a product image');
	}

	if (imageValue.files) {
		pushToApi(titleValue, priceValue, featuredValue, descriptionValue);
	}
}
