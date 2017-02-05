const unirest = require('unirest')

/*
  Get a new API key at https://market.mashape.com/vivekn/sentiment-3
*/

// Sentiment 3 Mashape API key
var apiKey = 'QqtO3XbGhFmshEmKBxy58FqKLvG3p1rx61ijsnaHTstuRd3jp0'

var sentiment = {}

sentiment.init = function () {
  return unirest.post('https://community-sentiment.p.mashape.com/text/')
  .header('X-Mashape-Key', apiKey)
  .header('Content-Type', 'application/x-www-form-urlencoded')
  .header('Accept', 'application/json')
}

module.exports = sentiment
