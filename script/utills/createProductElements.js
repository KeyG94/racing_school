import { addClickEvent } from '../utills/clickEvent.js';

export default createProduct;

let root = document.querySelector('.root-products');
let output = '';

async function createProduct(info) {
	output += `  
		<div class="product-card mr-1 ml-1 h-72">
			<div class="product-image-container">
				<a href="${'productDetail.html'}?id=${info.id}">
					<img src="${info.image.url}" alt="${info.image.alternativeText} class="object-cover w-full h-48">
					<div class="img-overlay">Select</div>
				</a>
			</div>
			<a href="${'productDetail.html'}?id=${info.id}"><h4 class="h-20 mt-2 p-1">${info.title}</h4></a>
			<div class="detail flex p-1 sm:text-lg text-md">
				<p class="flex-1">${info.price},-</p>
				<i class="${info.featured
					? 'fa'
					: 'far'} fa-flag mr-4" data-id="${info.id}" data-title="${info.title}" data-price="${info.price}" data-featured="${!info.featured}" data-description="${info.description}"></i>
			</div>
		</div>
			`;
	root.innerHTML = output;
	addClickEvent();
}
