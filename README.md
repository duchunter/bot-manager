# bot-manager

> Hybrid Vue + Cordova mobile app controlling [Facebook Messenger Bot](https://github.com/duchunter/messenger-auto-reply)

> You must have a [Facebook Messenger Bot](https://github.com/duchunter/messenger-auto-reply) installed on a cloud platform and an Auth0 account with ```admin``` role

## Build Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# run app on browser
npm run web

# check requirements for specific platform
cordova requirements

# run app on Android emulator
npm run android

# build .apk file for android
cordova build android
```

>You can also add ios platform by runnning ```cordova platforms add ios``` and fullfill ```cordova requirements```

## Setup environment variables

Create ```env.js``` with following content:
```javascript
module.exports = {
  CLIENT_ID: 'AUTH0_CLIENT_ID',
  CLIENT_DOMAIN: 'AUTH0_CLIENT_ID',
  AUDIENCE: 'AUTH0_AUDIENCE',
  REDIRECT: 'com.gp.botmanager://gangplank.auth0.com/cordova/com.gp.botmanager/callback',
  BOT_URL: 'YOUR_BOT_SERVER_URL',
}
