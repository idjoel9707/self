const { User } = require('../models/user');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../configs/setting')
const secret = Buffer.from(JWT_SECRET, 'hex')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

class userController {
    static async Login(req, res, next) {
        try {
            const { username, password } = req.body;

            let data = await User.findOne({ username: username });
            console.log(data);

            let isValid = await bcrypt.compare(password, data.password)

            if (username == data.username && isValid) {
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
                data: data.token
            })
        } catch (err) {
            next(err);
        }
    }
    static async Register(req, res, next) {
        const {username, name, email, password} = req.body;
        try {
            let obj = {}
            const salt = await bcrypt.genSalt(10)
            if(name) obj.name = name;
            if(email) obj.email = email;
            if(password) obj.password = await bcrypt.hash(password, salt);
            if(username) obj.username = username;

            let result = await User.findOneAndUpdate(
                {
                    _id:mongoose.Types.ObjectId()
                },
                obj,
                {
                    new: true, upsert: true, 
                    runValidators: true, 
                    setDefaultOnInsert: true
                });

            let data = {
                id: result._id,
                username: result.username,
                name: result.name
            }

            const token = jwt.sign(data, secret)
            return res.status(201).json({
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