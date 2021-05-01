const btoa = require("btoa");
const { default: fetch } = require("node-fetch");


class Oauth {
    constructor(option={
        version: undefined,
        client_secret: undefined,
        client_id: undefined,
        redirect_uri: undefined,
    }) {
        this.version = option.version || 'v8';
        this.client_id = option.client_id.toString();
        this.client_secret = option.client_secret;
        this.redirect_uri = option.redirect_uri;
    }

    /**
     * get Access token
     * @example let token = await Oauth.getToken({
     *   grant_type: 'authorization_code'
     *   code: 'ndvklet5qfgalw3rfafjaaae2';
     *   scope: ['identify'];
     * })
     * @param {Object} option 
     */
    async getToken(option) {
        option.redirect_uri = this.redirect_uri;
        let body = this._urlEncode(option);

        let token_res = await fetch(`https://discord.com/api/${this.version}/oauth2/token`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(`${this.client_id}:${this.client_secret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body,
        });
        let res = await token_res.json();
        return res;
    }

    /**
     * revoke the token
     * @param {string} token 
     * @returns {Promise<object>}
     */
    async revokeToken(token) {
        let token_res = await fetch(`https://discord.com/api/${this.version}/oauth2/token/revoke`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(`${this.client_id}:${this.client_secret}`)}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `token=${token}`
        });
        let res = await token_res.json();
        return res;
    }

    /**
     * get user info
     * @param {string} access_token 
     * @returns {Promise<object>}
     */
    async user(access_token) {
        let res = await fetch(`https://discord.com/api/${this.version}/users/@me`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });
        let user = await res.json();
        return user;
    }

    /**
     * get user's guilds
     * @param {string} access_token 
     * @returns {Promise<array>}
     */
    async userGuilds(access_token) {
        let res = await fetch(`https://discord.com/api/${this.version}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });
        let guilds = await res.json();
        return guilds;
    }

    _urlEncode(obj) {
		let string = "";
		for (let [key, value] of Object.entries(obj)) {
			if (!value)
                continue;
			string += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		}
		return string.substr(1);
	}
}

module.exports = Oauth;