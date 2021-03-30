const { logger } = require('./logger')

const express = require('express')

const app = express()

const port = 4000 || process.env.PORT

app.get('/', (req, res) => {
    res.send(req.headers)
})

app.get('/api', (req, res) => {
    const log = logger(req)
    log('Request arrive at /api function!')
    log(`Req path: ${req.path}`)
    log(`Req headers: ${JSON.stringify(req.headers)}`)
    if (req.headers['no-auth']){
        log('No auth required')
        return res.send(req.headers)
    }

    if (req.headers['authenticated']){
        log('Authenticated request')
        return res.send(req.headers)
    }
    log('failed to auth')
    return res.status(401).send('Aint no way')
})

app.get('/healthcheck', (req, res) => {
    return res.status(200).send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})