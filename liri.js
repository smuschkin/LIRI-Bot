require('dotenv').config();

var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var searchSongs = function () {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songResults = data.tracks.items;
        for (var i = 0; i < songResults.length; i++) {
            console.log[i];
            console.log("Artist(s): " + songResults[i].artists[0].name);
            console.log("Song Name: " + songResults[i].name);
            console.log("Preview Link: " + songResults[i].preview_URL);
            console.log("Album: " + songResults[i].album);
        };
    });
};

var searchTweets = function () {
    var params = { screen_name: 'nodejs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++)
                console.log(tweets);
        }
    });
};

var URL = `http://www.omdbapi.com/?apikey=${keys.movie.apiKey}&t=Moana`
var searchMovie = function (movie) {
    request(URL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        var movieReponse = JSON.parse(body);
        for (var i = 0; i < movieReponse.length; i++) {
            console.log(movieReponse.Title);
            console.log('Title: ' + movie.Title);
            console.log('Year: ' + movie.Year);
            console.log('IMDB Rating: ' + movie.imdbRating);
            console.log('Rotten Tomatoes: ' + movie.tomatoURL);
            console.log('Country: ' + movie.Country);
            console.log('Language: ' + movie.Language);
            console.log('Plot: ' + movie.Plot);
            console.log('Actors: ' + movie.Actors);
        };
    });
};

var commands = function(command, data) {
    switch (command) {
        case "my-tweets":
            searchTweets();
            break;
        case "spotify-this-song":
            searchSongs();
            break;
        case "movie-this":
            searchMovie();
            break;
        default:
            break;
    };
};

var start = function(argOne, argTwo) {
    commands(argOne, argTwo);
  };
  // MAIN PROCESS
  // =====================================
  start(process.argv[2], process.argv[3]);
