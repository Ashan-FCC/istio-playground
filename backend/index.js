const express = require('express')

const app = express()

const port = 4000 || process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api', (req, res) => {
    console.log(req.headers)
    if (req.headers['x-authenticated']){
        return res.send('Woohoo')
    }
    return res.status(401).send('Aint no way')
})

app.use((req, res, next) => {
    console.log(`backend couldnt handle this route: ${req.path}`)
    next()
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})