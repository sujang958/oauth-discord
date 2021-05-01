

class Oauth {
    constructor(option={
        version: 'v8',
        client_secret,
        client_id,
        redirect_uri,
    }) {
        this.version = option.version;
        this.client_id = option.client_id.toString();
        this.client_secret = option.client_secret;
        this.redirect_uri = option.redirect_uri;
    }

    async token(option) {
        
    }
}

module.exports = Oauth;