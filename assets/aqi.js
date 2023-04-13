const iqAir = "1c89bd54-fc84-44cd-adb6-a840d493e162";

function getIQAirData(city, state, country) {
    let url = "https://api.airvisual.com/v2/city?city=" + city + "&state=" + state + "&country=" + country + "&key=" + iqAir;
}
