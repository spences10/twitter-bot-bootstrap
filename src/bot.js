// Dependencies =========================
var twit = require('twit')
var ura = require('unique-random-array')
var config = require('./config')
var strings = require('./helpers/strings')

var Twitter = new twit(config)

// Frequency in minutes
var retweetFrequency = 5
var favoriteFrequency = 5

// RANDOM QUERY STRING  =========================

var qs = ura(strings.queryString)
var rt = ura(strings.resultType)

// https://dev.twitter.com/rest/reference/get/search/tweets
// A UTF-8, URL-encoded search query of 500 characters maximum, including operators.
// Queries may additionally be limited by complexity.

// RETWEET BOT ==========================

// find latest tweet according the query 'q' in params

// result_type: options, mixed, recent, popular
// * mixed : Include both popular and real time results in the response.
// * recent : return only the most recent results in the response
// * popular : return only the most popular results in the response.

var retweet = function () {
    var paramQS = qs();
    var paramRT = rt();
    var params = {
        q: paramQS,
        result_type: paramRT,
        lang: 'en'
    };
    Twitter.get('search/tweets', params, function (err, data) {
        // if there no errors
        if (!err) {
            // grab ID of tweet to retweet
            try {
                // try get tweet id, derp if not
                var retweetId = data.statuses[0].id_str;
            } catch (e) {
                console.log('retweetId DERP! ', e.message);
                return;
            }
            // Tell TWITTER to retweet
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, function (err, response) {
                if (response) {
                    console.log('RETWEETED!', ' Query String: ' + paramQS);
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('RETWEET ERROR! Duplication maybe...: ', err, ' Query String: ' + paramQS);
                }
            });
        }
        // if unable to Search a tweet
        else {
            console.log('Something went wrong while SEARCHING...');
        }
    });
}

// retweet on bot start
retweet();
// retweet in every x minutes
setInterval(retweet, 60000 * retweetFrequency);

// FAVORITE BOT====================

// find a random tweet and 'favorite' it
var favoriteTweet = function () {
    var paramQS = qs();
    var paramRT = rt();
    var params = {
        q: paramQS,
        result_type: paramRT,
        lang: 'en'
    };

    // find the tweet
    Twitter.get('search/tweets', params, function (err, data) {

        // find tweets
        var tweet = data.statuses;
        var randomTweet = ranDom(tweet); // pick a random tweet

        // if random tweet exists
        if (typeof randomTweet != 'undefined') {
            // Tell TWITTER to 'favorite'
            Twitter.post('favorites/create', {
                id: randomTweet.id_str
            }, function (err, response) {
                // if there was an error while 'favorite'
                if (err) {
                    console.log('CANNOT BE FAVORITE... Error: ', err, ' Query String: ' + paramQS);
                } else {
                    console.log('FAVORITED... Success!!!', ' Query String: ' + paramQS);
                }
            });
        }
    });
};

// favorite on bot start
favoriteTweet();
// favorite in every x minutes
setInterval(favoriteTweet, 60000 * favoriteFrequency);

// STREAM API for interacting with a USER =======
// set up a user stream
var stream = Twitter.stream('user');

// REPLY-FOLLOW BOT ============================

// what to do when someone follows you?
stream.on('follow', followed);

// ...trigger the callback
function followed(event) {
    console.log('Follow Event now RUNNING');
    // get USER's twitter handler (screen name)
    var name = event.source.name
    var screenName = event.source.screen_name
    var userID = event.source.id

    // CREATE RANDOM RESPONSE  ============================
    var responseString = ura([
        `Hi @${screenName} thanks for the follow! !CR`,
        `@${screenName} thanks for following! !CR`,
        `Hey @${screenName} thanks for the follow! !CR`,
        `Thanks for following @${screenName}! !CR`,
        `Thanks for following @${screenName}! I look forward to tweeting with you. !CR`,
        `Hey @${screenName}, thanks for following! !CR`,
        `Awesome @${screenName}, thanks for following! !CR`,
        `Thanks for the follow @${screenName}! !CR`,
        `Thanks for following @${screenName}! How are you today? !CR`
    ]);

    // function that replies back to every USER who followed for the first time
    var tweetResponse = responseString();

    console.log(tweetResponse);
    tweetNow(tweetResponse);

}

// function definition to tweet back to USER who followed
function tweetNow(tweetTxt) {
    var tweet = {
        status: tweetTxt
    };

    // HARCODE user name in and check before RT
    var n = tweetTxt.search(/@UserNameHere/i);

    if (n != -1) {
        console.log('TWEET SELF! Skipped!!');
    } else {
        Twitter.post('statuses/update', tweet, function (err, data, response) {
            if (err) {
                console.log('Cannot Reply to Follower. ERROR!: ' + err);
            } else {
                console.log('Reply to follower. SUCCESS!');
            }
        });
    }
}

// function to generate a random tweet tweet
function ranDom(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}