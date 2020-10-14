//try to read in nfl data

d3.csv("nfl.csv").then(function(data) {
    // Print the attendance data
    console.log(data);
    //define map
    var myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
      });

    //add tile layer
    // Add a tile layer
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    }).addTo(myMap);
    
    //pass each lat/long to a test marker with a team label
    for(var i = 0; i<data.length; i++){
        L.marker([data[i].lat, data[i].long])
        .bindPopup(`<h3> ${data[i].team} </h3><hr> <h4> Attendance: ${data[i].total_attendance} </h4>`)
        .addTo(myMap);
        //now put in a circle w/different size depending on attendance
        L.circle([data[i].lat, data[i].long], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "red",
            radius: data[i].total_attendance*0.05
        }).addTo(myMap);
    };

    
    
   
    });
    
