const request = require('./util/request.js')

const btoa = (str) => {
    const buf = Buffer.from(str)
    return buf.toString('base64')
}

class Oauth {
    constructor(option={
        version: undefined,
        client_secret: undefined,
        client_id: undefined,
        redirect_uri: undefined,
    }) {
        this.version = option.version || 'v9'
        this.client_id = option.client_id.toString()
        this.client_secret = option.client_secret
        this.redirect_uri = option.redirect_uri
    }

    /**
     * get Access token
     * @example const token = await Oauth.getToken({
     *   grant_type: 'authorization_code',
     *   code: 'ndvklet5qfgalw3rfafjaaae2',
     * })
     * @param {Object} option 
     */
    async getToken(option) {
        option.redirect_uri = this.redirect_uri
        const res = await request({
            method: 'POST',
            path: `/${this.version}/oauth2/token`,
            auth: {
                type: 'Basic',
                creds: btoa(`${this.client_id}:${this.client_secret}`)
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: this._urlEncode(option)
        })
        return res
    }

    /**
     * revoke the token
     * @param {string} token 
     * @returns {Promise<object>}
     */
    async revokeToken(token) {
        const res = await request({
            method: 'POST',
            path: `/${this.version}/oauth2/token/revoke`,
            auth: {
                type: 'Basic',
                creds: btoa(`${this.client_id}:${this.client_secret}`)
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `token=${token}`
        })
        return res
    }

    /**
     * get user info
     * @param {string} access_token 
     * @returns {Promise<object>}
     */
    async user(access_token) {
        const res = await request({
            method: 'GET',
            path: `/${this.version}/users/@me`,
            auth: {
                type: 'Bearer',
                creds: access_token
            },
        })
        return res
    }

    /**
     * get user's guilds
     * @param {string} access_token 
     * @returns {Promise<array>}
     */
    async userGuilds(access_token) {
        const res = await request({
            method: 'GET',
            path: `/${this.version}/users/@me/guilds`,
            auth: {
                type: 'Bearer',
                creds: access_token
            }
        })
        return res
    }

    _urlEncode(e){let n='';for(let[o,t]of Object.entries(e))t&&(n+=`&${encodeURIComponent(o)}=${encodeURIComponent(t)}`);return n.substr(1)}
}

module.exports = Oauth
module.exports.Bot = require('./bot')