const btoa = require('btoa')
const api = require('./util/api.js')
const qs = require('qs')

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
        const res = await api.post(`/${this.version}/oauth2/token`, qs.stringify(option), {
            headers: {
                'Content-Type': 'x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${this.client_id}:${this.client_secret}`)}`
            }
        })
        if (res.data.message)   throw new Error(res.data.message)
        return res.data
    }

    /**
     * revoke the token
     * @param {string} token 
     * @returns {Promise<object>}
     */
    async revokeToken(token) {
        const res = await api.post(`/${this.version}/oauth2/token/revoke`, `token=${token}`, {
            headers: {
                'Content-Type': 'x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${this.client_id}:${this.client_secret}`)}`
            }
        })
        if (res.data.message)   throw new Error(res.data.message)
        return res.data
    }

    /**
     * get user info
     * @param {string} access_token 
     * @returns {Promise<object>}
     */
    async user(access_token) {
        const res = await api.get(`/${this.version}/users/@me`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        if (res.data.message)   throw new Error(res.data.message)
        return res.data
    }

    /**
     * get user's guilds
     * @param {string} access_token 
     * @returns {Promise<array>}
     */
    async userGuilds(access_token) {
        const res = await api.get(`/${this.version}/users/@me/guilds`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
        if (res.data.message)   throw new Error(res.data.message)
        return res.data
    }
}

module.exports = Oauth
module.exports.Bot = require('./bot')