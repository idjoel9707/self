const { ROUTES } = require('../server/configs/setting')
//calling controllers
const userController = require('../server/controllers/user')
const Blog = require('../server/controllers/blog')

//calling middlewares
const Auth = require('../server/middlewares/auth')
const { getRoute } = require('../server/middlewares/api')

function routes (app) {
    //middleware
    app.use((req, res, next) => {
        res.on("finish", () => {
            console.log(`${req.method} : ${getRoute(req)} : ${res.statusCode}`)
        })
        next()
    })

    //routes
    app.get('/',(req, res) => {
        return res.status(res.statusCode).json({
            message: "Hai"
        })
    })

    //User
    app.post(`/administrator/login`, userController.Login)
    app.post(`/administrator/register`, userController.Register)
    //Blog Administrator
    app.post(`/administrator/blog/create`, Auth.middleware, Blog.create)
    app.put(`/administrator/blog/update`, Auth.middleware, Blog.update)
    app.delete(`/administrator/blog/destroy`, Auth.middleware, Blog.delete)
    //Blog for Outside
    app.get('/blog/category', Blog.getByCategory)
    app.get('/blog/:id', Blog.getById)

    //archive blog for Administrator Only

    //Where the socket GO?
}

module.exports = routes;