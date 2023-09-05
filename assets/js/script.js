const queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=";
const queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
const APIKey = "&appid=ca9d04c00cf40768a9d54466a186a42e";

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
        displayEmotes(document.querySelector(".emote-main"), data.weather[0].id);
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
    mainInfoElement.children[0].children[0].textContent = info.name;
    mainInfoElement.children[0].children[0].textContent = info.name;
    mainInfoElement.children[1].textContent = "Temp: " + info.main.temp + " \u2109";
    mainInfoElement.children[2].textContent = "Wind: " + info.wind.speed + " MPH";
    mainInfoElement.children[3].textContent = "Humidity: " + info.main.humidity + " %";
}

function setForecastDisplay(info) {
    const forecastInfoElement = document.querySelectorAll("figure");
    for (let i = 0; i < forecastInfoElement.length; i++) {
        forecastInfoElement[i].children[0].textContent = info.list[i * 8].dt_txt.slice(0, 10);
        displayEmotes(forecastInfoElement[i].children[1], info.list[i * 8].weather[0].id);
        forecastInfoElement[i].children[2].textContent = "Temp: " + info.list[i * 8].main.temp + " \u2109";
        forecastInfoElement[i].children[3].textContent = "Wind: " + info.list[i * 8].wind.speed + " MPH";
        forecastInfoElement[i].children[4].textContent = "Humidity: " + info.list[i * 8].main.humidity + " %";
    }
}

function displayEmotes(element, code) {
    let idCode = code;

    if ((idCode >= 200) && (idCode <= 232)) {
        idCode = 200;
    }
    if ((idCode >= 300) && (idCode <= 321)) {
        idCode = 300;
    }
    if ((idCode >= 500) && (idCode <= 504)) {
        idCode = 500;
    }
    if ((idCode >= 600) && (idCode <= 622)) {
        idCode = 511;
    }
    if ((idCode >= 520) && (idCode <= 531)) {
        idCode = 520;
    }
    if ((idCode >= 701) && (idCode <= 781)) {
        idCode = 701;
    }
    if ((idCode >= 803) && (idCode <= 804)) {
        idCode = 803;
    }

    switch (idCode) {
        case 200:
            element.src = "./assets/images/11d.png";
            break;
        case 300:
            element.src = "./assets/images/09d.png";
            break;
        case 500:
            element.src = "./assets/images/10d.png";
            break;
        case 511:
            element.src = "./assets/images/13d.png";
            break;
        case 520:
            element.src = "./assets/images/09d.png";
            break;
        case 701:
            element.src = "./assets/images/50d.png";
            break;
        case 800:
            element.src = "./assets/images/01d.png";
            break;
        case 801:
            element.src = "./assets/images/02d.png";
            break;
        case 802:
            element.src = "./assets/images/03d.png";
            break;
        case 803:
            element.src = "./assets/images/04d.png";
            break;
        default:
          console.log("How did you fuck up?");
          return;
    }
    return;
}

function saveData() {
    
}

function loadData() {
    
}

document.getElementById("search").addEventListener("click", searchFunction);