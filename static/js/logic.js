//try to read in nfl data

d3.csv("nfl.csv").then(function(nfldata) {
    // Print the attendance nfldata
    console.log(nfldata);
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
    for(var i = 0; i<nfldata.length; i++){
        var color = "";
        if (nfldata[i].total_attendance > 800000 && nfldata[i].total_attendance < 900000) {
            color = "#fee5d9";
        }
        else if (nfldata[i].total_attendance > 900000 && nfldata[i].total_attendance < 1000000) {
            color = "#fcae91";
        }
        else if (nfldata[i].total_attendance > 1000000 && nfldata[i].total_attendance < 1100000) {
            color = "#fb6a4a";
        }
        else if (nfldata[i].total_attendance > 1100000) {
            color = "#cb181d";
        }
        else {
            color = "red";
        }

        //now put in a circle w/different size depending on attendance
        L.circle([nfldata[i].lat, nfldata[i].long], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: nfldata[i].total_attendance*0.06
        }) .bindPopup(`<h3> ${nfldata[i].team} </h3><hr> <h4> Attendance: ${nfldata[i].total_attendance} </h4>`)
           .addTo(myMap);
    };

    
    
   
    });
    
