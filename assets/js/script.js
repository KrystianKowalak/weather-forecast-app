const queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=";
const APIKey = "&appid=ca9d04c00cf40768a9d54466a186a42e";
const searchElement = document.getElementById("search");


function searchFunction(event) {
    let city = event.srcElement.previousElementSibling.value
    let fetchURLCurrent = queryURLCurrent + city + "&units=imperial" + APIKey;

    fetch(fetchURLCurrent)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        setMainDisplay(data);
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


searchElement.addEventListener("click", searchFunction);