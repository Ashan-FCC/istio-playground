const { logger } = require('./logger')

const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const validHeader = process.env.VALID || 'foo'


app.use(setAuthHeaders)

app.use((req, res) => {
    const log = logger(req)

    log('Request arrive at auth function!')
    log(`Req path: ${req.path}`)
    log(`Req headers: ${JSON.stringify(req.headers)}`)
    const header = req.headers['auth']
    if (!header) {
        log('No auth headers. Free passing through')
        res.setHeader('no-auth', 1)
        return res.status(200).send('free passing through')
    }
    if (header === validHeader) {
        log('Valid auth headers. Authenticated')
        res.setHeader('authenticated', 1)
        res.setHeader('tw-workspace-id', 123)
        res.setHeader('tw-user-id', 123123123123)
        return res.status(200).send('authenticated')
    }
    log('Invalid auth headers. Authenticated')
    return res.status(401).send('no way jose')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function setAuthHeaders(req, res, next){
    const cookie = req.headers["cookie"]
    if (cookie){
        res.setHeader('cookie', cookie)
    }
    const auth = req.headers["auth"]
    if (auth){
        res.setHeader('auth', auth)
    }
    const authorization = req.headers["authorization"]
    if (authorization){
        res.setHeader('authorization', authorization)
    }
    next()
}
