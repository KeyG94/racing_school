import { checkStorage, isInStorage, saveToStorage } from '../utills/storage.js';
// import { baseImageUrl } from '../utills/baseUrl.js';
import signInUser from '../utills/userSetting.js';

signInUser();

let basketList = document.querySelector('.root-basket');
const clearButton = document.querySelector('#clear-btn');
console.log(basketList);

let output = '';
const items = checkStorage();

console.log(items);

if (items.length > 0) {
	items.forEach((item) => {
		output += `
			<div class="card-container flex justify-between">
				<div class="card-left flex justify-center">
					<div class="basket-card-image">
						<img src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png" alt="" class="relative">
						<div class="img-overlay"><i class="fas fa-eye"></i></div>
					</div>
					<div class="card-title ml-2">
						<h4>${item.title}</h4>
						<a href="${'productDetail.html'}?id=${item.id}">Read More</a>
					</div>
				</div>
				<div class="card-price">
					<h4>Price</h4>
					<p>${item.price},-</p>
				</div>
				<i class="fas fa-minus-circle delete-icon" data-id="${item.id}" data-title="${item.title}" data-price="${item.price}"></i>
			</div>
		`;
		console.log(basketList);
		basketList.innerHTML = output;
		clickTarget();
	});
} else {
	output = `
		<div class="p-2"> 
			<h3 class="card-title">Oops, looks like there is nothing in your shopping cart yet... Go back to products and add the product you want to the cart
			</h3>
		</div>
	`;
	basketList.innerHTML = output;
}

async function clickTarget() {
	const clickedItem = document.querySelectorAll('.delete-icon');
	handleStorageClick(clickedItem);
}

async function handleStorageClick(click){
	click.forEach((item) => {
		item.addEventListener('click', function(){
			console.log(this)
			const { id, title, price} = event.target.dataset;
			const currentList = checkStorage();
		
			console.log(currentList);
			if (!isInStorage(id)) {
				const item = { id, title, price};
				currentList.push(item);
				saveToStorage(currentList);
			} else {
				const newList = currentList.filter((basket) => basket.id !== id);
				saveToStorage(newList);
			}
			window.location.reload();
		})
	})
}

async function addToCart(event) {
	console.log(event.target)
	const { id, title, price, description } = event;
	const currentList = checkStorage();

	// console.log(currentList);
	if (!isInStorage(id)) {
		const item = { id, title, price, description };
		currentList.push(item);
		saveToStorage(currentList);
	} else {
		const newList = currentList.filter((favorites) => favorites.id !== id);
		saveToStorage(newList);
	}
}

clearButton.addEventListener('click', clearList);

async function clearList() {
	window.localStorage.clear();
	location.reload();
}
