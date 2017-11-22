var wApi = "https://fcc-weather-api.glitch.me/api/current?";
var lat,lon,curTempC;
var tempUnit = "C";

$(function(){
  //get position
  if(navigator.geolocation){    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    })
  }else{
    alert('Geolocation is not supported by this browser.');
  }
  //getWeather function
 var getWeather = function(lat,lon){
    var urlStr = wApi + lat + "&" + lon;
   $.getJSON( urlStr, function( resp ) { 
    // Log the data to user
    $("#city").text(resp.name+", "+ resp.sys.country);
     curTempC = Math.round(resp.main.temp);
     $("#temp-data").text(curTempC + " " + String.fromCharCode(176));
     $("#temp-unit").text(tempUnit);
     $("#desc").text(resp.weather[0].main);
     $("#weather-icon").attr("src",resp.weather[0].icon.split("?")[0]);  
  });
   $("#temp-unit").click(function(){
     var curTempUnit = $("#temp-unit").text();
     var newTempUnit = (curTempUnit =="C"?"F":"C");
     var fTemp = Math.round(parseInt($("#temp-data").text()) * 9 / 5 + 32);
     $("#temp-unit").text(newTempUnit);
     if(newTempUnit=="F"){
       $("#temp-data").text(fTemp + " " + String.fromCharCode(176));
     }else{
       $("#temp-data").text(curTempC + " " + String.fromCharCode(176));
     }     
   })
   
 }
});