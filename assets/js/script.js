const queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=";
const queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=";
const APIKey = "&appid=ca9d04c00cf40768a9d54466a186a42e";

function fetchData(currentURL, forecastURL) {
    fetch(currentURL)
    .then(function (response) {
        if (!(response.status == 200)) {

            throw new Error("Not 2xx response", {cause: response});
        }
        return response.json();
    }).then(function (data) {
        save(data.name, fetchURLCurrent, fetchURLForecast);
        setMainDisplay(data);
        displayEmotes(document.querySelector(".emote-main"), data.weather[0].icon);
    }).catch(function(err) {
        document.getElementById("form-input").value = "Incorrect input try again!";
    });

    fetch(forecastURL)
    .then(function (response) {
        if (!(response.status == 200)) {

            throw new Error("Not 2xx response", {cause: response});
        }
        return response.json();
    })
    .then(function (data) {
        setForecastDisplay(data);
    }).catch(function(err) {
        document.getElementById("form-input").value = "Incorrect input try again!";
    });;
}

function searchFunction(event) {
    let city = event.srcElement.previousElementSibling.value;
    let fetchURLCurrent = queryURLCurrent + city + "&units=imperial" + APIKey;
    let fetchURLForecast = queryURLForecast + city + "&units=imperial" + APIKey;

    fetchData(fetchURLCurrent, fetchURLForecast);
}

function setMainDisplay(info) {
    const mainInfoElement = document.getElementById("info");
    mainInfoElement.children[0].children[0].textContent = info.name;
    mainInfoElement.children[1].textContent = "Temp: " + info.main.temp + " \u2109";
    mainInfoElement.children[2].textContent = "Wind: " + info.wind.speed + " MPH";
    mainInfoElement.children[3].textContent = "Humidity: " + info.main.humidity + " %";
}

function setForecastDisplay(info) {
    const forecastInfoElement = document.querySelectorAll("figure");
    for (let i = 0; i < forecastInfoElement.length; i++) {
        forecastInfoElement[i].children[0].textContent = info.list[i * 8].dt_txt.slice(0, 10);
        displayEmotes(forecastInfoElement[i].children[1].children[0], info.list[i * 8].weather[0].icon);
        forecastInfoElement[i].children[2].textContent = "Temp: " + info.list[i * 8].main.temp + " \u2109";
        forecastInfoElement[i].children[3].textContent = "Wind: " + info.list[i * 8].wind.speed + " MPH";
        forecastInfoElement[i].children[4].textContent = "Humidity: " + info.list[i * 8].main.humidity + " %";
    }
}

function displayEmotes(element, code) {
    element.src = "./assets/images/" + code + ".png";
    element.style.visibility = "visible";
}

function save(location, weatherURL, forecastURL) {
    let keys = Object.keys(localStorage);
    let boolean = "true";

    for (let i = 0; i < keys.length; i++) {
        if(keys[i] == location) {
            boolean = false;
        }
    }
    localStorage.setItem(location, [weatherURL, forecastURL]);
    if(boolean) {
        let button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = location;
        button.className = 'cities-button';

        button.onclick = function() {
            fetchData(weatherURL, forecastURL);
        };
        document.getElementById('cities').appendChild(button);
    }
}

function load() {
    let archive = {};
    let keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
        archive[keys[i]] = localStorage.getItem(keys[i]);
    }

    for (let i = 0; i < keys.length; i++) {
        let button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = Object.keys(archive)[i];
        button.className = 'cities-button';

        button.onclick = function() {
            fetchData(Object.values(archive)[i].split(",")[0], Object.values(archive)[i].split(",")[1]);
        };
        document.getElementById('cities').appendChild(button);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("search").addEventListener("click", searchFunction);
    load();
});