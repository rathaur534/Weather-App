// Vanilla Javascript
const apiKey = "c12dd4f9dc2b246f3df1949b5bcf52ef";
const apiUlr = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const input = document.getElementById("input-box");
const button = document.getElementById("button");
const device_location = document.querySelector(".device-location");
device_location.addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser does not support geolocation api ");
    }
});

function onSuccess(position) {
    console.log(position);
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);

    const api = "https://api.openweathermap.org/data/2.5/weather?&appid=c12dd4f9dc2b246f3df1949b5bcf52ef&units=metric";
    fetch(api + `&lat=${latitude}` + `&lon=${longitude}`).then(response => response.json()).then(result => WeatherDetails(result));

}

function her(info) {
    console.log(info);
}

function onError(error) {
    alert(error);
}

async function weather(city) {
    const response = await fetch(apiUlr + city + `&appid=${apiKey}`);
    if (response.status === 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";


    } else {
        const data = await response.json();
        WeatherDetails(data);

    }


}

function WeatherDetails(data) {
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    const img = document.querySelector(".weather-icon");
    if (data.weather[0].main === "Clear") {
        img.src = "images/clear.png";
    } else if (data.weather[0].main === "Clouds") {
        img.src = "images/clouds.png";
    } else if (data.weather[0].main === "Rain") {
        img.src = "images/Rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        img.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        img.src = "images/mist.png";
    } else if (data.weather[0].main === "Snow") {
        img.src = "images/snow.png";
    } else if (data.weather[0].main === "Haze") {
        img.src = "images/haze.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    console.log(data);
}
button.addEventListener('click', function() {
    if (input.value === "") {
        alert("Enter city name");
    } else {
        weather(input.value);
    }
});