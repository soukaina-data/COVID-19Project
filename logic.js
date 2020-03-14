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

var myIcon = L.icon({
  iconUrl: 'images/circle.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

function styleInfo(feature) {
  return {
      opacity: 0.5,
      fillColor: 'red',
      color: '#000000',
      radius: getRadius(feature.properties.confirmed),
      stroke: true,
      weight: 0.5
  };
}

function getRadius(confirmed) {
  console.log(confirmed);
  if (confirmed === 0) {
      return 1;
  }
  switch(true){

    case confirmed <= 10:
      return 7;
    case confirmed <= 100:
      return 14;
  }
  return 30;
}

d3.json('corona.geojson', function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Style each feature (in this case a neighborhood)
      
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styleInfo,

      // Called on each feature
      onEachFeature: function(feature, layer) {
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h4>" + feature.properties.province + "</h4> <hr> " +
            "<h6>Confirmed: " + feature.properties.confirmed + "</h6>" +
            "<h6>Deaths: " + feature.properties.deaths + "</h6>" +
            "<h6>Recovered: " + feature.properties.recovered  + "</h6>");

      }
    }).addTo(map);
});

  // // function to add dropdown options
  // var countries = [];
  // for (var i = 0; i < data.length; i++){
  //     var country = data.country;
  //     countries.append(country);
  // }
  // console.log(countries)

  // // need .textContent and .value for each option

  // d3.select("#Country").selectAll("option")
  //   .data(countries)
      //  .enter ()
  //   .append("option")
  //   .value((function(data) {
  //     return data;
  //   }
  //   .textContent(function(data) {
  //     return data;
  //   })));


  //   var selector = d3.select("#Country");

  // // Use the list of sample names to populate the select options
  // d3.json("countries.geojson").then((data) => {
  //   var countryNames = data.country;

  //   // countryNames.forEach((country) => {
  //   //   selector
  //   //     .append("option")
  //   //     .text(country)
  //   //     .property("value", country);
  //   // })
  //   data.features.forEach((feature) => {
  //     selector
  //       .append('option')
  //       .textContent(feature.country.text)
  //       .value('value', feature.country);
  //   })
  // });

  function countryChange(name){
    console.log(name);
    d3.json('countries.geojson',function(data){
      data.features.forEach((feat) => {
        if(feat.properties.country === name){
          console.log(feat);
          let zoom = 5;
          map.setView([feat.geometry.coordinates[1], feat.geometry.coordinates[0]], zoom);
        }
      })
    })
  }

  d3.json('countries.geojson',function(data){
    console.log(data);
    console.log('test');
    var select = document.getElementById('Country'); // this selects the drop down by using the id
    data.features.forEach((feat) => {
      console.log(feat);
      var option = document.createElement("option"); // now we create one option each time we iterate the country list
      option.text = feat.properties.country;
      option.value = feat.properties.country;
      select.appendChild(option);
    })
  })