/**
 * Twitter bot to do the following...
 * like tweets that match query
 * retweet tweets that match query
 * reply on user follow
 */

import Twiter from 'twitter'
import config from './config'
import {
  getFunName,
  rando
} from './helpers/helpers'
import params from './helpers/parameters'
// import { searchResult } from './helpers/search'

const client = new Twiter(config.twitter)

const tweetNow = async (txt) => {
  try {
    await client.post('statuses/update', { status: txt })
    console.log(txt)
  } catch (err) {
    console.log(err)
  }
}

// tweetNow(getFunName())

// setInterval(() => tweetNow(getFunName()), 1000 * 60 * 2)

const searchResult = async () => {
  let res
  try {
    res = await client.get('search/tweets', params)
    // const randoUser = rando(res.data.statuses).user.scree_name
    // console.log('rando user = ', randoUser)
  } catch (err) {
    console.log('error = ', err)
  }

  // console.log(JSON.stringify(res))
  console.log(rando(res.statuses).user.screen_name)
  console.log(rando(res.statuses).text)
  console.log(rando(res.statuses).id_str)
}

searchResult()

setInterval(() => searchResult(), 1000 * 5)
