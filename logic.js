var apiKey = "pk.eyJ1Ijoic291a2FpbmEyMyIsImEiOiJjazcxM3NpYXQwMnUwM2ZtZHF2bTM0MnE3In0.ETF9QRUxFeu4A0U_9mbxrw"

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: apiKey
});

var map = L.map('map', {
    center: [
      45.52, -122.67
    ],
    zoom: 3
});

graymap.addTo(map);

d3.json('corona.geojson', function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      style: function(feature) {
        return {
          color: "black",
          // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
          fillColor: "red",
          fillOpacity: 0.5,
          weight: 1.5
        };
      },

      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        let msg = 
        layer.bindPopup("<h1>" + feature.properties.province + "</h1> <hr> " +
            "<h2>Confirmed: " + feature.properties.confirmed + "</h2>" +
            "<h2>Deaths: " + feature.properties.deaths + "</h2>" +
            "<h2>Recovered: " + feature.properties.recovered  + "</h2>");
            
      }
    }).addTo(map);
  });


// new!!!!!!
  function countryChange(name){
    console.log(name);

    d3.json("corona.geojson", function(data) {
      console.log(data);
      
      data.features.forEach((feat) => {
        console.log(feat.properties.region);
        console.log(feat);
      })
    });
  
  }