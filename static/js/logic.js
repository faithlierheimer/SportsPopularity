//try to read in nfl data

d3.csv("nfl.csv").then(function(data) {
    // Print the attendance data
    console.log(data);
    var latlng = [];
    //push latlong numbers to own array? 
    for(i=0; i<data.length; i++){
        latlng.push(data[i].lat);
        latlng.push(data[i].long);
    };
    //alright so this works
    console.log(latlng)
    //way to use it tho: lat for a given location
    //is latlng[0] + 2, long is latlng[1] +2 
    
    
    //pass each lat/long to a test marker with a team label
    for(var i = 0; i<data.length; i++){
        var m = L.marker([data[i].lat, data[i].long]);
        m.bindPopup(`<h3> ${data[i].team} </h3><hr> <h4> Attendance: ${data[i].total_attendance} </h4>`)
    };
    
    });
    
