const { default: axios } = require('axios')
const ENDPOINT = 'https://discord.com/api'

const api = axios.create({
    baseURL: ENDPOINT
})

module.exports = api