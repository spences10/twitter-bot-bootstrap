import sentiment from '.'

const httpCall = sentiment.init()

httpCall.send(`txt=${'not good bad bad'}`).end(result => {
  const sentim = result.body.result.sentiment;
  const confidence = parseFloat(result.body.result.confidence)
  console.log(confidence, sentim)
  if (sentim === 'Negative' && confidence >= 75) {
    console.log('RETWEET NEG NEG NEG', sentim, 'not good bad bad')
  }
})
