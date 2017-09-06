// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')

const bot = new Twit(config.twitterKeys)

const retweet = require('./api/retweet')
const reply = require('./api/reply')

// retweet on keywords
retweet()
setInterval(retweet, config.twitterConfig.retweet)

// reply to new follower
const userStream = bot.stream('user')
userStream.on('follow', reply)
