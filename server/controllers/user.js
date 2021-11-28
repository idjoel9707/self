const { User } = require('../models/user');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./../config/setting')
const secret = Buffer.from(JWT_SECRET, 'hex')
const bcrypt = require('bcrypt')

class userController {
    static async Login(req, res, next) {
        try {
            const { username, password } = req.body;

            let data = await User.findOne({ username: username });

            if (username === data.username && password === bcrypt.compare(password, data.password)) {
                data.token = jwt.sign(data.username, secret)
            } else {
                return res.status(res.statusCode).json({
                    status: false,
                    message: 'Username or Password incorrect'
                })    
            }

            return res.status(res.statusCode).json({
                status: true,
                message: 'Login Success',
                data: data
            })
        } catch (err) {
            next(err);
        }
    }
    static async Register(req, res, next) {
        const {username, name, email, password} = req.body;
        try {
            let obj = {}
            if(name) obj.name = name;
            if(email) obj.email = email;
            if(password) obj.password = password;
            if(username) obj.username = username;

            let result = await User.create(obj);
            console.log(result, '--register');
            const token = jwt.sign(result)
            return res.status(res.statusCode).json({
                status: true,
                message: 'Succesfully create new user',
                token : token
            })
            
        } catch (err) {
            next(err)
        }
    }
}

module.exports = userController;