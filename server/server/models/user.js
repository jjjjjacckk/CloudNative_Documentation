const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        account: { type: String, required: true },
        password: { type: String, required: true },
        username : { type: String, required: true },
        workspace: {type: [mongoose.ObjectId], required: false},
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', User)