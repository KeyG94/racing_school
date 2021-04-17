import { baseUrl, baseImageUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { addToCart } from '../utills/cart.js';

(async function() {
	const queryBarString = document.location.search;
	const params = new URLSearchParams(queryBarString);
	const id = params.get('id');
	const objectUrl = baseUrl + products + '/' + id;

	let output = '';
	let root = document.querySelector('.root-product');

	if (!id) {
		document.location.href = '/';
	}
	try {
		const response = await fetch(objectUrl);
		const data = await response.json();

		output = `
        <section class="image w-full md:w-1/2 md:pr-2">
                <div class="legend-nav">
                    <ul class="flex">
                        <a href="./index.html"><li class="mr-1 text-gray-400 hover:text-gray-100">home </li></a>
                        <a href="./products.html"><li class="mr-1 text-gray-400 hover:text-gray-100">- products -</li></a>
                        <a href="#"><li class="text-gray-400 hover:text-gray-100" >${data.title}</li></a>
                    </ul>
                </div>
                <img src="${baseImageUrl + data.image.url}" class="w-full" alt="${data.image.alternativeText}">
            </section>
            <section class="details w-full md:w-1/2 md:pl-2">
                <div class="title">
                    <h3>${data.title} - ${data.id}</h3>
                    <h4>${data.price},-</h4>
                </div>
                <div>
                    <h5>Details</h5>
                    <p class="">
                        ${data.description}.<br>
                        <span class="text-green"> Powered by 78 racing school</span>
                    </p>
                </div>
                <div class="flex">
                    <button class="btn btn-green sm:w-full md:w-48"
                    data-id="${data.id}"
                    data-title="${data.title}" 
                    data-price="${data.price}" 
                    data-description="${data.description}">
                    Add to basket</button>
                </div>
            </section>
        `;

		root.innerHTML = output;

		addClickEvent();
	} catch (error) {
		console.log(error);
	}
})();

const addClickEvent = () => {
	const addToBasket = document.querySelectorAll('button');
	handleClick(addToBasket);
};

const handleClick = (add) => {
	add.forEach((item) => {
		item.addEventListener('click', addToCart);
	});
};
