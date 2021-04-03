import { addToFavorites } from './cart.js';
import { isInStorage } from './storage.js';

let root = document.querySelector('#li-root');
let output = '';

export const createElement = (info) => {
	output += `  
    <li class="card-element"> 
        <h2 class="card-title">${info.title}</h2>
        <h5 class="card-author">${info.author}</h5>
        <p class="card-summary">${info.summary}</p>
		<i class="mr-1 ${isInStorage(info.id)
			? 'fas'
			: 'far'} fa-shopping-cart" data-id="${info.id}" data-title="${info.title}" data-price="${info.price}" data-description="${info.description}">
		</i>
    <li>
	`;
	console.log(output)
	root.innerHTML = output;
	addClickEvent();
};

export const createFilterList = (data, input) => {
	const searchValue = input.toLowerCase();
	const list = data;

	if (searchValue) {
		output = '';
		const filteredList = list.filter((item) => item.title.toLowerCase().includes(searchValue));
		filteredList.forEach((item) => createElement(item));

		if (filteredList.length === 0) {
			output = '';
			output = '<h3>Sorry, there was no match!</h3>';
			root.innerHTML = output;
		}
	} else {
		output = '';
		list.forEach((item) => createElement(item));
	}
};

const addClickEvent = () => {
	const favoriteItem = document.querySelectorAll('.fa-heart');
	handleClick(favoriteItem);
};

const handleClick = (click) => {
	click.forEach((item) => item.addEventListener('click', addToFavorites));
};
