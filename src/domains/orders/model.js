const mongoose = require('mongoose')

//Schema
const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderItem',
        required: true
    }],
    shippingAdress: {
        type: String,
        required: true
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
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
},{ timestamps: true })

orderSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
orderSchema.set('toJSON', {
    virtuals: true,
})


//Schema
const orderItemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
    quantity: {
        type: Number,
        required: true
    }
},{ timestamps: true })


//export order Model
exports.OrderItem = mongoose.model('orderItem', orderItemSchema)
//export order Model
exports.Order = mongoose.model('order', orderSchema)