// 06bf71c585fc92aee380df18e65dac7d

var cityUrl = 'https://api.openweathermap.org/data/2.5/weather?q=charlotte&appid=06bf71c585fc92aee380df18e65dac7d&';

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
        var strDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        console.log(strDate);
        
    })