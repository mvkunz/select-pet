const buttonDog = document.querySelector('#dog');
const buttonCat = document.querySelector('#cat');
const buttonSurprise = document.querySelector('#surprise');

const urlDog = 'https://dog.ceo/api/breeds/image/random';
const urlCat = 'https://api.thecatapi.com/v1/images/search';

buttonDog.addEventListener('click', () => {
  fetch(urlDog).then((result) => result.json()).then((response) => {
    const dogImage = response.message;

    const photoDog = document.querySelector('img');
    photoDog.setAttribute('src', dogImage);
  });
});

buttonCat.addEventListener('click', () => {
  fetch(urlCat).then((result) => result.json()).then((response) => {
    const catImage = response[0].url;

    const photoCat = document.querySelector('img');
    photoCat.setAttribute('src', catImage);
  });
});

buttonSurprise.addEventListener('click', () => {
  
  Promise.any([getPet(urlDog), getPet(urlCat)]).then((result) => {
    const photoSurprise = document.querySelector('img');
    let petImage = '';
    
    if (result.length > 0) {
      petImage = result[0].url;
    } else {
      petImage = result.message;
    }
   photoSurprise.setAttribute('src', petImage);
  })
});

const getPet = (url) => {
  return new Promise((resolve, reject) => {
    const response = fetch(url).then((response) => response.json()).then((data) => resolve(data));
  });
};