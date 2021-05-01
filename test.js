const DiscordOauth = require('oauth-discord');
const oauth = new DiscordOauth({
    version: "v8",
    client_id: '12345667',
    client_secret: 'shhhhhhhhh cret',
    redirect_uri: 'http://localhost:3000/callback',
});