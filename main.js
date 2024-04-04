require('dotenv').config();
const apiKey = process.env.API_KEY;

function fetchWeatherData(search) {
  let weatherDiv = document.querySelector("#weather-info");
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${search}`,
    {
      mode: "cors",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      weatherDiv.appendChild(displayData(parseResponse(response)));
    })
    .catch(function (error) {
      console.log(error);
    });
}

function parseResponse(jsonResponse) {
  const current = jsonResponse.current;
  const temperature = current.temp_f;
  const conditionText = current.condition.text;
  return { temperature, conditionText };
}

function displayData(data) {
  const container = document.createElement('div')
  const keys = Object.keys(data);
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const div = document.createElement("div");
    div.textContent = data[key];
    container.appendChild(div);
  }
  return container;
}


const form = document.querySelector('form')
form.addEventListener('submit', (event)=>{
  event.preventDefault()
  const search = document.querySelector('#location').value
  fetchWeatherData(search)
  ;
})
