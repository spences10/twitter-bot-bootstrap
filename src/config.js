require('dotenv').config()

module.exports = {
  twitterKeys: {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  },
  twitterConfig: {
    queryString: process.env.QUERY_STRING,
    resultType: process.env.RESULT_TYPE,
    language: process.env.TWITTER_LANG,
    username: process.env.TWITTER_USERNAME,
    retweet: process.env.TWITTER_RETWEET_RATE * 1000 * 60,
    like: process.env.TWITTER_LIKE_RATE * 1000 * 60,
    quote: process.env.TWITTER_QUOTE_RATE * 1000 * 60,
    searchCount: process.env.TWITTER_SEARCH_COUNT,
    randomReply: process.env.RANDOM_REPLY
  }
}
