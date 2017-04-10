const config = require('./config')

test('test for empty twitter access token', () => {
  expect(config.twitter.access_token).not.toBe('')
})

test('test for empty twitter access secret', () => {
  expect(config.twitter.access_token_secret).not.toBe('')
})

test('test for empty twitter consumer key', () => {
  expect(config.twitter.consumer_key).not.toBe('')
})

test('test for empty twitter consumer key secret', () => {
  expect(config.twitter.consumer_secret).not.toBe('')
})

test('test for empty sentiment key', () => {
  expect(config.sentiment).not.toBe('')
})
