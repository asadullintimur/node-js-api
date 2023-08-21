const PAYLOAD_METHODS = require('../../constants/payloadMethods')

module.exports = async req => {
    const { method } = req;

    if (!PAYLOAD_METHODS.includes(method)) return;

    return new Promise((resolve, reject) => {
        let body = "";

        req.on('data', chunk =>  {
            body += chunk;
        })

        req.on('end', () => {
            req.body = JSON.parse(body)

            resolve()
        })
    })
}