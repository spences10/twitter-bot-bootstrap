import Twit from 'twit'
import config from './config'

let Twitter = new Twit(config.twitter)

function tweetNow(text) {
  let tweet = {status: text}

  Twitter.post('statuses/update', tweet, (err, data, response) => {
    if (err) {console.log('ERROR: ', err)}
    console.log('SUCCESS: Replied to Follower')
  })
}

tweetNow('hello world!')
