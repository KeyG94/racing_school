import { baseImageUrl } from '../utills/baseUrl.js';
import { addClickEvent } from '../utills/clickEvent.js';

export default createProduct;

let root = document.querySelector('.root-products');
let output = '';

async function createProduct(info) {
	output += `  
		<div class="product-card mr-1 ml-1">
			<div class="product-image-container">
				<a href="${'productDetail.html'}?id=${info.id}">
					<img src="${baseImageUrl + info.image.url}" alt="${info.image.alternativeText}">
					<div class="img-overlay">Select</div>
				</a>
			</div>
			<h4>${info.title}</h4>
			<div class="detail flex">
				<p class="flex-1">${info.price},-</p>
				<i class="${info.featured
					? 'fa'
					: 'far'} fa-flag mr-4" data-id="${info.id}" data-title="${info.title}" data-price="${info.price}" data-featured="${!info.featured}" data-description="${info.description}"></i>
			</div>
		</div>
			`;

	root.innerHTML = output;
	addClickEvent();
};
