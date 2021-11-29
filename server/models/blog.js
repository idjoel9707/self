const mongoose = require('mongoose');
const { Schema } = mongoose;
const unique = require("mongoose-unique-validator")

const blogSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        // default: ''
    },
    archive: {
        type: Integer,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

exports.Blog = mongoose.model("Blog", blogSchema)