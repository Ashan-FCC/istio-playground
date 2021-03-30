function logger(req) {
    const reqId = req.headers['x-request-id']
    return function(string){
        console.log(`${reqId}: ${string}`)
    }
}

module.exports = {
    logger
}