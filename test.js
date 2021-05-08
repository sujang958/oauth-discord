const Oauth = require('oauth-discord');
const express = require('express');

const app = express();
const oauth = new Oauth({
    client_id: "asdf",
    client_secret: "asdf",
    redirect_uri: "http://localhost:3000/callback",
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/callback', async (req, res) => {
    const token = await oauth.getToken({
        grant_type: 'authorization_code',
        code: req.query.code,
    });
    console.log(token);
    let guilds = await oauth.userGuilds(token.access_token);
    console.log(await oauth.revokeToken(token.access_token));
});

app.listen(3000 ,() => {
    console.log('Listen');
});
