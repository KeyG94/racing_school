import { addClickEvent } from '../utills/clickEvent.js';

	let output = '';

export const createFeatured = (info) => {
	
	let root = document.querySelector('.root-index-2');
	let isFeatured = '';

	if (info.featured) {
		isFeatured = 'fa';
		output += `
        <div class="card mr-1 ml-1">
            <div class="card-image-container">
                <a href="${'productDetail.html'}?id=${info.id}">
                    <img src="${info.image.url}" alt="${info.image.alternativeText}">
                    <div class="img-overlay">Select</div>
                </a>
            </div>
            <h4>${info.title}</h4>
            <div class="detail flex">
                <p class="flex-1">${info.price},-</p>
                <i class="${isFeatured} fa-flag mr-4" data-id="${info.id}" data-title="${info.title}" data-price="${info.price}" data-featured="${!info.featured}" data-description="${info.description}"></i>
            </div>
        </div>
        `;
	}

	root.innerHTML = output;
	addClickEvent();
};
