const queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=";
const queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
const APIKey = "&appid=ca9d04c00cf40768a9d54466a186a42e";
const searchElement = document.getElementById("search");


function searchFunction(event) {
    let city = event.srcElement.previousElementSibling.value
    let fetchURLCurrent = queryURLCurrent + city + "&units=imperial" + APIKey;
    let fetchURLForecast = queryURLForecast + city + "&units=imperial" + APIKey;

    fetch(fetchURLCurrent)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        setMainDisplay(data);
    }
    );

    fetch(fetchURLForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        setForecastDisplay(data);
    }
    );
}

function setMainDisplay(info) {
    const mainInfoElement = document.getElementById("info");
    mainInfoElement.children[0].textContent = info.name;
    mainInfoElement.children[1].textContent = "Temp: " + info.main.temp + " \u2109";
    mainInfoElement.children[2].textContent = "Wind: " + info.wind.speed + " MPH";
    mainInfoElement.children[3].textContent = "Humidity: " + info.main.humidity + " %";
}

function setForecastDisplay(info) {
    const forecastInfoElement = document.querySelectorAll("figure");
    console.log(info);
    for (let i = 0; i < forecastInfoElement.length; i++) {
        forecastInfoElement[i].children[0].textContent = info.list[i * 8].dt_txt.slice(0, 10);
        forecastInfoElement[i].children[2].textContent = "Temp: " + info.list[i * 8].main.temp + " \u2109";
        forecastInfoElement[i].children[3].textContent = "Wind: " + info.list[i * 8].wind.speed + " MPH";
        forecastInfoElement[i].children[4].textContent = "Humidity: " + info.list[i * 8].main.humidity + " %";
    }
}

searchElement.addEventListener("click", searchFunction);