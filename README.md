# oauth-discord
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
