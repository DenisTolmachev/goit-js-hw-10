export function fetchCountries(name) {
  const countryFields = `?fields=name,capital,population,flags,languages`;
  return fetch(`https://restcountries.com/v3.1/name/${name}${countryFields}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);
  });
}
