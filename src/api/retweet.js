const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
  const query = queryString()

  bot.get(
    'search/tweets',
    {
      q: query,
      result_type: param.resultType,
      lang: param.language,
      filter: 'safe',
      count: param.searchCount
    },
    (err, data, response) => {
      if (err) {
        console.log('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
      } else {
        // grab random tweet ID to retweet - desired range for random number is [0..data.statuses.length-1]
        const rando = Math.floor(Math.random() * data.statuses.length)
        let retweetId

        try {
          retweetId = data.statuses[rando].id_str
        } catch (e) {
          console.log('ERRORDERP: Cannot assign retweeID; exception message: ' + e.message)
          return
        }

        bot.post(
          'statuses/retweet/:id',
          {
            id: retweetId
          },
          (err, response) => {
            if (err) {
              console.log('ERRORDERP: Retweet!')
            }
            console.log('SUCCESS: RT: ', data.statuses[rando].text, 'RANDO ID: ', rando)
          }
        )
      }
    }
  )
}

module.exports = retweet
