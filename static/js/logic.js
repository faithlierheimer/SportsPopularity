//try to read in nfl data
// d3.csv("nfl.csv").then(function(nfl) {
//     console.log(nfl);
//     // pray to the goddess
//     });

d3.csv("hours-of-tv-watched.csv").then(function(tvData) {

    // Print the tvData
    console.log(tvData);
  
    // Cast the hours value to a number for each piece of tvData
    // tvData.forEach(function(data) {
    //   data.hours = +data.hours;
    });