const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Workspace = new Schema(
    {
        name: { type: String, required: true },
        members: { type: [mongoose.ObjectId], required: false },
        files: { type: [mongoose.ObjectId], required: false },
        tags: [{ 
            tag: { type: String, required: false },
            number: { type: Number, required: false },
        }],
    },
    { timestamps: true },
)

module.exports = mongoose.model('Workspace', Workspace)