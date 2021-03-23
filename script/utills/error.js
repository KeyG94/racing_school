export const errorMessage = 'Sorry, something went wrong. Please contact Support';

export const displayMessage = (info, errorMessage) => {
	let output = '';
	let root = document.querySelector('#error');

	const message = `${info}. ${errorMessage}, `;

	output = message;
	root.innerHTML = output;
	root.style.color = 'red';
};
