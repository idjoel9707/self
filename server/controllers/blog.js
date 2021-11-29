const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./../configs/setting')
const secret = Buffer.from(JWT_SECRET, 'hex')
const { Blog } = require('../models/blog');

class BlogController {
    //CRUD Blog
    static async create(req, res, next) {
        let token = await jwt.verify(req.token, secret)
        console.log(token)
        try {
            const { category, title, content, image } = req.body;
            let obj = {}

            if(category) obj.category = category;
            if(title) obj.title = title;
            if(content) obj.content = content;
            if(image) obj.image = image;

            let result = await Blog.findOneAndUpdate(
                {
                    _id:mongoose.Types.ObjectId()
                },
                obj,
                {
                    new: true, upsert: true, 
                    runValidators: true, 
                    setDefaultOnInsert: true
                }
            )

            console.log(result);

            res.status(201).json({
                success: true,
                message: 'Create a blog success',
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
    static async update(req, res, next) {
        let token = await jwt.verify(req.token, secret)
        try {
            const { id } = req.params;
            const userId = req.userData._id;
            console.log(userId);

            if (!id) return next({ message: "Missing ID Params" });
      
            const updatedData = await Board.findByIdAndUpdate(id, { $set: req.body }, { new: true });

            if (userId != updatedData.user)
                return next({ message: "You're not authorized to edit this part." });
        
            return res.status(200).json({
                success: true,
                message: "Successfully update board!",
                data: updatedData,
            });
        } catch (err) {
            next(err)
        }
    }
    static async getByCategory(req, res, next) {
        let token = await jwt.verify(req.token, secret)
        try {
            const { category } = req.params;

            let result = await Blog.findOne({ category: category })

            if (!result) {
                return res.status(res.statusCode).json({
                    success: false,
                    message: 'Failed to get data',
                    data: result
                })
            } else {
                return res.status(res.statusCode).json({
                    success: true,
                    message: `Success to get data based on this ${category}`,
                    data: result
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async getById(req, res, next) {
        try {
            const { id } = req.body;

            let result = await Blog.findById({ _id: id })

            if (!result) {
                return res.status(res.statusCode).json({
                    success: false,
                    message: 'Failed to get data',
                    data: result
                })
            } else {
                return res.status(res.statusCode).json({
                    success: true,
                    message: `Success to get data based on this ${id}`,
                    data: result
                })
            }
        } catch (err) {
            next(err)
        }
    }
    static async delete(req, res, next) {
        let token = await jwt.verify(req.token, secret)
        try {
            const { id } = req.params;
            const userId = req.userData._id;
  
            if (!id) return next({ message: "Missing ID Params" });
  
            await Blog.findByIdAndRemove(id, (error, doc, res) => {
                if (error) throw "Failed to delete";
                if (!doc) {
                    return next(error);
                } else {
                    if (userId != doc.user) return next({ message: "You're not authorized to  this part." });
            
                    return next({
                        success: true,
                        message: "Successfully delete data!",
                        data: doc,
                    });
                }
            })
        } catch (err) {
            next(err)
        }
    }
    static async archived(req, res, next) {
        let token = await jwt.verify(req.token, secret)
        try {
            const { id } = req.params;
            const userId = req.userData._id;
            console.log(userId);

            if (!id) return next({ message: "Missing ID Params" });
      
            const updatedData = await Board.findByIdAndUpdate(id, { $set: req.body }, { new: true });

            if (userId != updatedData.user)
                return next({ message: "You're not authorized to edit this part." });
        
            return res.status(200).json({
                success: true,
                message: "Successfully update board!",
                data: updatedData,
            });
        } catch (err) {
            next(err)
        }
    }
}

module.exports = BlogController;