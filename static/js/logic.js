//try to read in nfl data

d3.json("http://127.0.0.1:5000/api/v1.0/sports_attendance").then(function(sportsdata) {
    // Check the data 
    //TO ACCESS MLB DATA AT HIGHEST LEVEL: sportsdata.mlb, then iterate from there
    //OTHER DATA SHOULD FOLLOW SUIT: sportsdata.nfl, sportsdata.nhl, etc. 
    console.log(sportsdata.mlb[1].lat);
    
    //initialize NFL layer 
    nfl_data = []

    //initialize MLB layer 
    mlb_data = []

    //INITIALIZE NHL LAYER HERE
    nhl_data = []

    //INITIALIZE NBA LAYER HERE
    nba_data = []

    //nfl prices
    nfl_price = []

    //nba price
    nba_price = []

    //nhl price
    nhl_price = []

    //mlb price
    mlb_price = []

    //Make color scale for NFL attendance
    for(var i = 0; i<sportsdata.nfl.length; i++){
        var color = "";
        if (sportsdata.nfl[i].attendance > 800000 && sportsdata.nfl[i].attendance < 900000) {
            color = "#fee5d9";
        }
        else if (sportsdata.nfl[i].attendance > 900000 && sportsdata.nfl[i].attendance < 1000000) {
            color = "#fcae91";
        }
        else if (sportsdata.nfl[i].attendance > 1000000 && sportsdata.nfl[i].attendance < 1100000) {
            color = "#fb6a4a";
        }
        else if (sportsdata.nfl[i].attendance > 1100000) {
            color = "#cb181d";
        }
        else {
            color = "red";
        }
        //now put in a circle w/different size depending on attendance
        nfl_data.push(L.circle([sportsdata.nfl[i].lat, sportsdata.nfl[i].long], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: sportsdata.nfl[i].attendance*0.06
        }) .bindPopup(`<h3> ${sportsdata.nfl[i].team} </h3><hr> <h4> Attendance: ${sportsdata.nfl[i].attendance} </h4>`));
    };
    
    //make color scale for MLB attendance 
    for(var i = 0; i<sportsdata.mlb.length; i++){
        var mlb_color = "";
        if (sportsdata.mlb[i].attendance > 800000 && sportsdata.mlb[i].attendance < 1000000) {
            mlb_color = "white";
        }
        else if (sportsdata.mlb[i].attendance > 1000000 && sportsdata.mlb[i].attendance < 2000000) {
            mlb_color = "blue";
        }
        else if (sportsdata.mlb[i].attendance > 2000000 && sportsdata.mlb[i].attendance < 3000000) {
            mlb_color = "red";
        }
        else if (sportsdata.mlb[i].attendance > 3000000) {
            mlb_color = "green";
        }
        else {
            mlb_color = "black";
        }
        //circles about attendance for MLB data
        mlb_data.push(L.circle([sportsdata.mlb[i].lat, sportsdata.mlb[i].long], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: mlb_color,
            radius: sportsdata.mlb[i].attendance*0.06
        }) 
        .bindPopup(`<h3> ${sportsdata.mlb[i].team} </h3><hr> <h4> Attendance: ${sportsdata.mlb[i].attendance} </h4>`));
    };

//for loop for nba data, includes color scale and markers. 
    for(var i = 0; i<sportsdata.nba.length; i++){
        var nba_color = "";
        if (sportsdata.nba[i].Total_attendance > 800000 && sportsdata.nba[i].Total_attendance < 900000) {
            nba_color = "#fee5d9";
        }
        else if (sportsdata.nba[i].Total_attendance > 900000 && sportsdata.nba[i].Total_attendance < 1000000) {
            nba_color = "#fcae91";
        }
        else if (sportsdata.nba[i].Total_attendance > 1000000 && sportsdata.nba[i].Total_attendance < 1100000) {
            nba_color = "#fb6a4a";
        }
        else if (sportsdata.nba[i].Total_attendance > 1100000) {
            nba_color = "#cb181d";
        }
        else {
            nba_color = "red";
        }
        nba_data.push(
            L.circle([sportsdata.nba[i].Lat, sportsdata.nba[i].Lng], {
                fillOpacity: 0.75,
                color: "white",
                fillColor: nba_color,
                radius: sportsdata.nba[i].Total_attendance*0.06
            })
            .bindPopup(`<h3> ${sportsdata.nba[i].Team} </h3><hr> <h4> Attendance: ${sportsdata.mlb[i].attendance} </h4>`)
        );
    };

//for loop for nhl data: 
    for(var i = 0; i<sportsdata.nhl.length; i++){
        var nhl_color = "";
        if (sportsdata.nba[i].Total_attendance > 800000 && sportsdata.nhl[i].Total_attendance < 900000) {
            nhl_color = "#fee5d9";
        }
        else if (sportsdata.nba[i].Total_attendance > 900000 && sportsdata.nhl[i].Total_attendance < 1000000) {
            nhl_color = "#fcae91";
        }
        else if (sportsdata.nba[i].Total_attendance > 1000000 && sportsdata.nhl[i].Total_attendance < 1100000) {
            nhl_color = "#fb6a4a";
        }
        else if (sportsdata.nhl[i].Total_attendance > 1100000) {
            nhl_color = "#cb181d";
        }
        else {
            nhl_color = "red";
        }
        nhl_data.push(
            L.circle([sportsdata.nhl[i].Lat, sportsdata.nhl[i].Lng], {
                fillOpacity: 0.75,
                color: "white",
                fillColor: nhl_color,
                radius: sportsdata.nhl[i].Total_attendance*0.06
            })
            .bindPopup(`<h3> ${sportsdata.nhl[i].Team} </h3><hr> <h4> Attendance: ${sportsdata.hl[i].attendance} </h4>`)
        );
    };

        

    //make nfl data layer 
    var nfl = L.layerGroup(nfl_data);

    //make mlb data layer
    var mlb = L.layerGroup(mlb_data);

    //make nhl data layer 
    var nhl = L.layerGroup(nhl_data);

    //make nba data layer 
    var nba = L.layerGroup(nba_data);

    //make nfl price layer 
    var nfl_prices = L.layerGroup(nfl_price);

    //make nba data layer 
    var mlb_prices = L.layerGroup(mlb_price);

    //make nba data layer 
    var nhl_prices = L.layerGroup(nhl_price);

    //make nba data layer 
    var nba_prices = L.layerGroup(nba_price);


    //streetmap and darkmap layer 
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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
      });

      // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

     // Create overlay object to hold our overlay layer
    var overlayMaps = {
        NFL: nfl,
        MLB: mlb,
        // NHL: nhl,
        NBA: nba,
        // "NFL Prices": nfl_prices,
        // "MLB Prices": mlb_prices,
        // "NHL Prices": nhl_prices,
        // "NBA Prices": nba_prices
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
        37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, nfl]
    });

    // Pass our map layers into our layer control
// Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
    });