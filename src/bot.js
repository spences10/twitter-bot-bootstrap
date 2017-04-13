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

const client = new Twiter(config.twitter)

const tweetNow = async (txt) => {
  try {
    await client.post('statuses/update', { status: txt })
    console.log(txt)
  } catch (err) {
    console.log(err)
  }
}


tweetNow(getFunName())
setInterval(() => tweetNow(getFunName()), 1000 * 60 * 2)


searchResult()
setInterval(() => searchResult(), 1000 * 5)
