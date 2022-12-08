const mongoose = require('mongoose')


//Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    }
},
{ timestamps: true })

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
userSchema.set('toJSON', {
    virtuals: true,
})

//export user Model
exports.User = mongoose.model('user', userSchema)

exports.userSchema = userSchema