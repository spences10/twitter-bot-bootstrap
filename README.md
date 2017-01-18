# Twitter bot bootstrap

This is a bootstrap for setting up a Twitter bot with Node using the `twit` library, the bot will favorite and retweet what you specify when configuring it, it will also reply to followers with a selection of canned responses.

As a primer for this there are the great posts by @amanhimself on making your own twitter bot and this is an expansion on that with further detail on configuration on Heroku

## What you'll need

- Twitter account [Duh!]
- Development environment with Node.js and NPM
  * c9 account
  * Node.js 
  * NPM
- Heroku account

## Setup twitter

Set up an application on the Twitter account you want to favorite and retweet from via: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new)

As an example I'll configure the old [@DroidScott](twitter.com/droidscott) twitter account I have so you can follow along.

Straight forward enough for the twitter application, just make sure you add your phone number to your Twitter account before clicking the **Create your Twitter application** button.

![](/src/images/twitter-application-setup.png)

You should now be in the 'Application Management' section where you will need to take a note of your keys, you should have your 'Consumer Key (API Key)' and 'Consumer Secret (API Secret)' already available you'll need to scroll to the bottom of the page and click the **Create my access token** to get the 'Access Token' and 'Access Token Secret' take note of all four of them you'll need them when setting up the bot.

## Setup development environment

For this I'm just going to say use [Cloud9](https://c9.io/) as you can be up and running in minutes with one of the pre made Node.js environments.

![](/src/images/c9-node-env.png)

## Set up the bot

In the project tree delete the example project files of `client`, `package.json`, `README.md` and `server.js` you'll not need them.

In your new Node.js c9 environment go to the terminal and `git clone https://github.com/spences10/twitter-bot-bootstrap` 

## Node dependencies

Before configuring the bot we'll need to install some dependencies:

```
npm install --save twit
npm install --save unique-random-array
```

Then cd into your new folder `cd tw*` will move you to `:~/workspace/twitter-bot-bootstrap (master) $ ` form here you can configure the bot.

`npm init`

This will configure the `package.json` file with your details as desired, just keep hitting return if you're happy with the defaults.

Onto the Twitter keys, now you'll need to add these to the `config.js` file and you can then add som keywords for what you want to search on.

![](/src/images/c9-strings-config.png)

That should be it, go to the terminal and enter `npm start` you should get some output:

![](/src/images/bot-output.png)

Check the Twitter account:

![](/src/images/twitter-account.png)

## Project structure

![](/src/images/project-structure.png)

## Heroku

Cool, now we have a bot that we can test on our dev environment but we cant leave it there, we'll need to deploy it to Heroku.

If you haven't done so already set up a Heroku account then create a new app, in the next screen name it if you want, click **Create App**

You'll be presented with your app dashboard and instructions for the deployment method

## Heroku CLI

On your c9 env terminal, log into Heroku

`heroku login`

Enter your credentials.

```
$ cd twitter-bot-bootstrap
$ git init
$ heroku git:remote -a your-heroku-app-name
```

Deploy your application

```
git add .
git commit -am "make it better"
git push heroku master
```

Then check the output with:

`heroku logs -t`

All good? 

## Heroku variables

Now that we have our bot on Heroku we can use environment variables to store our Twitter keys so that if in the future we want to add our code to GitHub we don't have to exclude the `config.js` file or add our keys publicly.

If you take a look at the `config.js` file of this project you'll see there's several lines commented output:

```
module.exports = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};
``` 

All you need to do is go to the console of your Heroku app and select the 'Settings' sections and add in your Twitter keys, click the 'Reveal Config Vars' button and add in the variables with their corresponding values:

```
CONSUMER_KEY
CONSUMER_SECRET
ACCESS_TOKEN
ACCESS_TOKEN_SECRET
```

Once you have the Heroku vars set up then you can un-comment the `module.exports` section in the `config.js` file on your development environment and you're ready to deploy to Heroku again without your Twitter keys.

Your console commands should look something like this:

```
git add .
git commit -m 'some interesting msg' 
git push heroku master
```

Then you can check the Heroku logs again with:

```
heroku logs -t
```

You should now have a bot you can leave to do it's thing forever more, or until you decide you want to change the search criteria :smile:

#### Links

[create-a-simple-twitter-bot-with-node-js](https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08#.flysreo60)

[how-to-make-a-twitter-bot-with-nodejs](https://chatbotslife.com/how-to-make-a-twitter-bot-with-nodejs-d5cb04fdbf97#.h5ah8dq5n)

[twitter-mctwitbot](https://medium.com/@spences10/twitter-mctwitbot-4d15cd005dc0#.dp9q5f427)
