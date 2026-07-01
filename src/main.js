const API_KEY = import.meta.env.VITE_NASA_API_KEY || 'baXOhZF9cL735JnNVThVd8VfjduLCu1hKdLKm88U';
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

const titleEl = document.getElementById('apod-title');
const explanationEl = document.getElementById('apod-explanation');
const mediaContainer = document.getElementById('media-container');
const datePicker = document.getElementById('date-picker');

const today = new Date().toISOString().split('T')[0];
datePicker.max = today;
datePicker.value = today;

async function fetchAPOD(date = '') {
  titleEl.innerText = "Lade Universum...";
  explanationEl.innerText = "Sterne werden ausgerichtet...";
  mediaContainer.innerHTML = '';

  let url = `${BASE_URL}?api_key=${API_KEY}`;
  if (date) {
    url += `&date=${date}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fehler beim Laden: ${response.status}`);
    }
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error(error);
    titleEl.innerText = "Fehler im Orbit!";
    explanationEl.innerText = "Das Bild konnte nicht geladen werden. Überprüfe die Internetverbindung oder den API-Key.";
  }
}

function displayData(data) {
  titleEl.innerText = data.title;
  explanationEl.innerText = data.explanation;

  if (data.media_type === 'image') {
    mediaContainer.innerHTML = `<img src="${data.url}" alt="${data.title}">`;
  } else if (data.media_type === 'video') {
    mediaContainer.innerHTML = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    mediaContainer.innerHTML = `<p>Medientyp wird nicht unterstützt.</p>`;
  }
}

datePicker.addEventListener('change', (e) => {
  fetchAPOD(e.target.value);
});

fetchAPOD();