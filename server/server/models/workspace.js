const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Workspace = new Schema(
    {
        name: { type: String, required: true },
        members: { type: [String], required: true },
        files: { type: [String], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Workspace', Workspace)