import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import countriesListMarkup from './templates/countriesListMarkup.hbs'
import countryInfoMarkup from './templates/countryInfoMarkup.hbs'

const DEBOUNCE_DELAY = 300;
const searchField = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countriesList = document.querySelector('.country-list');
searchField.value = ''

function markupCleaner() {
   countryInfo.innerHTML = '';
   countriesList.innerHTML = '';
 }

function countriesMarkup(countries) {
  if (countries.length > 1 && countries.length <= 10) {
    markupCleaner();
    const countriesListRender = countriesListMarkup(countries)
    countriesList.insertAdjacentHTML('afterbegin', countriesListRender);
  } else if (countries.length === 1) {
    markupCleaner();
    const countryInfoRedner = countryInfoMarkup(countries);
    countryInfo.insertAdjacentHTML('afterbegin', countryInfoRedner);
  } else if (countries.length > 10) {
    Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
  }
}

function inputHandler(e) {
  markupCleaner();
  const inputValue = e.target.value.trim();

    if (inputValue.length === 0) {
       return
    }

  fetchCountries(inputValue)
    .then(countries => {
      countriesMarkup(countries);
    })
    .catch(() => Notiflix.Notify.failure(`Oops, there is no country with that name.`));
}

searchField.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));