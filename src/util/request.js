const { default: fetch } = require("node-fetch");
const ENDPOINT = 'https://discord.com/api';


module.exports = async (method, url, auth, header={}, body) => {
    let option = {
        method,
        headers: header
    };
    option.headers.Authorization = `${auth.type} ${auth.creds}`
    if (body)
        option.body = body;

    let res = await fetch(`${ENDPOINT}${url}`, option);
    let json = await res.json();
    
    if (json.error)
        throw new Error(json.error)
    if (json.message)
        throw new Error(json.message)

    return json;
};