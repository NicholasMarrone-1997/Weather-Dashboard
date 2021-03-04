// 06bf71c585fc92aee380df18e65dac7d

var uvIndex = 'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=06bf71c585fc92aee380df18e65dac7d'
var button = document.querySelector('#button');


//Created a helper function that handles the fetch requests
const fetcher = (url) => {
    fetch(url)
        .then(res => res.json())
        .then(res => {
            return res
        })
};

//Created a function that fetches the urls and calls the function
function handleFetch(url) {
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getData(data);
            getUvIndex(data);
            getFiveDay(data);
        })
}

//Created event listener for button click 
button.addEventListener('click', function (e) {
    e.preventDefault();
    var city = $('#form1').val();
    var userCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06bf71c585fc92aee380df18e65dac7d`;
    handleFetch(userCity);
})

//Created function for displaying data to dashboard
function getData(data) {
    console.log(data);
    var weatherEl = document.querySelector('#city_name');
    weatherEl.textContent = data.name;

    var d = new Date();
    var strDate = "(" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ")";
    weatherEl.append(" ");
    weatherEl.append(strDate);

    var tempEl = document.querySelector('#temp');
    tempEl.append(data.main.temp);

    var humEl = document.querySelector('#hum');
    humEl.append(data.main.humidity);

    var windEl = document.querySelector('#wind');
    windEl.append(data.wind.speed);
}

//Created function to get uv index to display to dashboard
function getUvIndex(data) {
    var long = data.coord.lon;
    var lat = data.coord.lat;
    var uvIndexEl = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${long}&appid=06bf71c585fc92aee380df18e65dac7d`;

    return fetch(uvIndexEl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var uvEl = document.querySelector('#uvi');
            uvEl.textContent = data.value;
        })
}

//Created function to get Five Day Forecast to display on cards
function getFiveDay(data) {
    var city = $('#form1').val();
    var long = data.coord.lon;
    var lat = data.coord.lat;
    var fiveDayEl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=06bf71c585fc92aee380df18e65dac7d`;
    console.log(fiveDayEl);
    return fetch(fiveDayEl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var forecastEl = document.getElementsByClassName("forecast");

            for(var i = 0; i < forecastEl.length; i++){
                // console.log(forecastEl[i].children);
                forecastEl[i].children[0].innerText = "Date: " + data.daily[i].dt;
                forecastEl[i].children[1].innerText = "Icon: " + data.daily[i].weather[i];
                forecastEl[i].children[2].innerText = "Temp: " + data.daily[i].temp[i];
                forecastEl[i].children[3].innerText = "Humidity: " + data.daily[i].humidity;
            }
        })
}