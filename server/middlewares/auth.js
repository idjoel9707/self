const {JWT_SECRET} = require('./../configs/setting')
const secret = Buffer.from(JWT_SECRET, 'hex')
const jwt = require('jsonwebtoken')

function middleware(req, res, next) {
	try {
		const bearerHeader = req.headers['authorization']
		if (typeof bearerHeader !== 'undefined') {
			const bearer = bearerHeader.split(' ')
			const bearerToken = bearer[1]
			req.token = bearerToken
			next()
		} else {
			return res.status(401).send({
				"message": "You are not authorized!"
			})
		}
	} catch (e) {
		console.log(e)
	}
}

function tokenGenerator(user) {
    const {_id, username} = user;
    return jwt.sign({ _id, username }, secret )
}

module.exports = { middleware, tokenGenerator };