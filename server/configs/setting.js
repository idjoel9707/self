const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    MAIL: process.env.MAIL,
    PASSEMAIL: process.env.PASSEMAIL,
    JWT_SECRET: process.env.JWT_SECRET,
    SALT: process.env.SALT_ROUND,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_DATABASE: process.env.DB_DATABASE,
    ROUTES: process.env.ROUTE,
}