const { ROUTES } = require('../server/configs/setting')
//calling controllers
const userController = require('../server/controllers/user')
const Blog = require('../server/controllers/blog')

//calling middlewares
const Auth = require('../server/middlewares/auth')

function routes (app) {
    //routes
    app.get('/',(req, res) => {
        return res.status(res.statusCode).json({
            message: "Hai"
        })
    })

    //User
    app.post(`/${ROUTES}/login`, userController.Login)
    app.post(`/${ROUTES}/register`, userController.Register)
    //Blog
    app.post(`/${ROUTES}/blog/create`, Auth.middleware, Blog.create)
    app.put(`/${ROUTES}/blog/update`, Auth.middleware, Blog.update)
    app.delete(`/${ROUTES}/blog/destroy`, Auth.middleware, Blog.delete)
    app.get('/blog/category', Blog.getByCategory)
    app.get('/blog/:id', Blog.getById)

}

module.exports = routes;