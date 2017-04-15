import unirest from 'unirest'

/*
  Get a new API key at https://market.mashape.com/vivekn/sentiment-3
*/

const sentiment = {}

sentiment.init = () => unirest.post('https://community-sentiment.p.mashape.com/text/')
  .header('X-Mashape-Key', process.env.SENTIMENT_KEY)
  .header('Content-Type', 'application/x-www-form-urlencoded')
  .header('Accept', 'application/json')

export default sentiment
