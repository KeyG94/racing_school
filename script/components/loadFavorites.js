import { checkStorage as retrieveFromStorage } from '../utills/storage.js';
import { createElement } from '../utills/createElement.js';

const documentFavoriteList = document.querySelector('#li-root');
const clearButton = document.querySelector('#clear-btn');

let output = '';
const items = retrieveFromStorage();

if (items.length > 0) {
	items.forEach((item) => {
		createElement(item);
	});
} else {
	output = `
	<li class="card-element"> 
		<h3 class="card-title">Oops, there is nothing in your favorite list yet... Go back to home and press heart on the items you like
		</h3>
	</li>`;
	documentFavoriteList.innerHTML = output;
}

clearButton.addEventListener('click', clearList);

async function clearList() {
	window.localStorage.clear();
	location.reload();
}
