const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    message : {
        type : String
    },

    user : {
        type : mongoose.Schema.Types.ObjectId
    },

    createdAt : {
        type : Date,
        default : new Date()
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message