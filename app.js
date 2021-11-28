const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const routes = require('./server/routes.js')
const mongoose = require('mongoose')
app.use(cors())
// swaggerDocument = require('./swagger.json')
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: 100000000000}))
app.use(express.static('public'))
const server = http.createServer(app)
const io = require('socket.io')(server)
const dotenv = require('dotenv')
dotenv.config()

routes(app)

const mongoURI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
};
mongoose.connect(mongoURI, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Connected to mongodb!"));

const PORT = process.env.PORT || 5000
server.listen(PORT)
console.log('IDJOELS Run on port: ' + PORT);