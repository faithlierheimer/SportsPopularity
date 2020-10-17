//try to read in mlb data
// API key
// const API_KEY = "pk.eyJ1Ijoicm95YWxwdGF5bG9yIiwiYSI6ImNqdHFoY2RqMzBmYnQzeXBhcmx4aHFwMWgifQ.3lpPLU-7q52st7zCooenSw";

d3.csv("../../mlb_attendance.csv").then(function(mlbdata) {
    // Print the attendance nfldata
    console.log("mlb data", mlbdata);
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
    for(var i = 0; i<mlbdata.length; i++){
        var color = "";
        if (mlbdata[i].Home_attendance > 800000 && mlbdata[i].Home_attendance < 1000000) {
            color = "#fee5d9";
        }
        else if (mlbdata[i].Home_attendance > 1000000 && mlbdata[i].Home_attendance < 3000000) {
            color = "#fcae91";
        }
        else if (mlbdata[i].Home_attendance > 3000000 && mlbdata[i].Home_attendance < 4100000) {
            color = "#fb6a4a";
        }
        else if (mlbdata[i].Home_attendance > 4100000) {
            color = "#cb181d";
        }
        else {
            color = "red";
        }

        //now put in a circle w/different size depending on attendance
        L.circle([mlbdata[i].Lat, mlbdata[i].Long], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: mlbdata[i].Home_attendance*0.06
        }) .bindPopup(`<h3> ${mlbdata[i].Team_Names} </h3><hr> <h4> Attendance: ${mlbdata[i].Home_attendance} </h4>`)
           .addTo(myMap);
    };

    
    
   
    });
    
