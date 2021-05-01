import { baseUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';
import { checkStorage, saveToStorage } from '../utills/storage.js';
import signInUser from '../utills/userSetting.js';

signInUser();

const onLoad = async () => {
	/* Build items*/
	const items = checkStorage();
	const basketList = document.querySelector('.root-basket');
	basketList.innerHTML = await getImageFromApi(items);
	const removeButtons = document.querySelectorAll('.delete-icon');
	removeButtons.forEach((element) => (element.onclick = () => removeItem(element.dataset.id)));

	/* Build prices */
	const priceList = items.map((item) => parseFloat(item.price));
	const priceOutput = document.querySelector('.total-price');
	priceOutput.innerHTML = displayTotalPrice(priceList);
};
onLoad();

const clearButton = document.querySelector('#clear-btn');

async function getImageFromApi(items) {
	if (items.length === 0) {
		return `
		<div class="p-2"> 
			<h3 class="card-title">Oops, looks like you forgot to add any items to your shopping cart.</h3>
		</div>
		`;
	}
	try {
		const request = await fetch(baseUrl + products);
		const data = await request.json();
		const itemsWithImage = items.map((item) => {
			const itemFromApi = data.find((dataObj) => dataObj.id === parseInt(item.id));
			return { ...item, image: itemFromApi.image };
		});

		return itemsWithImage.map((item) => createItem(item));

	} catch (e) {
		console.log(e);
	}
}

const createItem = (item) => {
	return `
	<div class="card-container flex justify-between">
		<div class="card-left flex justify-center">
		<div class="basket-card-image overflow-hidden">
			<img src='${item.image.url}' alt="${item.image.alternativeText}" class="relative h-28 w-32 product-image">
			<div class="img-overlay"><a href="${'productDetail.html'}?id=${item.id}" target="_blank"<i class="fas fa-eye"></i></a></div>
		</div>
			<div class="card-title ml-1 w-28 flex flex-col justify-between">
				<h4 class="mb-1">${item.title}</h4>
				<a href="${'productDetail.html'}?id=${item.id}" target="_blank" class="hover:text-gray-500">Read More</a>
			</div>
		</div>
		<div class="card-price flex flex-col justify-between">
			<h4>Price</h4>
			<p class="m-0">${item.price},-</p>
		</div>
		<div class="flex justify-center p-2">
			<i class="fas fa-minus-circle delete-icon cursor-pointer" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}"></i>
		</div>
	</div>
`;
};

function displayTotalPrice(prices) {
	const totalPrice = prices.reduce((acc, val) => acc + val, 0);
	return `${Math.round(totalPrice)},-`;
}

function removeItem(id) {
	const currentList = checkStorage();
	const newList = currentList.filter((item) => item.id !== id);
	saveToStorage(newList);
	onLoad();
}

clearButton.addEventListener('click', clearList);

async function clearList() {
	window.localStorage.clear();
	onLoad();
}
