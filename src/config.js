/** TWITTER APP CONFIGURATION
 * Add your keys to the `.env` file
 * consumer_key
 * consumer_secret
 * access_token
 * access_token_secret
 * Add your account user username
 * Add your sentiment API key
 */
require('dotenv').config()

module.exports = {
  twitter: {
    username: process.env.TWITTER_USERNAME,
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    retweet: process.env.TWITTER_RETWEET_RATE,
    favorite: process.env.TWITTER_FAVORITE_RATE
  },
  sentiment: process.env.SENTIMENT_KEY
}
