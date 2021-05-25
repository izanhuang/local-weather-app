var loc = document.getElementById("location");
var temperature = document.getElementById("temperature");
var high = document.getElementById("icon");
var temp_min = document.getElementById("temp_min");
var temp_max = document.getElementById("temp_max");
var weather = document.getElementById("weather");
var weather_info = document.getElementById("weather_info");
var celsius = null;
var min = null;
var max = null;
var isCelsius = true;
var degreeSymbol = "&#176;";


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showGeneralLocation);
} else { 
    loc.innerHTML = "Geolocation is not supported by this browser.";
}

function toggle(){
    var toggleBtn = document.getElementById("toggleButton");
    if (isCelsius) {
        var fahr = celsiusToFahrenheit(celsius);
        temperature.innerHTML = fahr + degreeSymbol;
        temp_min.innerHTML = celsiusToFahrenheit(min) + degreeSymbol;
        temp_max.innerHTML = celsiusToFahrenheit(max) + degreeSymbol;
        toggleBtn.innerHTML = "F";
        isCelsius = false;
    } else {
        temperature.innerHTML = celsius + degreeSymbol;
        temp_min.innerHTML = min + degreeSymbol;
        temp_max.innerHTML = max + degreeSymbol;
        toggleBtn.innerHTML = "C";
        isCelsius = true;
    }
}

function celsiusToFahrenheit(celsius){
    return ((celsius * 9/5) + 32).toFixed(0);
}

function showGeneralLocation(position) {
    var latitude = position.coords.latitude;
    latitude = latitude.toFixed(2);
    var longitude = position.coords.longitude;
    longitude = longitude.toFixed(2);
    
    var route = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=' + latitude + '&lon=' + longitude;

    var request = new XMLHttpRequest()
    request.open('GET', route , true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            var obj = data;
            loc.innerHTML = obj.name + ', ' + obj.sys.country;
            icon.setAttribute("src", obj.weather[0].icon);
            weather.innerHTML = obj.weather[0].main;
            celsius = obj.main.temp.toFixed(1);
            temperature.innerHTML = celsius + degreeSymbol;
            min = obj.main.temp_min.toFixed(1);
            max = obj.main.temp_max.toFixed(1);
            temp_min.innerHTML = min + degreeSymbol;
            temp_max.innerHTML = max + degreeSymbol;
            weather_info.innerHTML = "Wind speed: " 
            + (obj.wind.speed*3.6).toFixed(0) + " mph <br>Pressure: " 
            + (obj.main.pressure/33.864).toFixed(2) + " inHg <br>Humidity: " 
            + obj.main.humidity + "%";
        } else {
            console.log('error')
        }
    }
    request.send()
 
}
