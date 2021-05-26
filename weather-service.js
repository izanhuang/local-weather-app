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
var info = null;
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
        temp_min.innerHTML = "Min: " + celsiusToFahrenheit(min) + degreeSymbol + " |&nbsp";
        temp_max.innerHTML = "Max: " + celsiusToFahrenheit(max) + degreeSymbol;
        toggleBtn.innerHTML = "F";
        weather_info.innerHTML = "Wind speed: " 
            + (info.wind.speed*3.6).toFixed(0) + " mph <br>Pressure: " 
            + (info.main.pressure/33.864).toFixed(2) + " inHg <br>Humidity: " 
            + info.main.humidity + "%";
        isCelsius = false;
    } else {
        temperature.innerHTML = celsius + degreeSymbol;
        temp_min.innerHTML = "Min: " + min + degreeSymbol + " |&nbsp";
        temp_max.innerHTML = "Max: " + max + degreeSymbol;
        toggleBtn.innerHTML = "C";
        weather_info.innerHTML = "Wind speed: " 
            + info.wind.speed + " kph <br>Pressure: " 
            + info.main.pressure + " mbar <br>Humidity: " 
            + info.main.humidity + "%";
        isCelsius = true;
    }
}

function celsiusToFahrenheit(celsius){
    return ((celsius * 9/5) + 32).toFixed(1);
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
            temp_min.innerHTML = "Min: " + min + degreeSymbol + " |&nbsp";
            temp_max.innerHTML = "Max: " + max + degreeSymbol;
            info = obj;
            weather_info.innerHTML = "Wind speed: " 
            + info.wind.speed + " kph <br>Pressure: " 
            + info.main.pressure + " mbar <br>Humidity: " 
            + info.main.humidity + "%";
        } else {
            console.log('error')
        }
    }
    request.send()
 
}
