import createProduct from './createProductElements.js';

export default createFilterList;

let root = document.querySelector('.root-products');
let output = '';

async function createFilterList(data, input) {
	const searchValue = input.toLowerCase();
	const list = data;

	if (searchValue) {
		output = '';
		const filteredList = list.filter((item) => item.title.toLowerCase().includes(searchValue));
		filteredList.forEach((item) => createProduct(item));

		if (filteredList.length === 0) {
			output = '';
			output = '<h3>Sorry, there was no match!</h3>';
			root.innerHTML = output;
		}
	} else {
		output = '';
		list.forEach((item) => createProduct(item));
	}
};
