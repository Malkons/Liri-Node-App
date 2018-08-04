require("dotenv").config();
var request = require("request");
//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var command = process.argv[2];
var name = process.argv[3];

/*
 `my-tweets`
function mytweets {
    show last 20 tweets
}

 `spotify-this-song`
function spotifythissong(songname) {
    artist, song name, preview link, album
no song- shows "The sign" by "ace of bass"
}

 `movie-this`
function moviethis(moviename) {
    Title, year, IMDB rating, Tomatoes rating, country, language, plot, actors    
}

 `do-what-it-says`
function dowhatitsays () {
    It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
}
*/
function moviethis(moviename) {
    request("http://www.omdbapi.com/?t="+ moviename +"&plot=short&apikey=trilogy", function(error, response) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's Title is: " + JSON.parse(response.body).Title);
    console.log("The movie's release year is: " + JSON.parse(response.body).Year);
    console.log("The movie's IMDB rating is: " + JSON.parse(response.body).imdbRating);
    console.log("The movie's Rotten Tomatoe score is: " + JSON.parse(response.body).Ratings[1].Value);
    console.log("The movie's country of Origin is: " + JSON.parse(response.body).Country);
    console.log("The movie's language is: " + JSON.parse(response.body).Language);
    console.log("The movie's plot is: " + JSON.parse(response.body).Plot);
    console.log("The movie's cast list is: " + JSON.parse(response.body).Actors);
  }
});// end of requst function
} // end of moviethis function

if (command == "moviethis") {

    moviethis(name);
}