
    let wall = document.getElementById("wall");
    let city = null;

    var localdatacurrent = JSON.parse(localStorage.getItem("current"));
    console.log(localdatacurrent)
    if(localdatacurrent){
      getMap(localdatacurrent.name)
    }
    weatherDisplay(localdatacurrent);
     
    var localdatadaily = JSON.parse(localStorage.getItem("Daily"));
    console.log(localdatadaily)
    dailyWeather(localdatadaily);
    


 async function getWeather() {

          city = document.querySelector("input").value;
          getMap(city);
        let key = "b5575b1a36375ff172cf6458d836fae2";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
        
        console.log(fetch(url));

        let response = await fetch(url);
        let data = await response.json();

        console.log(data, "curr");
        weatherDisplay(data);
        futureWeather(data);

        localStorage.setItem("current", JSON.stringify(data));
}

function weatherDisplay(data){
   
         wall.innerHTML ="";

     var citytag = document.createElement("h1");
     citytag.textContent = data.name;
     let we_image = document.createElement("img");
     we_image.src= `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

     let inner_div = document.createElement("div");
     inner_div.className ="big_icon"
     var temp = document.createElement("p");
     temp.textContent =`${data.main.temp}°C`;

     var realfeel = document.createElement("p");
     realfeel.textContent = `Realfeel : ${data.main.feels_like}°C`;

     var cloud = document.createElement("h2");
    cloud.textContent = ` ${data.weather[0].description}`;

    inner_div.append(temp, we_image, cloud);

     var maxtemp = document.createElement("p");
    maxtemp.innerHTML = `<i class='fas fa-temperature-high' style='font-size:20px;color:orange'></i>&emsp;Maxtemp : ${data.main.temp_max}°C`;

    var mintemp = document.createElement("p");
    mintemp.innerHTML = `<i class='fas fa-temperature-low' style='font-size:20px;color:orange'></i>&emsp;Mintemp : ${data.main.temp_min}°C`;

    var wind = document.createElement("p");
    wind.innerHTML = `<i class='fas fa-wind' style='font-size:20px;color:orange'></i>&emsp;wind speed : ${data.wind.speed}m/s`;
    
    const sunrise = new Date(data.sys.sunrise * 1000);
    var rise = document.createElement("p");
    rise.setAttribute("id", "sunriseTag");
    rise.innerHTML = `<img src="https://ssl.gstatic.com/onebox/weather/48/sunny.png" width="30px" height="30px"><img>&ensp;Sunrise: ${
     sunrise.getHours() + ":" + convert(sunrise)
    }AM`;

    const sunset = new Date(data.sys.sunset * 1000);
    var set = document.createElement("p");
    set.setAttribute("id", "sunsetTag");
    set.innerHTML = `<img src="https://ssl.gstatic.com/onebox/weather/48/sunny.png" width="30px" height="30px"><img>&ensp;Sunset: ${
     sunset.getHours() + ":" + convert(sunset)
    }PM`;

   let rest_div = document.createElement("div");
   rest_div.className= "rest_div"
    rest_div.append( maxtemp, mintemp, wind, rise, set,  realfeel);

    var weathercont = document.createElement("div");
    weathercont.className= "curr_weather"
    weathercont.append(citytag, inner_div,   rest_div);

    wall.append(weathercont)

}

function convert(time){

  //  time = new Date(time* 1000);

  let x;
  if (time.getMinutes() < 10) {
    x = "0" + time.getMinutes();
    return x
  } else {
    x = time.getMinutes();
    return x;
  }
}

async function getMap(city) {
 
    console.log(city)
   let url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDC1pK-ehrh6rb_p-of308lYLFYYpKrbH4&q=${city}`;
    
    var mapFrame = document.getElementById("map");
    console.log(mapFrame);
       mapFrame.setAttribute("src", url);

}

async function futureWeather (data) {
  

   var lon = data.coord.lon;
   var lat = data.coord.lat;
   console.log(lon)

   let key = "b5575b1a36375ff172cf6458d836fae2";

   let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,current&units=metric&appid=${key}`;

   let response = await fetch(url);

   let res = await response.json();

   console.log(res.daily);
   
   dailyWeather(res.daily);

   localStorage.setItem("Daily", JSON.stringify(res.daily));
   
}

function dailyWeather(weadata){


       let days = ["Sunday", "Monday", "Tuesday" , "Wednesday" , "Thursday", "Friday", "Saturday"];
       let maindailydiv = document.getElementById("daily");
       maindailydiv.innerHTML = "";
  

       weadata.forEach(function (dataeach){

        let timestamp = dataeach.dt;

        let dt = new Date(timestamp * 1000);
        let value = dt.getDay();
        let Day = days[value];
        
        console.log(value);
        let dailydiv = document.createElement("div");

        let dayhead = document.createElement("h2");
        dayhead.textContent = Day;

        let we_image = document.createElement("img");
        we_image.src= `https://openweathermap.org/img/wn/${dataeach.weather[0].icon}@2x.png`;
  
        let temp_div = document.createElement("div");
         temp_div.setAttribute("id", "futuretemps")
         let maxtemp = document.createElement("span");
         maxtemp.textContent = `${dataeach.temp.max}°C`;

         let mintemp = document.createElement("span");
         mintemp.textContent = `${dataeach.temp.min}°C`;
          temp_div.append(maxtemp, mintemp);
         
         dailydiv.append(dayhead, we_image, temp_div );
          
        

         maindailydiv.append(dailydiv);

       }) 

}



