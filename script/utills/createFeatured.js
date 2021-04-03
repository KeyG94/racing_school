import { isInStorage } from '../utills/storage.js';
import { baseImageUrl } from '../utills/baseUrl.js';
import { addToCart } from './cart.js';
import updateToApi from '../components/updateForm.js';

let output = '';
let isFeatured = '';
let root = document.querySelector('.root-index');

export const createFeatured = (info) => {
	

	if (info.featured) {
		isFeatured = 'fa';
		output += `
        <div class="card mr-1 ml-1">
            <div class="card-image-container">
                <a href="#">
                    <img src="${baseImageUrl + info.image.url}" alt="example">
                    <div class="img-overlay">Select</div>
                </a>
            </div>
            <h4>${info.title}</h4>
            <div class="detail flex">
                <p class="flex-1">${info.price}</p>
                <i class="${isFeatured} fa-flag mr-4" data-id="${info.id}" data-title="${info.title}" data-price="${info.price}" data-featured="${!info.featured}" data-description="${info.description}"></i>
            </div>
        </div>
        `;
	}

	root.innerHTML = output;
	addClickEvent();
};

const addClickEvent = () => {
	const favoriteItem = document.querySelectorAll('.fa-flag');
	handleClick(favoriteItem);
};

const handleClick = (click) => {
   
	click.forEach((item) => item.addEventListener('click', function(){
        updateToApi(this.dataset.title, this.dataset.price, this.dataset.description, this.dataset.featured, this.dataset.id)
        
    }));
};
