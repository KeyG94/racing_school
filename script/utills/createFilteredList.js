import createProduct from './createProductElements.js';
import { baseImageUrl } from '../utills/baseUrl.js';
import { addClickEvent } from '../utills/clickEvent.js';

export default createFilterList;

let root = document.querySelector('.root-products');
let output = '';

async function createFilterList(data, input) {
	const searchValue = input.toLowerCase();
	const list = data;

	if (searchValue) {
		output = '';
		const filteredList = list.filter((item) => item.title.toLowerCase().includes(searchValue));
		filteredList.forEach((info) => {
			output += `  
				<div class="product-card mr-1 ml-1 h-72">
					<div class="product-image-container">
						<a href="${'productDetail.html'}?id=${info.id}">
							<img src="${baseImageUrl + info.image.url}" alt="${info.image.alternativeText}">
							<div class="img-overlay">Select</div>
						</a>
					</div>
					<h4 class="h-20 mt-2 p-1">${info.title}</h4>
					<div class="detail flex p-1 sm:text-lg text-md">
						<p class="flex-1">${info.price},-</p>
						<i class="${info.featured
							? 'fa'
							: 'far'} fa-flag mr-4" data-id="${info.id}" data-title="${info.title}" data-price="${info.price}" data-featured="${!info.featured}" data-description="${info.description}"></i>
					</div>
				</div>
				`;
		});

		root.innerHTML = output;
		addClickEvent();

		if (filteredList.length === 0) {
			output = '';
			output = '<h3>Sorry, there was no match!</h3>';
			root.innerHTML = output;
		}
	} else {
		output = '';
		list.forEach((item) => createProduct(item));
	}
}
