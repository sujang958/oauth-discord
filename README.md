# oauth-discord
> simple discord oauth tool


# Install  
```sh
$ npm i oauth-discord
```  
```sh
$ yarn add oauth-discord
```


# example
```js
const DiscordOauth = require('oauth-discord');
const oauth = new DiscordOauth({
    version: "v8(option)",
    client_id: '12345667',
    client_secret: 'shhhhhhhhh cret',
    redirect_uri: 'http://localhost:3000/callback',
});

// Code
oauth.getToken({
    grant_type: 'authorization_code',
    code: code,
});
// Refresh token
oauth.getToken({
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
})
```