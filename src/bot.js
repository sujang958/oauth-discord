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
        let res = await request('GET', `/${this._version}/guilds/${guild_id}`, {
            type: 'Bot',
            creds: this._token,
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
        let res = await request('GET', `/${this._version}/guilds/${guild_id}/channels`, {
            type: 'Bot',
            creds: this._token,
        }, {
            'Content-Type': 'application/json',
        })
        return res
    }

    /**
     * search guild member
     * @param {string} access_token 
     * @param {string} guild_id 
     * @param {any} query 
     * @param {number} limit 
     * @returns {Promise<object[]>}
     */
    async searchGuildMember(guild_id, query, limit=1) {
        if (isNaN(limit)) throw new TypeError('limit can not be other type')
        query = String(query)

        let res = await request('GET',
            `/${this._version}/guilds/${guild_id}/members/search?query=${encodeURIComponent(query)}&limit=${limit}`,
            {
                type: 'Bot',
                creds: this._token,
            }, {
                'Content-Type': 'application/json',
            })
        return res
    }

    /**
     * Kick Guild member
     * @param {string} guild_id 
     * @param {string} user_id 
     * @returns {object}
     */
    async kickGuildMember(guild_id, user_id) {
        let res = await request('DELETE',
            `/${this._version}/guilds/${guild_id}/members/${user_id}`,
            {
                type: 'Bot',
                creds: this._token,
            }, {
                'Content-Type': 'application/json',
            })
        return res
    }

    /**
     * ban guild member
     * @param {string} guild_id 
     * @param {string} user_id 
     * @param {string} reason 
     * @param {number} delete_message_days 
     * @returns {object}
     */
    async banGuildMember(guild_id, user_id, reason='kick', delete_message_days=0) {
        if (typeof delete_message_days !== 'number')
            throw new TypeError('delete_message_days can not be other types')
        if (isNaN(delete_message_days))
            throw new TypeError('delete_message_days can not be other types')
        if (Number(delete_message_days) < 0 || Number(delete_message_days) > 7)
            throw new Error('delete_message_days can be 0~7, can not be other number')

        let res = await request('PUT',
            `/${this._version}/guilds/${guild_id}/bans/${user_id}`,
            {
                type: 'Bot',
                creds: this._token,
            }, {
                'Content-Type': 'application/json',
            }, JSON.stringify({
                reason,
                delete_message_days,
            }))
        return res
    }

}

module.exports = Bot