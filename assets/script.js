
//---- API Key ----//
const APIKey= "886571290f5f5737c3eef4cec64106a7";


// ---- Retrieves data using metric system units ---- //
const metricSystem = "&units=metric";


//---- DOM Elements ----//
var inputEl = document.querySelector("#input");
var searchBtnEl = document.querySelector("#search-button");
var citiesListEl = document.querySelector(".cities-list");


// ---- Today ---- //
var currentDay = moment().format("DD MMM YYYY");

//---- Search History List ----//
var sCity=[];



// ----Displays the date ---- //
function currentDate() {
    $("#current-date").text(currentDay);
};
currentDate();



//---- AJAX call for current weather ----//
function currentWeather(city){
    

var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + metricSystem + "&APPID=" + APIKey;

 
    $.ajax({
        url: queryURL,
        method:"GET",
    }).then(function(response){

        var weatherImg= response.weather[0].icon;
        var imgURL="https://openweathermap.org/img/wn/"+ weatherImg +"@2x.png";

        console.log(response); 

        // ---- Populate Main Weather Card ----///
        $("#current-city").html("<h2>" + response.name + "<img src="+imgURL+">" + "</h2>"); 
        $("#temperature").text(response.main.temp + "°C");
        $("#humidity").text(response.main.humidity + "%");
        $("#wind-speed").text(response.wind.speed + "m/s");


        //---- Record and add cities to the list ----//
       forecastWeather(response.name); 
       
       if(response.cod==200){
            sCity=JSON.parse(localStorage.getItem("cityname"))  || [];
            console.log(sCity);
            debugger;
                if(city !== null){
                 
                   if(!sCity.includes(city.toUpperCase())){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cityname",JSON.stringify(sCity));
                    addToList(city); 
                   }  
                  
                }
        }

        

        //---- UV values AJAX call ----//
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + metricSystem + "&APPID=" + APIKey; // coordenadas para los rayos uv
        

        $.ajax ({
            url: uvURL,
            method: "GET"
        })
            .then(function(response) {

                console.log(response); 

                var uvValue = response.value

                // --- Populating UV value field ---- //
                $("#uv-index").text(response.value);
                $("#uv-index").css("background-color", uvColor(uvValue));
            });

    });

    function uvColor(uvValue, colorbgd) { 
        var colorbgd = "";
        if (uvValue <= 2) {
            colorbgd = "#99FF99";
        }
        else if (uvValue <= 5 && uvValue > 2) {
            colorbgd = "#FFCC99";
        }
        else if (uvValue >= 6 && uvValue > 5) {
            colorbgd = "#CC0000";
        }
        return colorbgd;
    }
} 

// ---- Five day forecast AJAX call ---- //
    
function forecastWeather (city){

    
    
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + metricSystem + "&APPID=" + APIKey;
   
    $.ajax ({
        url: forecastURL,
        method: 'GET'
    }) 
    

    .then(function(response) {

        console.log(response); 

            // -- Day 1 -- //
            var date = moment(response.list[7].dt_txt).format("DD MMM YYYY"); 
            var iconCode= response.list[7].weather[0].icon;
            var weatherImg="https://openweathermap.org/img/wn/"+ iconCode + ".png";
            var fcTemp= response.list[7].main.temp;
            var fcHumidity= response.list[7].main.humidity;
            var fcWindSpeed = response.list[7].wind.speed;
        
            $("#d1").html(date);
            $("#img1").html("<img src="+ weatherImg +">");
            $("#temp1").html("  " + fcTemp+"°C");
            $("#hm1").html("  " + fcHumidity+"%");
            $("#img1").html("<img src="+ weatherImg +">");
            $("#speed1").html("  "+ fcWindSpeed + "m/s");
        
            // -- Day 2 -- //
            var date = moment(response.list[15].dt_txt).format("DD MMM YYYY"); 
            var iconCode= response.list[15].weather[0].icon;
            var weatherImg="https://openweathermap.org/img/wn/"+ iconCode + ".png";
            var fcTemp= response.list[15].main.temp;
            var fcHumidity= response.list[15].main.humidity;
            var fcWindSpeed = response.list[15].wind.speed;
        
            $("#d2").html(date);
            $("#img2").html("<img src="+ weatherImg +">");
            $("#temp2").html("  " + fcTemp+"°C");
            $("#hm2").html("  " + fcHumidity+"%");
            $("#img2").html("<img src="+ weatherImg +">");
            $("#speed2").html("  "+ fcWindSpeed + "m/s");
                  


            // -- Day 3 -- //
            var date = moment(response.list[23].dt_txt).format("DD MMM YYYY"); 
            var iconCode= response.list[23].weather[0].icon;
            var weatherImg="https://openweathermap.org/img/wn/"+ iconCode + ".png";
            var fcTemp= response.list[23].main.temp;
            var fcHumidity= response.list[23].main.humidity;
            var fcWindSpeed = response.list[23].wind.speed;
        
            $("#d3").html(date);
            $("#img3").html("<img src="+ weatherImg +">");
            $("#temp3").html("  " + fcTemp+"°C");
            $("#hm3").html("  " + fcHumidity+"%");
            $("#img3").html("<img src="+ weatherImg +">");
            $("#speed3").html("  "+ fcWindSpeed + "m/s");



            // -- Day 4 -- //
            var date = moment(response.list[31].dt_txt).format("DD MMM YYYY");
            var iconCode= response.list[31].weather[0].icon;
            var weatherImg="https://openweathermap.org/img/wn/"+ iconCode + ".png";
            var fcTemp= response.list[31].main.temp;
            var fcHumidity= response.list[31].main.humidity;
            var fcWindSpeed = response.list[31].wind.speed;
        
            $("#d4").html(date);
            $("#img4").html("<img src="+ weatherImg +">");
            $("#temp4").html("  " + fcTemp+"°C");
            $("#hm4").html("  " + fcHumidity+"%");
            $("#img4").html("<img src="+ weatherImg +">");
            $("#speed4").html("  "+ fcWindSpeed + "m/s");




            // -- Day 5 -- //
            var date = moment(response.list[39].dt_txt).format("DD MMM YYYY"); 
            var iconCode= response.list[39].weather[0].icon;
            var weatherImg="https://openweathermap.org/img/wn/"+ iconCode + ".png";
            var fcTemp= response.list[39].main.temp;
            var fcHumidity= response.list[39].main.humidity;
            var fcWindSpeed = response.list[39].wind.speed;
        
            $("#d5").html(date);
            $("#img5").html("<img src="+ weatherImg +">");
            $("#temp5").html("  " + fcTemp+"°C");
            $("#hm5").html("  " + fcHumidity+"%");
            $("#img5").html("<img src="+ weatherImg +">");
            $("#speed5").html("  "+ fcWindSpeed + "m/s");
              

        


    });


};



//--- Add City to the UL ---// 
function addToList(c){
    var listEl= $("<li>"+c.toUpperCase()+"</li>");
    $(listEl).attr("class","list-group-item");
    $(listEl).attr("data-value",c.toUpperCase());
    $(".cities-list").append(listEl);

    // listEl.addEventListener("click", clickHandlerFor(c), false)

}

function handler(c){
    currentWeather(c);
}

//--- Load Cities from localStorage ---//
function loadCities(){
    debugger;
    let cacheCities = JSON.parse(localStorage.getItem('cityname')) || []
    for(let i = 0; i < cacheCities.length; i++){
        addToList(cacheCities[i]);
    }
    
}

// --- Past History ---//
function searchHistory(event){
    var liEl=event.target;
    if (event.target.matches("li")){
        city=liEl.textContent.trim();
        currentWeather(city);
    }

}


//--- Clear History ---// 
function clearHistory(){ // done
    sCity=[];
    localStorage.removeItem("cityname");
    document.location.reload();

}


