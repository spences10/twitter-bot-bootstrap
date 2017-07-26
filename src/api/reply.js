const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const randomReply = unique(param.randomReply.split('|'))
const randomEmoji = unique(param.randomEmoji.split(','))

const bot = new Twit(config.twitterKeys)

// function: tweets back to user who followed
function tweetNow(text) {
  let tweet = {
    status: text
  }

  // toss a coin weather or not to reply
  if (Math.floor(Math.random() * 2) === 0) {
    bot.post('statuses/update', tweet, (err, data, response) => {
      if (err) {
        console.log('ERRORDERP Reply', err.message)
      }
      console.log('SUCCESS: Replied: ', text)
    })
  }
}

// function: replies to user who followed
const reply = (event) => {
  // get user's twitter handler/screen name
  let screenName = event.source.screen_name
  console.log('EVENT SCREEN NAME: ', screenName)
  console.log('CONFIG SCREEN NAME: ', config.twitterConfig.username)
  if (screenName == config.twitterConfig.username) {
    return
  }
  const response = randomReply() + randomEmoji()

  const res = response.replace('${screenName}', screenName)

  tweetNow(res)
}

module.exports = reply
