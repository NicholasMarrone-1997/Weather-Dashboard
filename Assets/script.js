// 06bf71c585fc92aee380df18e65dac7d

var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=charlotte&appid=06bf71c585fc92aee380df18e65dac7d';
var uvIndex = 'http://api.openweathermap.org/data/2.5/uvi?lat=35.2271&lon=-80.8431&appid=06bf71c585fc92aee380df18e65dac7d';

fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //Display City Name
        console.log(data);
        var weatherEl = document.querySelector('#city_name');
        console.log(weatherEl);
        weatherEl.textContent = data.name;

        var d = new Date();
        var strDate = "(" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear() + ")";
        console.log(strDate);
        weatherEl.append(" ");
        weatherEl.append(strDate);

        var tempEl = document.querySelector('#temp');
        tempEl.append(data.main.temp);
        console.log(tempEl);

        var humEl = document.querySelector('#hum');
        humEl.append(data.main.humidity);
        console.log(humEl);

        var windEl = document.querySelector('#wind');
        windEl.append(data.wind.speed);
        console.log(windEl);

        
    })

    fetch(uvIndex)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //Display City Name
        console.log(data);
        
    })