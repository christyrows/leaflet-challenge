var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
var earthquakes = new L.LayerGroup();


function markerSize(magnitude) {
    return magnitude * 4;
};

d3.json(geoData, function(data) {
    L.geoJSON(data.features, {
        pointToLayer: function (data, coords) {
            return L.circleMarker(coords, { radius: markerSize(data.properties.mag) });
        },

        style: function (eqFeature) {
            return {
                fillColor: mapColors(eqFeature.properties.mag),
                fillOpacity: 0.75,
                weight: 0.1,
                color: 'black'

            }
        },

        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +
                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");
        }
    }).addTo(earthquakes);
    lightMap(earthquakes);
});
var colors = ["red", 'darkorange', 'tan', 'yellow', 'darkgreen', 'lightgreen']

function mapColors(magnitude) {
    if (magnitude > 5) {
        color = colors[0]
    } else if (magnitude > 4) {
        color = colors[1]
    } else if (magnitude > 3) {
        color = colors[2]
    } else if (magnitude > 2) {
        color = colors[3]
    } else if (magnitude > 1) {
        color = colors[4]
    } else {
        color = colors[5]
    }
    return color
};

var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
}).addTo(lightMap);

function lightMap() {L.map("map", {
    center: [40.7, -73.95],
  zoom: 11
  });
}