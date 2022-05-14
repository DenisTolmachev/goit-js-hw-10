import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryInfo = document.querySelector('.country-info');

console.log(countryInfo);

console.log(fetchCountries());
fetchCountries()