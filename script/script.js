import getIndexApi, { signInUser } from './utills/fetchIndex.js';
import loadHeroBanner from './utills/fetchHero.js';

getIndexApi();
loadHeroBanner();

signInUser();
