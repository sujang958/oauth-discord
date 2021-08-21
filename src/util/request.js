const { default: fetch } = require('node-fetch')
const ENDPOINT = 'https://discord.com/api'

const request = async ({
    method,
    auth,
    path,
    headers,
    body,
}) => {
    const res = await fetch(`${ENDPOINT}${path}`, {
        method,
        headers: {
            ...headers,
            ...(auth && { Authorization: `${auth.type} ${String(auth.creds)}` })
        },
        ...(body && { body })
    })
    const json = await res.json()
    return json
}

module.exports = request