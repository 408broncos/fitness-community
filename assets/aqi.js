// const iqAir = "1c89bd54-fc84-44cd-adb6-a840d493e162";
// const iqAirImage ="https://www.airvisual.com/images/";
// function getIQAirData(city, state, country) {
//     let url = "https://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=" + country + "&key=" + iqAir;
//     fetch(url).then(function(response){
//         return response.json()

//     }).then(function(data){
//         let aqius = data.data.current.pollution.aqius
//         let icon = data.data.current.weather.ic
//         updateAQI(aqius, icon)
//     })
     
// }
// function updateAQI(aqius, icon){
//     let aqidiv = document.createElement("div")
//     aqidiv.textContent = "AQI: " + aqius;
//     let iconurl = iqAirImage + icon + ".png";
//     let iconimg = document.createElement("img")
//     iconimg.setAttribute("src", iconurl)
// }
// getIQAirData("San Jose", "California", "USA")

