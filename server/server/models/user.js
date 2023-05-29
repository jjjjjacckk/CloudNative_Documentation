const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        account: { type: String, required: true },
        password: { type: String, required: true },
        username : { type: String, required: true },
        workspace: {type: [String], required: true},
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', User)