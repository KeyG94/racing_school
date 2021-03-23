import { baseUrl } from './baseUrl.js';
import { loginUrl } from './settings.js';
import { saveUser, saveToken } from './storage.js';

const form = document.querySelector('#form');

form.onsubmit = function(event) {
	event.preventDefault();

	const username = document.querySelector('#form-username').value.trim();
	const password = document.querySelector('#form-password').value.trim();

	if (username && password) {
		loginRequest(username, password);
	}
};

export default loginRequest;
async function loginRequest(name, password) {
	const url = baseUrl + loginUrl;
	const btn = document.querySelector('#submit-btn');
	const errorDiv = document.querySelector('#error-message');

	const data = JSON.stringify({
		identifier: name,
		password: password
	});

	const option = {
		method: 'POST',
		body: data,
		headers: {
			'Content-type': 'application/json'
		}
	};

	try {
		const response = await fetch(url, option);
		btn.innerHTML = 'Loging In...';
		const json = await response.json();

		if (json.user) {
			saveToken(json.jwt);
			saveUser(json.user);
			btn.innerHTML = 'Success';
			btn.style.color = 'green';
			errorDiv.innerHTML = `Welcome ${json.user.username}`;
			errorDiv.style.color = 'green';

			setTimeout(function() {
				location.href = './admin.html';
			}, 4000);
		}

		if (json.error) {
			btn.innerHTML = 'Failed';
			btn.style.color = 'red';

			errorDiv.innerHTML = json.message[0].messages[0].message;
			console.log(error);
		}
	} catch (error) {
		console.log(error);
	}
}
