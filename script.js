// set the map center and zoom level
var map = L.map('map').setView([37.771663,-122.425178], 10);

// add legend control layers - global variable with (null, null) allows indiv basemaps and overlays to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: 'topright',
  collapsed: false // false = open by default
}).addTo(map);

/* BASELAYERS */

var lightStreets = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);
controlLayers.addBaseLayer(lightStreets, 'Streets | Light (Carto)');

var darkStreets = new L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});
controlLayers.addBaseLayer(darkStreets, 'Streets | Dark (Carto)');

/* OVERLAYS */


$.getJSON('bib-2019-bay-area.geojson', function ( data ){
  var post_loc = L.geoJson( data, {
    pointToLayer: function (feature, latlng) {
      if(feature.properties.Subregion == 'City and County of San Francisco'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#8dd3c7',
          weight: 1
        })
      } else if(feature.properties.Subregion == 'San Mateo County'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#ffffb3',
          weight: 2
        });
      } else if(feature.properties.Subregion == 'Santa Clara County'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#bebada',
          weight: 2
        });
      } else if(feature.properties.Subregion == 'Marin County' || feature.properties.Subregion == 'Marin'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#fb8072',
          weight: 2
        }); 
      } else if(feature.properties.Subregion == 'Sonoma County'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#1a9641',
          weight: 2
        });
      } else if(feature.properties.Subregion == 'Napa County'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#80b1d3',
          weight: 2
        }); 
      } else if(feature.properties.Subregion == 'Alameda County'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#fdb462',
          weight: 2
        });
      } else if(feature.properties.Subregion == 'Contra Costa County'){
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#b3de69',
          weight: 2
        });           
      } else {
        return L.circleMarker(latlng, {
          radius: 5,
          color: '#fccde5',
          weight: 2
        });
      }
    },
    onEachFeature: function( feature, layer ){
      layer.bindPopup(feature.properties.Cuisine + '<br>' + '<strong>' + feature.properties.Restaurant + '</strong>' + '<br>' + feature.properties.Price)
    }
  }).addTo(map);
  controlLayers.addOverlay(post_loc, 'Bay Area');
});