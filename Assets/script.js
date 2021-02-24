// 06bf71c585fc92aee380df18e65dac7d

var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=charlotte&appid=06bf71c585fc92aee380df18e65dac7d';
var uvIndex = 'http://api.openweathermap.org/data/2.5/uvi?lat=35.2271&lon=-80.8431&appid=06bf71c585fc92aee380df18e65dac7d';
var fiveDay = 'http://api.openweathermap.org/data/2.5/forecast?q=charlotte&appid=06bf71c585fc92aee380df18e65dac7d';

console.log(userCity);

var button = document.querySelector('#button');

button.addEventListener('click', function(){
    var city = $('#form1').val();
    var userCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06bf71c585fc92aee380df18e65dac7d`;
    console.log(userCity);
})

fetch(userCity)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //Display City Name
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

        
    })

    fetch(uvIndex)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //Display City Name
        console.log(data);
        var uvIndexEl = document.querySelector('#uvi');
        console.log(uvIndexEl);
        uvIndexEl.append(data.value);
    })

//Start on Five Day Forecast

fetch(fiveDay)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //Display City Name
        console.log(data);
        
    })







