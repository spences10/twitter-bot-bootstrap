// listen on port so now.sh likes it
const { createServer } = require('http')

// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')

const bot = new Twit(config.twitterKeys)

const reply = require('./api/reply')
const retweet = require('./api/retweet')

const param = config.twitterConfig
const trackWords = param.queryString.split(',')

// use stream to track keywords
const trackStream = bot.stream('statuses/filter', {
  track: trackWords
})
trackStream.on('tweet', retweet) // retweet

const userStream = bot.stream('user')
userStream.on('follow', reply) // follow

// This will cause the bot/server to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(3000)
