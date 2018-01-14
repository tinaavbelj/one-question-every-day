const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token']

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
            if (err) {
                return res.status(404).send('Failed to authenticate token')
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(403).send('No token provided')
    }
}

module.exports = verifyToken
