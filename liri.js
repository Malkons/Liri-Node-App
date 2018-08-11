
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var name = process.argv.slice(3).join(" ");

// Movie This function
function moviethis(moviename) {
    request("http://www.omdbapi.com/?t=" + moviename + "&plot=short&apikey=trilogy", function (error, response) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("The movie's Title is: " + JSON.parse(response.body).Title);
            console.log("The movie's release year is: " + JSON.parse(response.body).Year);
            console.log("The movie's IMDB rating is: " + JSON.parse(response.body).imdbRating);
            console.log("The movie's Rotten Tomatoe score is: " + JSON.parse(response.body).Ratings[0].Value);
            console.log("The movie's country of Origin is: " + JSON.parse(response.body).Country);
            console.log("The movie's language is: " + JSON.parse(response.body).Language);
            console.log("The movie's plot is: " + JSON.parse(response.body).Plot);
            console.log("The movie's cast list is: " + JSON.parse(response.body).Actors);
        }
    }); // end of requst function
} // end of moviethis function

// Spotify this song function
function spotifythissong(songname) {
    if (!songname) {
        songname = "The Sign";
    }
    spotify.search({ type: 'track', query: songname, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("The song Artist is: " + data.tracks.items[1].artists[0].name);
        console.log("The song name is: " + data.tracks.items[1].name);
        console.log("The preview_url is: " + data.tracks.items[1].preview_url);
        console.log("The album name is: " + data.tracks.items[1].album.name);
    }); // end of search function
} // end of spotifythissong function


// Tweetthis function
function tweetthis(name) {
    var params = { screen_name: name };

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < 20; i++) {
                console.log(tweets[i].text + "\n");
            }
        }
    }); // end of get function
} // end of tweetthis function


// Do what I say function
function dowhatisay() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);


        /// Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        spotify.search({ type: 'track', query: dataArr, limit: 10 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("The song Artist is: " + data.tracks.items[1].artists[0].name);
            console.log("The song name is: " + data.tracks.items[1].name);
            console.log("The preview_url is: " + data.tracks.items[1].preview_url);
            console.log("The album name is: " + data.tracks.items[1].album.name);
        }); // end of search function
    }); //end of readFile function
} // end of dowhatisay function

// Commands
if (command == "moviethis") {
    moviethis(name);
}

if (command == "spotifythissong") {
    spotifythissong(name);
}

if (command == "tweetthis") {
    tweetthis(name);
}

if (command == "dowhatisay") {
    dowhatisay(name);
}