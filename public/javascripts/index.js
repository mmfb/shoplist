/* Leaflet: https://leafletjs.com/examples/quick-start/ */
/* Mapbox: https://www.mapbox.com/studio/account/tokens/ */
var loc = [38.753726, -9.199441];
console.log("Start");
window.onload = function () {
	console.log("Loaded");
    var mymap = L.map('map').setView(loc, 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoibWJ1Z2FsaG8iLCJhIjoiY2phOWdhbWR5MGprdDJ5cDgzenR5MXMxMCJ9.n38CZPOHiDjdbKXw2YuEmA'
}).addTo(mymap);
var marker = L.marker(loc).addTo(mymap);

}