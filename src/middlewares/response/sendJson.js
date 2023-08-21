module.exports = async (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })

    res.sendJson = data => res.end(JSON.stringify(data))
}