const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const validHeader = process.env.VALID || 'foo'

app.use((req, res) => {
    console.log('Request arrive at auth function!')
    const header = req.headers['auth']
    if (header === validHeader) {
        res.setHeader('x-authenticated', 1)
        return res.status(200).send('authenticated')
    }
    return res.status(401).send('no way jose')
})

app.use((req, res, next) => {
    console.log(`auth verify couldnt handle this route: ${req.path}`)
    next()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})