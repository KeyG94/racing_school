import { getUser } from './storage.js';

export default signInUser;

async function signInUser() {
	const value = await getUser();
	const adminButton = document.querySelector('#admin-nav');

	if (value.length === 0) {
		adminButton.innerHTML = 'Login';
	} else {
		adminButton.innerHTML = `${value.username}`;
	}

	adminButton.addEventListener('click', function() {
		console.log(value);
		if (value.length === 0) {
			location.href = './login.html';
		} else {
			location.href = './admin.html';
		}
	});
};