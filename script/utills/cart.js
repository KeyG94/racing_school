import { checkStorage, isInStorage, saveToStorage } from './storage.js';

export const addToCart = () => {

	const addButton = document.querySelector('.btn')

	// event.target.classList.toggle('fa');
	// event.target.classList.toggle('fas');


	const { id, title, price, description } = event.target.dataset;
	const currentList = checkStorage();

	console.log(currentList);
	if (!isInStorage(id)) {
		addButton.innerHTML = 'Remove from basket';
		const item = { id, title, price, description };
		currentList.push(item);
		saveToStorage(currentList);
	} else {
		const newList = currentList.filter((favorites) => favorites.id !== id);
		addButton.innerHTML = 'Add to basket' ;
		saveToStorage(newList);
	}
};
