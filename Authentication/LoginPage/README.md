# Sample Login

This is a sample login page using Kinvey as a backend service.

## Prerequsites

### Setup your project environment variables in `/src/environments`
- kinvey.appKey - (required) your Kinvey app key
- kinvey.appSecret - (required) your Kinvey app secret
- facebook.appId - (optional) your Facebook app id. Only needed if you want to login with Facebook
- channels.facebook - (required if using Facebook Messenger) your Facebook page uri (use 'darvindotai' when using our proxy channel)
- channels.viber - (required if using Viber) your Viber page uri (use 'darvin.ai' when using our proxy channel)

### Setup your Kinvey app
- Create a custom endpoint called LinkAccount using the code from `/cloudFunctions/LinkAccount.js`

## Start it

``` 
npm install
npm start 
```
