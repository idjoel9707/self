const nodemailer = require('nodemailer');
const { MAIL, PASSEMAIL } = require('./setting')

exports.mailService = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: MAIL,
        pass: PASSEMAIL
    }
})