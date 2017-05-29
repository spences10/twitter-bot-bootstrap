import Twiter from 'twitter'
import config from '../config'
import searchId from './search'
import params from './parameters'

const client = new Twiter(config.twitter)

const retweet = async () => {
  let res
  try {
    res = await client.post(`statuses/retweet/:id${searchId()}`)
  } catch (err) {
    console.log('ERR :', err)
  }
  console.log('RES :', res)
}

export default retweet

// const retweet = () => {
//   client.post(`statuses/retweet/${searchId()}`, (error, tweet, response) => {
//     if (!error) {
//       console.log('TWEET================', tweet)
//     } else {
//       console.log('TWEET: ', tweet)
//       // console.log(JSON.stringify(response))
//     }
//   })
// }

// const retweet = () => {
//   client.post('statuses/retweet/:id', {
//     id: searchId
//   }, function (err, response) {
//     if (response) {
//       console.log('RETWEETED!', ' Query String:', params)
//     }
//     // if there was an error while tweeting
//     if (err) {
//       console.log('RETWEET ERROR! Duplication maybe...:', err, 'Query String:', params)
//     }
//   })
// }
