// add your own access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2t3b25nODMiLCJhIjoiY2tvbHNqN2F6MHEyejJwbzdoMWxwZzFhNiJ9.jorHl8yiNeUzDcAFwa_uRw';
// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.08927333556, 42.350803759733076],
  zoom: 13,
});
map.on('load', function () {
  map.addSource('route', {
    'type': 'geojson',
    'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'LineString', 
        }
    }
  });
  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
    },
  });
});

// This array contains the coordinates for all bus stops of route #1
async function addBus(){
    // get bus data
    const locations = await getBusLocations();
    console.log(new Date());
    var buses = locations.length;

    for (let i=0; i<= mapMarkers.length - 1; i++ ) {
    mapMarkers[i].remove();
    }
    mapMarkers = [];
    for (let i = 0; i <= buses - 1; i++){
    // locations.forEach(function(marker) {
            if(locations[i].attributes.direction_id == 1){
            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'inbound';
   
        // make a marker for each feature and add to the map
        var newmarker = new mapboxgl.Marker(el)
        .setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude]).addTo(map);
        
        mapMarkers.push(newmarker);
        } else{
        var el = document.createElement('div');
        el.className = 'outbound';

        // make a marker for each feature and add to the map
        var newmarker = new mapboxgl.Marker(el)
        .setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude]).addTo(map)
    
        mapMarkers.push(newmarker);
        }
    };
    setTimeout(addBus, 15000);
}
// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
}
let mapMarkers = [];
// fire the function
addBus();