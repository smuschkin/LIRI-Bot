require('dotenv').config();

var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var thing = process.argv;
var song = "";
var movie = "";

var readStuff = function () {
    fs.readFile("random.txt", "utf8", function (err, data) {
        console.log(data);
        if (err) {
            return console.log(err);
        }
        var output = data.split(",");
        if (output.length === 2) {
            commands(output[0], output[1]);
        }
    });
};

var searchSongs = function (song) {
    spotify.search({ type: "track", query: song }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        var songResults = data.tracks.items;
        for (var i = 0; i < songResults.length; i++) {
            console.log[i];
            console.log("Artist(s): " + songResults[i].artists[0].name);
            console.log("Song Name: " + songResults[i].name);
            console.log("Preview Link: " + songResults[i].preview_url);
            console.log("Album: " + songResults[i].album.name);
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
var searchMovie = function (movie) {
    var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieReponse = JSON.parse(body);
            console.log(movieReponse.Title);
            console.log('Title: ' + movieReponse.Title);
            console.log('Year: ' + movieReponse.Year);
            console.log('IMDB Rating: ' + movieReponse.imdbRating);
            console.log('Rotten Tomatoes: ' + movieReponse.Ratings[1].Value);
            console.log('Country: ' + movieReponse.Country);
            console.log('Language: ' + movieReponse.Language);
            console.log('Plot: ' + movieReponse.Plot);
            console.log('Actors: ' + movieReponse.Actors);
        };
    });
};

var commands = function (doStuff, thing) {
    switch (doStuff) {
        case "my-tweets":
            searchTweets();
            break;
        case "spotify-this-song":
            searchSongs(thing);
            break;
        case "movie-this":
            searchMovie(thing);
            break;
        case "do-what-it-says":
            readStuff();
            break;
    };
};

var doStuff = function (argOne, argTwo) {
    commands(argOne, argTwo);
};
doStuff(process.argv[2], process.argv[3]);
