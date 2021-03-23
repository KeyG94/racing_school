import { displayMessage } from '../utills/error.js';
import pushToApi from '../components/pushForm.js';

const form = document.querySelector('form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const summary = document.querySelector('#summary');
const messageOutput = document.querySelector('#error');
console.log(summary.value);
form.addEventListener('submit', submitForm);

function submitForm(event) {
	event.preventDefault();

	const titleValue = title.value.trim();
	const authorValue = author.value.trim();
	const summaryValue = summary.value.trim();

	messageOutput.innerHTML = '';

	if (!titleValue || !authorValue || !summaryValue) {
		return displayMessage('Warning!', 'Please fill out all the fields');
	}

	pushToApi(titleValue, authorValue, summaryValue);
}
