require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

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

if (command == "moviethis") {
    console.log(command);
    moviethis();
}