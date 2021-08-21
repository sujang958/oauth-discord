const app = require('fastify').default()

const Oauth = require('./src/index')
const oauth = new Oauth({
    client_id: ''
})

app.get('/auth', async (req, res) => {
    res.send({a: 1})
})

app.listen(3000, (err) => {
    if (err) throw new Error(err)
    console.log('Listen')
})