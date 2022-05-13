import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputSerch = document.querySelector('#search-box');

inputSerch.addEventListener('input', inputValue())

function inputValue() {
   console.log(inputSerch.value);
}
