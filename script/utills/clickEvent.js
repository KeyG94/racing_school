import updateToApi from '../components/updateForm.js';

export const addClickEvent = () => {
	const featuredItem = document.querySelectorAll('.fa-flag');
	handleApiClick(featuredItem);
};

export const handleApiClick = (click) => {
	click.forEach((item) =>
		item.addEventListener('click', function() {
			event.target.classList.toggle('fa');
			event.target.classList.toggle('far');
			updateToApi(
				this.dataset.title,
				this.dataset.price,
				this.dataset.description,
				this.dataset.featured,
				this.dataset.id
			);
		})
	);
};