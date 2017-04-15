import Twiter from 'twitter'
import config from '../config'
import searchId from './search'

const client = new Twiter(config.twitter)

const retweet = async () => {
  let res
  console.log(client)
  try {
    res = await client.post('statuses/retweet/:id', {
      id: searchId()
    })
    console.log('RES :', res, 'CLIENT :', client)
  } catch (err) {
    console.log('ERR: ', err)
  }
  console.log('RES :', res)
}

export default retweet
