const request = require('./util/request');

class Bot {
    /**
     * @param {string} version
     * @param {string} token 
     */
    constructor(option = {
        token: undefined,
        version: undefined,
    }) {
        this._token = option.token;
        this._version = option.version || 'v8';
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
        });
        return res;
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
        });
        return res;
    }

    /**
     * search guild member
     * @param {string} access_token 
     * @param {string} guild_id 
     * @param {string} query 
     * @param {number} limit 
     * @returns {Promise<object[]>}
     */
    async searchGuildMember(guild_id, query, limit=1) {
        if (isNaN(limit)) throw new TypeError('limit can not be other type')

        let res = await request('GET',
        `/${this._version}/guilds/${guild_id}/members/search?query=${encodeURIComponent(query)}&limit=${limit}`,
        {
            type: 'Bot',
            creds: this._token,
        }, {
            'Content-Type': 'application/json',
        });
        return res;
    }
}

module.exports = Bot;