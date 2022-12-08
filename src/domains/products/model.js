const mongoose = require('mongoose')

//Schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: '',
    },
    images: [{
        type: String,
        default: '',
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 225
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
    },
    { timestamps: true })

productSchema.virtual('id').get(function () {
    return this._id.toHexString()
})
productSchema.set('toJSON', {
    virtuals: true,
})

//export product Model
exports.Product = mongoose.model('product', productSchema)