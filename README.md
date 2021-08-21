# oauth-discord
![Generic badge](https://img.shields.io/npm/dw/oauth-discord)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sujang958/oauth-discord)
![npm](https://img.shields.io/npm/v/oauth-discord)
![NPM](https://img.shields.io/npm/l/oauth-discord)
![node-current](https://img.shields.io/node/v/oauth-discord)
> simple discord oauth tool


# Install  
```sh
$ npm i oauth-discord
```  
```sh
$ yarn add oauth-discord
```

# requirements  
> node.js version 12.0.0 or later

# example  
### Access Token
```js
const DiscordOauth = require('oauth-discord');
const oauth = new DiscordOauth({
    version: "v8(option)",
    client_id: 'your client id',
    client_secret: 'your client secret',
    redirect_uri: 'http://localhost:3000/callback',
});

// Using oauth code to get access token
oauth.getToken({
    grant_type: 'authorization_code',
    code: code,
});
// Using refresh token to get access token
oauth.getToken({
    grant_type: 'refresh_token',
    refresh_token: refresh_token,
})
```

### Bot api  
```js
const DiscordOauth = require('oauth-discord');
const Bot = new DiscordOauth.Bot({
    version: "v8(option)",
    token: "your bot token",
});

// Search guild member
Bot.searchGuildMember('guild id', 'search query', search_result_limit)
.then(result => {
    console.log(result);
})
```
