const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Workspace = new Schema(
    {
        name: { type: String, required: true },
        members: { type: [mongoose.ObjectId], required: true },
        files: { type: [mongoose.ObjectId], required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Workspace', Workspace)