# Sample Login

This is a sample login page using Telerik Platform as a backend service.

## Prerequsites

### Setup your project environment variables in `/src/environments`
- backendServices.appId - your Backend Services app id
- facebook.appId - your Facebook app id. Only needed if you want to login with Facebook
- channels.facebook - your Facebook page uri (eg. 'darvindotai')
- channels.viber - your Viber page uri (eg, 'darvindotai')

### Setup your Backend Services app
- Create a cloud function called LinkAccount using the code from `/cloudFunctions/LinkAccount.js`

## Start it

``` 
npm install
npm start 
```