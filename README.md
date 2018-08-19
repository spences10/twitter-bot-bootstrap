# Twitter bot bootstrap

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](http://opensource.org/licenses/MIT)
[![Chat](https://badges.gitter.im/awesome-twitter-bots/Lobby.svg)][gitter-url]

<!--links-->
[gitter-url]: https://gitter.im/awesome-twitter-bots/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge

<details>
  <summary>Click to expand TOC</summary>

<!-- TOC -->

- [Twitter bot bootstrap](#twitter-bot-bootstrap)
  - [What you'll need](#what-youll-need)
  - [Setup twitter](#setup-twitter)
  - [Setup development environment](#setup-development-environment)
  - [Node 8](#node-8)
  - [Set up the bot](#set-up-the-bot)
  - [Project structure](#project-structure)
  - [Node dependencies](#node-dependencies)
  - [Deploy with now](#deploy-with-now)
  - [Handy tip](#handy-tip)
  - [Links](#links)
  - [License](#license)

<!-- /TOC -->

</details>

This is a bootstrap for setting up a simple Twitter bot with Node.js using the npm `twit` module. The bot will retweet what you specify when configuring it. It will also reply to followers with a selection of canned responses.

As a primer for this, there is a great post by [@amanhimself](https://twitter.com/amanhimself) on making your own twitter bot, check it out in the **Links** section. This is an expansion on that with further detail on configuration and deployment with `now` from Zeit.

Before starting the clock you'll need to set up some accounts if you don't have them already.

## What you'll need

- Twitter account
- Development environment with Node.js and npm
- [Zeit account](https://zeit.co/login)

## Setup twitter

Set up an application on the Twitter account you want to retweet from via: [https://apps.twitter.com/app/new](https://apps.twitter.com/app/new)

As an example, I'll configure the old [@DroidScott](twitter.com/droidscott) twitter account I have so you can follow along.

Straight forward enough for the twitter application, make sure you add your phone number to your Twitter account before clicking the **Create your Twitter application** button.

![](/images/twitter-application-setup.png)

You should now be in the 'Application Management' section where you will need to take note of your keys. You should have your 'Consumer Key (API Key)' and 'Consumer Secret (API Secret)' already available. You'll need to scroll to the bottom of the page and click the **Create my access token** to get the 'Access Token' and 'Access Token Secret' take note of all four of them as you'll need them when setting up the bot.

## Setup development environment

If you don't already have a dev environment with node installed then for a quick-start I'd suggest using [Cloud9](https://c9.io/) you can be up and running in minutes with one of the pre made Node.js environments.

Note that in some regions you will be prompted to enter credit card information to use Cloud9 you will not be charged, there are other options to use like [Glitch](https://glitch.com) if you don't have a credit card. For this guide I'm going to be using Cloud9 which is what will be in the images.

![](/images/c9-node-env.png)

## Node 8

If you're using a c9 environment then you'll need to upgrade `node` which I think comes pre-installed at version 6 which will cause some errors with the code in this repository, so we're going to go with version 8 for this, so, in the terminal:

```shell
nvm install 8 # install node 8
nvm use 8 # set it to use node 8
nvm alias default 8 # default to 8 so version persists after reboots
```

`nvm` stands for Node Version Manager which comes installed by default on c9 machines :+1:

## Set up the bot

In the project tree for the default c9 node application delete the example project files of `client`, `node_modules`, `package.json`, `README.md` and `server.js`. You won't need them, but you can leave them there if you so desire.

![](/images/delete-c9-starter.gif)

In your new Node.js c9 environment go to the terminal and enter:

```shell
git clone https://github.com/spences10/twitter-bot-bootstrap
```

## Project structure

The environment project tree will look something like this:

```text
twitter-bot-bootstrap/
├─ images
├─ node_modules/
├─ src/
│  ├─ api
│  │  ├─ reply.js
│  │  └─ retweet.js
│  ├─ bot.js
│  ├─ config.js
│  └─ rando.js
├─ .env
├─ .gitignore
├─ .snyk
├─ CODE_OF_CONDUCT.md
├─ CONTRIBUTING.md
├─ LICENSE
├─ README.md
├─ index.js
├─ package-lock.json
└─ package.json
```

## Node dependencies

Before configuring the bot we'll need to install the dependencies, cd into the project folder with `cd tw*` in the terminal this will move you to `:~/workspace/twitter-bot-bootstrap (master) $ ` from the terminal enter:

```shell
npm install
```

This will install all the dependencies listed in the `package.json` file.

If you get an errors then I suggest installing the dependencies one by one from the `package.json` file with the same command and the package name at the end:

Here is an example of the `dependencies` in the `package,json` file:

```json
  "dependencies": {
    "dotenv": "4.0.0",
    "snyk": "1.31.0",
    "twit": "2.2.5",
    "unique-random-array": "1.0.0"
  }
```

The npm command to install them all:

```shell
npm install --save dotenv twit unique-random-array snyk
```

Now you can configure the bot. From the terminal enter:

```shell
npm init
```

This will configure the `package.json` file with your details as desired. Just keep hitting return if you're happy with the defaults.

**Make a `.env` file:** make a file named `.env` do it with the terminal with the following command:

```shell
touch .env
```

This should be at the root of your project directory.

Now you'll need to add your Twitter keys to the `.env` file. Just input the keys in their corresponding fields and save the file.

The file structure should look as follows:

```
TWITTER_CONSUMER_KEY=
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=

QUERY_STRING=my super awesome query string!,google,android

RANDOM_REPLY=Hi @${screenName} thanks for the follow! What are you working on today?|@${screenName} thanks for following! What are you working on today?

RESULT_TYPE=mixed
TWITTER_LANG=en

TWITTER_RETWEET_RATE=.1
TWITTER_SEARCH_COUNT=20
```

Note that `RANDOM_REPLY` is split with a pipe `|` and the `QUERY_STRING` is split by a comma `,` this is so that `RANDOM_REPLY` can have a comma in the reply text.

If you can not find the `.env` file in the file structure of your c9 project then you will need to enable the **`Show Hidden Files`** option. In the file view select the settings cog then tick the `Show Hidden Files` option if it is not already checked.

![](/images/c9-hidden-files-check.gif)

Add your API keys to the `.env` file :key:

The `.env` file is where we can configure our bot, here we set what we want to search on, check out the [`twitter-bot-playground`][twee-bot-play] for information on Twitter search.

`QUERY_STRING` should be what you want to retweet tweets on with the search terms separated with commas. `RANDOM_REPLY` again is comma separated replies with the ${ScreenName} which is replaced when replying to the follower. `TWITTER_RETWEET_RATE` is in minutes.

<!--Link-->
[twee-bot-play]: https://github.com/spences10/twitter-bot-playground#use-twitter-search

>NOTE none of the `.env` items have quotes `''` round them or spaces between the key and the value `KEY=value`

```text
TWITTER_CONSUMER_KEY=Fw***********P9
TWITTER_CONSUMER_SECRET=TD************Cq
TWITTER_ACCESS_TOKEN=31**************UC
TWITTER_ACCESS_TOKEN_SECRET=r0************S2

QUERY_STRING=mango,horses,"donald -trump -duck"
RANDOM_REPLY=Hi @${screenName} thanks for the follow! What are you working on today?,@${screenName} thanks for following! What are you working on today?

RESULT_TYPE=mixed
TWITTER_LANG=en

TWITTER_RETWEET_RATE=120
TWITTER_SEARCH_COUNT=20
```

![](/images/clone-and-install.gif)

That should be it. Go to the terminal, enter `npm start` and you should get some output:

![](/images/bot-output.png)

Check the Twitter account:

![](/images/twitter-account.png)

You now have a tweet bot, if you want to have this deployed so it's not just running from your machine or from the c9 machine [which is against their terms of service] then we can go over that next.

## Deploy with now

Got your [Zeit account](https://zeit.co/login) set up? Now is the time if not, then install `now` from the terminal:

```shell
npm i -g now
```

Then `now` from the terminal and you will be prompted to enter your email, you will be sent a confirmation email, click the link and you're ready to go!

![](/images/now-setup-deploy.gif)

If you take a look at the `package.json` file in the `"scripts"` section you see there is one for `"deploy"` this is the command to deploy the bot to `now`, so from the terminal:

```shell
npm run deploy
```

This will use all our environment variables we defined within our `.env` file for use on the now servers.

You will get terminal output with a URL for where your bot is located, click the link and you can watch it get built.

## Handy tip
If you want to add this to your own GitHub repo and don't want to share your API keys :key: with the world then you should turn off tracking on the `.env` file. From the terminal enter this git command:

```shell
git update-index --assume-unchanged .env
```

I have added my most used git commands I use in this [repo][cheetsheets] I use it on a daily basis, please feel free to use it.

<!--link-->
[cheetsheets]: https://github.com/spences10/cheat-sheets/blob/master/git.md

## Links

Credit for the inspiration for this should go to [@amanhimself](https://twitter.com/amanhimself) and his posts on creating your own twitter bot.

* [create-a-simple-twitter-bot-with-node-js](https://hackernoon.com/create-a-simple-twitter-bot-with-node-js-5b14eb006c08#.flysreo60)

* [how-to-make-a-twitter-bot-with-nodejs](https://chatbotslife.com/how-to-make-a-twitter-bot-with-nodejs-d5cb04fdbf97#.h5ah8dq5n)

* [twitter-mctwitbot](https://medium.com/@spences10/twitter-mctwitbot-4d15cd005dc0#.dp9q5f427)

* [awesome-twitter-bots](https://github.com/amandeepmittal/awesome-twitter-bots)

---

## License

MIT License

Copyright (c) 2017, Scott Spence. All rights reserved.
