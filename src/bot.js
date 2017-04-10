import Twit from 'twit'
import config from './config'
import { getFunName } from './helpers/helpers'

const Twitter = new Twit(config.twitter)

export const tweetNow = (text) => {
  const tweet = { status: text }

  Twitter.post('statuses/update', tweet, (err, data, response) => {
    if (err) { console.log('ERROR: ', err) }
    console.log('SUCCESS: Replied to Follower')
  })
}

tweetNow(getFunName())

setInterval(() => tweetNow(), 100)
