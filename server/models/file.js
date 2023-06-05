const mongoose = require('mongoose')
const Schema = mongoose.Schema

const File = new Schema(
    {
        name: { type: String, required: true },
        tag: { type: [String], required: true },
        owner: { type: mongoose.ObjectId, required: true },
        data: { type: String, required: false },
        history: [{
            // user_id: { type: mongoose.ObjectId, required: false },
            username: { type: String, required: true },
            time: { type: String, required: false },
            origin_text: { type: String, required: false },
            modify_text: { type: String, required: false },
        }],
        snapshot: [{
            time: { type: String, required: false },
            plain_text: { type: String, required: false },
        }],
    },
    { timestamps: true },
)

module.exports = mongoose.model('File', File)