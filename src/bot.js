/**
 * Twitter bot to do the following...
 * like tweets that match query
 * retweet tweets that match query
 * reply on user follow
 */

import Twiter from 'twitter'
import config from './config'
import {
  getFunName
} from './helpers/helpers'
import searchResult from './helpers/search'
// import retweet from './helpers/retweet'

const client = new Twiter(config.twitter)

const tweetNow = async (txt) => {
  try {
    await client.post('statuses/update', { status: txt })
    console.log(txt)
  } catch (err) {
    console.log(err)
  }
}

// const retweet = async () => {
//   let res
//   try {
//     res = await client.post(`statuses/retweet/:id${searchResult()}`)
//   } catch (err) {
//     console.log('ERR :', err)
//   }
//   console.log('RES :', res)
// }

const tweetId = searchResult()

const retweet = () => {
  client.post(`statuses/retweet/${tweetId}`, (error, tweet, response) => {
    console.log(tweetId)
    if (error) {
      console.log(tweet)
    }
  })
}


// tweetNow(getFunName())
// setInterval(() => tweetNow(getFunName()), 1000 * 60 * 90)

searchResult()
setInterval(() => searchResult(), 1000 * 10)

retweet()
setInterval(() => retweet(), 1000 * 10)
