const request = require('./util/request.js')

class Bot {
    /**
     * @param {string} version
     * @param {string} token 
     */
    constructor(option = {
        token: undefined,
        version: undefined,
    }) {
        this._token = option.token
        this._version = option.version || 'v9'
    }
    
    /**
     * get user guild by guild id
     * @param {string} access_token 
     * @param {string} guild_id 
     * @returns {Promise<object>}
     */
    async guild(guild_id) {
        const res = await request({
            method: 'GET',
            path: `/${this._version}/guilds/${guild_id}`,
            auth: {
                type: 'Bot',
                creds: this._token,
            },
        })
        return res
    }

    /**
     * get guild channels
     * @param {String} access_token 
     * @param {String} guild_id 
     * @returns {Promise<object[]>}
     */
    async guildChannels(guild_id) {
        const res = await request({
            method: 'GET',
            path: `/${this._version}/guilds/${guild_id}/channels`,
            auth: {
                type: 'Bot',
                creds: this._token,
            },
        })
        return res
    }

    /**
     * search guild member
     * @param {string} guild_id 
     * @param {string} query 
     * @param {number} limit 
     * @returns {Promise<object[]>}
     */
    async searchGuildMember(guild_id, query, limit=1) {
        if (isNaN(limit)) throw new TypeError('limit`s type is number, can`t be other types')
        const res = await request({
            method: 'GET',
            path: `/${this._version}/guilds/${guild_id}/members/search?query=${encodeURIComponent(String(query))}&limit=${limit}`,
            auth: {
                type: 'Bot',
                creds: this._token,
            }
        })
        return res
    }

    /**
     * Kick Guild member
     * @param {string} guild_id 
     * @param {string} user_id 
     * @returns {Promise<object>}
     */
    async kickGuildMember(guild_id, user_id) {
        const res = await request({
            method: 'DELETE',
            path: `/${this._version}/guilds/${guild_id}/members/${user_id}`,
            auth: {
                type: 'Bot',
                creds: this._token,
            }
        })
        return res
    }

    /**
     * ban guild member
     * @param {string} guild_id 
     * @param {string} user_id 
     * @param {string} reason 
     * @param {number} delete_message_days 
     * @returns {Promise<object>}
     */
    async banGuildMember({
        guild_id,
        user_id,
        reason,
        delete_message_days,
    }) {
        if (isNaN(delete_message_days))
            throw new TypeError('delete_message_days`s type is Number, can`t be other types')
        if (Number(delete_message_days) < 0 || Number(delete_message_days) > 7)
            throw new Error('delete_message_days`s range is 0~7')

        const res = await request({
            method: 'PUT',
            path: `/${this._version}/guilds/${guild_id}/bans/${user_id}`,
            auth: {
                type: 'Bot',
                creds: this._token,
            },
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...(reason && { reason }),
                delete_message_days,
            })
        })
        return res
    }

}

module.exports = Bot