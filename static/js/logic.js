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
    nfl_prices = []

    //nba price
    nba_prices = []

    //nhl price
    nhl_prices = []

    //mlb price
    mlb_prices = []

    //Make color scale for NFL Ticket Prices
    for(var i = 0; i<sportsdata.nfl.length; i++){
 
        //Putting Price NFL
        nfl_prices.push(L.circle([sportsdata.nfl[i].lat, sportsdata.nfl[i].long], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: sportsdata.nfl_tickets[i].tic_price*0.06
        }) .bindPopup(`<h3> ${sportsdata.nfl[i].team} </h3><hr> <h4> Ticket Price: ${sportsdata.nfl_tickets[i].tic_price} </h4>`));
    };
    
    //Make color scale for MLB Ticket Prices
    for(var i = 0; i<sportsdata.mlb.length; i++){
 
        //Putting Price MLB
        mlb_prices.push(L.circle([sportsdata.mlb[i].lat, sportsdata.mlb[i].long], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: color,
            radius: sportsdata.mlb_tickets[i].tic_price*0.06
        }) .bindPopup(`<h3> ${sportsdata.mlb[i].team} </h3><hr> <h4> Ticket Price: ${sportsdata.mlb_tickets[i].tic_price} </h4>`));
    };

//for loop for nba data, Ticket Prices 
    for(var i = 0; i<sportsdata.nba.length; i++){
        //Putting Price NBA
            nba_prices.push(
            L.circle([sportsdata.nba[i].Lat, sportsdata.nba[i].Lng], {
                fillOpacity: 0.75,
                color: "white",
                fillColor: nba_color,
                radius: sportsdata.nba_tickets[i].tic_price*0.06
            })
            .bindPopup(`<h3> ${sportsdata.nba[i].Team} </h3><hr> <h4> Ticket Prices: ${sportsdata.mlb[i].tic_price} </h4>`)
        );
    };

 //for loop for nhl data, Ticket Prices
 for(var i = 0; i<sportsdata.nba.length; i++){
    //Putting Price NHL
        nhl_prices.push(
        L.circle([sportsdata.nhl[i].Lat, sportsdata.nhl[i].Lng], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: nba_color,
            radius: sportsdata.nhl_tickets[i].tic_price*0.06
        })
        .bindPopup(`<h3> ${sportsdata.nhl[i].Team} </h3><hr> <h4> Ticket Prices: ${sportsdata.nhl[i].tic_price} </h4>`)
    );
};

    //for loop for nhl data: 
        
    //make nfl data layer 
    var nfl = L.layerGroup(nfl_data);

    //make mlb data layer
    var mlb = L.layerGroup(mlb_data);

    //make nhl data layer 
    var nhl = L.layerGroup(nhl_data);

    //make nba data layer 
    var nba = L.layerGroup(nba_data);

    //make nfl price layer 
    var nfl_prices = L.layerGroup(nfl_prices);

    //make nba data layer 
    var mlb_prices = L.layerGroup(mlb_prices);

    //make nba data layer 
    var nhl_prices = L.layerGroup(nhl_prices);

    //make nba data layer 
    var nba_prices = L.layerGroup(nba_prices);


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
        NHL: nhl,    
        NBA: nba,
        "NFL Prices": nfl_prices,
        "MLB Prices": mlb_prices,
        "NHL Prices": nhl_prices,
        "NBA Prices": nba_prices
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