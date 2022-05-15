import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 30000;
const searchField = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countrysList = document.querySelector('.country-list');

searchField.addEventListener('input', debounce(inputHandler), DEBOUNCE_DELAY);

function countrysMarkup(countrys) {
  if (countrys.length > 1 && countrys.length <= 10) {
    markupCleaner();
    console.log(countrys);
    const countrysListMarkup = countrys
      .map(({ name, flags }) => {
        return `
         <li class="country-list__item">
            <img class="country-list__img" src="${flags.svg}" alt="${name.official}"/>
            <p class="country-list_name"><b>${name.official}</b></p>
         </li>
         `;
      })
      .join('');
    countrysList.insertAdjacentHTML('afterbegin', countrysListMarkup);
  } else if (countrys.length === 1) {
    markupCleaner();
    const countryInfoMarkup = countrys
      .map(({ name, flags, capital, population, languages }) => {
        return `
        <div class="country-info__card">
            <div class="country-info__card-header">
               <img class="country-info__img" src="${flags.svg}" alt="${name.official}"/>
               <h1>${name.official}</h1>
            </div>
            <p><b>Capital:</b> ${capital}</p>
            <p><b>Population:</b> ${population}</p>
            <p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>
         </div>
        `;
      })
      .join('');
      console.log(countrys);
    countryInfo.insertAdjacentHTML('afterbegin', countryInfoMarkup);
  } else if (countrys.length > 10) {
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
    .then(countrys => {
      countrysMarkup(countrys);
    })
    .catch(() => Notiflix.Notify.failure(`Oops, there is no country with that name.`));
}

function markupCleaner() {
  countryInfo.innerHTML = '';
  countrysList.innerHTML = '';
}
