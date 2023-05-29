const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movie = new Schema(
    {
        name: { type: String, required: true },
        time: { type: [String], required: true },
        rating: { type: Number, required: true },
        lable: {type: String, required: true},
    },
    { timestamps: true },
)

const User = new Schema(
    {
        account: { type: String, required: true },
        password: { type: String, required: true },
        username : { type: String, required: true },
        workspace: {type: [String], required: true},
    },
    { timestamps: true },
)

const File = new Schema(
    {
        owner: { type: String, required: true },
        time: { type: [String], required: true },
        rating: { type: Number, required: true },
        lable: {type: String, required: true},
    },
    { timestamps: true },
)

const Workspace = new Schema(
    {
        name: { type: String, required: true },
        time: { type: [String], required: true },
        rating: { type: Number, required: true },
        lable: {type: String, required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('movies', Movie)