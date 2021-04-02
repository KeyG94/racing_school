import { baseUrl } from '../utills/baseUrl.js';
import { baseImageUrl } from '../utills/baseUrl.js';
import { products } from '../utills/settings.js';

(async function() {
	const contentList = document.querySelector('.root-body');

	try {
		const response = await fetch(baseUrl + products);
		const json = await response.json();

		contentList.innerHTML = '';
		json.forEach((title) => {

			const imageUrl = title.image.formats.thumbnail.url;
			
			contentList.innerHTML += `    
			<tr class="hover:bg-gray-500 hover:text-gray-100">
			<td>${title.id}</td>
			<td>${title.title}</td>
			<td>${title.price}</td>
			<td>${title.featured}</td>
			<td><img src="${baseImageUrl + imageUrl}"></td>
			<td><a href="./edit.html?id=${title.id}" class="link-table"><i class="fas fa-cog"></i></a></td>
		</tr>  
        `;
		});
	} catch (error) {
		console.log(error);
	}
})();

const logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', performLogOut);

function performLogOut() {
	localStorage.clear();
	location.href = './index.html';
}
