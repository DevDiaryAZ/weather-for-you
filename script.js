const cities = {
  '+3451190': 'Rio de Janeiro',
  '+2643743': 'London',
  '+5128638': 'New York',
  '+2988507': 'Paris',
  '+1609350':'Bangkok'
};

const param = {
  'url': 'https://api.openweathermap.org/data/2.5/',
  'appid': 'ec6d8d8cff82ed8cbefe5adff12321c8',
};

function getWeather() {
  const cityId = document.querySelector('#city').value;
  fetch(`${param.url}weather?id=${cityId}&units=metric&appid=${param.appid}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeather);
}

function showWeather(data) {
  //name
  document.querySelector('.city__name').textContent = data.name;
  //temperature
  document.querySelector('.city__temperature').innerHTML =
    Math.round(data.main.temp) + '&deg;';
  //temperature-feel
  document.querySelector('.city__temperature-feel').innerHTML =
    'Feels like: ' + Math.round(data.main.feels_like) + '&deg;';
  //cloud
  document.querySelector('.city__cloud').textContent =
    data.weather[0].description[0].toUpperCase() +
    data.weather[0].description.slice(1);
  //cloud image
  document.querySelector(
    '.city__cloud-img'
  ).innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
  //humidity
  document.querySelector('.city__humidity').textContent =
    'Humidity: ' + data.main.humidity + '%';
}

function addElement() {
  let select = document.createElement('select');
  select.setAttribute('id', 'city');
  select.classList.add('select');
  let out = document.querySelector('.out');
  var parentDiv = out.parentNode;
  parentDiv.insertBefore(select, out);

  for (city in cities) {
    cityName = +city;
    select.innerHTML += `<option value='${cityName}'>${cities[city]}</option>`;
  }
}

addElement();

getWeather();

document.querySelector('#city').onchange = getWeather;
