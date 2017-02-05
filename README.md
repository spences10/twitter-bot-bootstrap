# Twitter bot bootstrap

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](http://opensource.org/licenses/MIT)

This is a bootstrap for setting up a Twitter bot with Node.js using the `twit` library. The bot will favorite and retweet what you specify when configuring it. It will also reply to followers with a selection of canned responses.

As a primer for this, there is a great post by [@amanhimself](https://twitter.com/amanhimself) on making your own twitter bot. This is an expansion on that with further detail on configuration on Heroku.

## What you'll need

- Twitter account [Duh!]
- Development environment with Node.js and NPM
  * c9 account
  * Node.js
  * NPM
- Heroku account

## Setup twitter

Set up an application on the Twitter account you want to favorite and retweet from via: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new)

As an example, I'll configure the old [@DroidScott](twitter.com/droidscott) twitter account I have so you can follow along.

Straight forward enough for the twitter application, just make sure you add your phone number to your Twitter account before clicking the **Create your Twitter application** button.

![](/src/images/twitter-application-setup.png)

You should now be in the 'Application Management' section where you will need to take note of your keys. You should have your 'Consumer Key (API Key)' and 'Consumer Secret (API Secret)' already available. You'll need to scroll to the bottom of the page and click the **Create my access token** to get the 'Access Token' and 'Access Token Secret' take note of all four of them as you'll need them when setting up the bot.

## Setup development environment

For this I'm just going to say use [Cloud9](https://c9.io/) as you can be up and running in minutes with one of the pre made Node.js environments.

![](/src/images/c9-node-env.png)

## Set up the bot

In the project tree delete the example project files of `client`, `package.json`, `README.md` and `server.js`. You won't need them, but you can leave them there if you desire.

In your new Node.js c9 environment go to the terminal and enter:

```
$ git clone https://github.com/spences10/twitter-bot-bootstrap
```

## Project structure

The environment project tree should look something like this:

![](/src/images/project-structure.png)

## Node dependencies

Before configuring the bot we'll need to install the dependencies, from the terminal enter:

```
$ npm install
```

Then cd into your new folder. `cd tw*` will move you to `:~/workspace/twitter-bot-bootstrap (master) $ `. From here you can configure the bot. From the terminal enter:

```
$ npm init
```

This will configure the `package.json` file with your details as desired. Just keep hitting return if you're happy with the defaults.

Now you'll need to add your Twitter keys to the `.env` file. Just input the keys in their corresponding fields and save the file.
```
CONSUMER_KEY=Fw***********P9
CONSUMER_SECRET=TD************Cq
ACCESS_TOKEN=31**************UC
ACCESS_TOKEN_SECRET=r0************S2
```

Then you can then add some keywords into the `strings.js` file for what you want to search for as well as sub-queries.

![](/src/images/c9-strings-config.png)

*add query and sub-query strings*

*you can also update blocked strings to block more stuff*

When adding sub-query strings make sure you leave a space at the beginning of the string so `' handy tip'` gets concatenated onto `'node.js'` as `node.js handy tip` and not `node.jshandy tip`.

Then add the username of the Twitter account you are using to the `tweetNow` function in the `bot.js` file. This will ensure your bot doesn't reply to itself when it has been followed by a user.

![](/src/images/c9-strings-config1.png)

This step isn't strictly necessary if this account isn’t going to be following any users.

That should be it. Go to the terminal, enter `npm start` and you should get some output:

![](/src/images/bot-output.png)

Check the Twitter account:

![](/src/images/twitter-account.png)

## Heroku

Cool, now we have a bot that we can test on our dev environment, but we can't leave it there. We'll need to deploy it to Heroku.

If you haven't done so already, set up a [Heroku account](https://signup.heroku.com) then select **Create a new app** from the dropdown box on the top right of your dashboard. On the next screen, name the app if you want and then click **Create App**.

![](/src/images/heroku-create-new-app.png)

You'll be presented with your app dashboard and instructions for the deployment method.

![](/src/images/heroku-deploy.png)

Your app name should be displayed on the top of your dashboard. You'll need this when logging in with the Heroku CLI.

![](/src/images/heroku-app-name.png)

## Heroku CLI

We're going to deploy initially via the Heroku Command Line Interface (*CLI*).

On your c9 environment terminal, log into Heroku [it should be installed by default]

```
$ heroku login
```

Enter your credentials.

```
$ cd twitter-bot-bootstrap
$ git init
$ heroku git:remote -a your-heroku-app-name
```

Deploy your application.

```
$ git add .
$ git commit -am 'make it better'
$ git push heroku master
```

You should get build output on the terminal:

![](/src/images/heroku-build.png)

Then check the output with:

```
$ heroku logs -t
```

All good? Cool! :sunglasses:

## Heroku variables

Now that we have our bot on Heroku we need to add environment variables to store our Twitter keys. This is because the `.env` file where we stored our keys is listed in the `.gitignore` file, which tells git not to upload that file to Heroku. It also makes it so if in the future we want to add our code to GitHub we don't have to worry about the `.env` file making our keys public, because the file will automatically be ignored.

All you need to do is go to the console of your Heroku app and select the 'Settings' sections and add in your Twitter keys from the `.env` file. Click the 'Reveal Config Vars' button and add in the variables with their corresponding values:

```
CONSUMER_KEY
CONSUMER_SECRET
ACCESS_TOKEN
ACCESS_TOKEN_SECRET
```

Once you have the Heroku vars set up, take a look at the `config.js` file of this project. You are going to delete this line:

```
require('dotenv').config();
```

You're now ready to deploy to Heroku again. Your console commands should look something like this:

```
$ git add .
$ git commit -m 'add environment variables'
$ git push heroku master
```

Then you can check the Heroku logs again with:

```
$ heroku logs -t
```

You should now have a bot you can leave to do its thing forever more, or until you decide you want to change the search criteria :smile:

## Heroku deployment via GitHub

You can also deploy your app by connecting to GitHub and deploy automatically to Heroku each time your master branch is updated on GitHub, this is straight forward enough.

Go to the ‘Deploy’ dashboard on Heroku, select GitHub as the deployment method. If you have connected your GitHub account to your Heroku account then you can search for the repository. If you forked this repo, then you can just enter `twitter-bot-bootstrap` and **Search**. You can then click the **Connect** button and now you can auto deploy from GitHub!

![](/src/images/heroku-connect-github.png)


## Heroku troubleshooting

What do you mean it crashed!?

![](/src/images/heroku-crash.png)

Ok, I found that sometimes the `worker` is set as `web` and it crashes out. Try setting the `worker` again:

```
$ heroku ps:scale worker=0
$ heroku ps:scale worker=1
```

Other useful Heroku commands I use:

```
$ heroku restart
```

By default you can only push your master branch if you are working on a development branch i.e. `dev` branch. If you want to test on Heroku, then you can use:

```
$ git push heroku dev:master
```

## Contributing
Please fork this repository and contribute back using pull requests.

Any contributions, large or small, major features, bug fixes and integration tests are welcomed and appreciated but will be thoroughly reviewed and discussed.

#### Links

Credit for the inspiration for this should go to [@amanhimself](https://twitter.com/amanhimself) and his posts on creating your own twitter bot.

[create-a-simple-twitter-bot-with-node-js](https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08#.flysreo60)

[how-to-make-a-twitter-bot-with-nodejs](https://chatbotslife.com/how-to-make-a-twitter-bot-with-nodejs-d5cb04fdbf97#.h5ah8dq5n)

[twitter-mctwitbot](https://medium.com/@spences10/twitter-mctwitbot-4d15cd005dc0#.dp9q5f427)

[awesome-twitter-bots](https://github.com/amandeepmittal/awesome-twitter-bots)

---

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### License

MIT License

Copyright (c) 2017, Scott Spence. All rights reserved.
