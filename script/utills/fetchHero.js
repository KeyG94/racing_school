import { baseImageUrl, baseUrl } from './baseUrl.js';

let root = document.querySelector('#root-index');
let output = '';

export default loadHeroBanner

async function loadHeroBanner(){

    try{
        const fetchFromApi = await fetch(baseUrl + 'home');
        const data = await fetchFromApi.json();
        console.log(data)
        output = `
        <div class="background-hero">
            <img src="${baseImageUrl + data.hero_banner.url}" alt="${data.hero_banner.alternativeText}"/>
        </div>
        `
        root.innerHTML = output;
    }
    catch(error){

    }
}