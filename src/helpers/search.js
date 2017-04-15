import Twiter from 'twitter'
import config from '../config'
import {
  rando
} from './helpers'
import params from './parameters'

const client = new Twiter(config.twitter)

const searchResult = async () => {
  let res
  try {
    res = await client.get('search/tweets', params)
  } catch (err) {
    console.log('error = ', err)
  }
  // const randoUser = rando(res.data.statuses).user.scree_name
  // console.log('rando user = ', randoUser)
  // console.log(JSON.stringify(res))
  // console.log(rando(res.statuses).user.screen_name)
  // console.log(rando(res.statuses).text)
  console.log(rando(res.statuses).id_str)
  return rando(res.statuses).id_str
}

export default searchResult
