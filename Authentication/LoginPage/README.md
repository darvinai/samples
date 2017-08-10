# Sample Login

This is a sample login page using Telerik Platform as a backend service.

## Prerequsites

### Setup your project environment variables in `/src/environments`
- backendServices.appId - (required) your Backend Services app id
- facebook.appId - (optional) your Facebook app id. Only needed if you want to login with Facebook
- channels.facebook - (required if using Facebook Messenger) your Facebook page uri (use 'darvindotai' when using our proxy channel)
- channels.viber - (required if using Viber) your Viber page uri (use 'darvin.ai' when using our proxy channel)

### Setup your Backend Services app
- Create a cloud function called LinkAccount using the code from `/cloudFunctions/LinkAccount.js`

## Start it

``` 
npm install
npm start 
```
