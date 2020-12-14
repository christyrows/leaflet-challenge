var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
var earthquakes = new L.LayerGroup();


function markerSize(magnitude) {
    return magnitude * 4;
};

d3.json(geoData, function(data) {
console.log(data)


})