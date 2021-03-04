// 06bf71c585fc92aee380df18e65dac7d

var uvIndex = 'http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=06bf71c585fc92aee380df18e65dac7d'
var button = document.querySelector('#button');
var cities = [];

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

    cities.push(city); //update city array before storing in local storage
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage.getItem("cities"));
    
    var listSearch = document.getElementById("list");

    listSearch.innerHTML = "";

    var test = JSON.parse(localStorage.getItem("cities"))


    for(let i = 0; i < test.length; i++){
        var list = document.createElement("li");
        list.classList.add("list-group-item");
        list.append(test[i]);
        console.log(list)
        listSearch.appendChild(list);
    }
})

//Created function for displaying data to dashboard
function getData(data) {
    console.log(data);
    var weatherEl = document.querySelector('#city_name');
    weatherEl.innerText = data.name;

    var d = new Date();
    var strDate = "(" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ")";
    weatherEl.innerText = " ";
    weatherEl.innerText = strDate;

    var tempEl = document.querySelector('#temp');
    tempEl.innerText = "Temperature: " + data.main.temp;


    var humEl = document.querySelector('#hum');
    humEl.innerText = "Humidity: " + data.main.humidity;

    var windEl = document.querySelector('#wind');
    windEl.innerText = "Wind Speed: " + data.wind.speed;
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
            var uvNumber = data.value;
            uvEl.innerText = "UV Index: " + uvNumber;
            console.log(uvNumber);

            if (uvNumber > 7) {
                $('#uvi').css('color', 'red');
            } else if (uvNumber === 4 || uvNumber === 4.1 || uvNumber === 4.2 || uvNumber === 4.3 || uvNumber === 4.4 || uvNumber === 4.5 || uvNumber === 4.6 || uvNumber === 4.7 || uvNumber === 4.8 || uvNumber === 4.9 || uvNumber === 5 || uvNumber === 5.1 || uvNumber === 5.2 || uvNumber === 5.3 || uvNumber === 5.4 || uvNumber === 5.5 || uvNumber === 5.6 || uvNumber === 5.7 || uvNumber === 5.8 || uvNumber === 5.9 || uvNumber === 6 || uvNumber === 6.1 || uvNumber === 6.2 || uvNumber === 6.3 || uvNumber === 6.4 || uvNumber === 6.5 || uvNumber === 6.6 || uvNumber === 6.7 || uvNumber === 6.8 || uvNumber === 6.9){
                $('#uvi').css('color', 'yellow');
            } else{
                $('#uvi').css('color', 'green');
            }
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

            for (var i = 0; i < forecastEl.length; i++) {
                // console.log(forecastEl[i].children);
                forecastEl[i].children[0].innerText = "Date: " + data.daily[i].dt;
                forecastEl[i].children[1].innerHTML = '<img src="http://openweathermap.org/img/w/' + data.daily[i].weather[0].icon + '.png" />'
                forecastEl[i].children[2].innerText = "Temp: " + data.daily[i].temp.day;
                forecastEl[i].children[3].innerText = "Humidity: " + data.daily[i].humidity;
            }
        })
}