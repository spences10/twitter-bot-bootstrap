// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')

const bot = new Twit(config.twitterKeys)

const retweet = require('./api/retweet')

// retweet on keywords
retweet()
setInterval(retweet, config.twitterConfig.retweet)

// reply to new follower


