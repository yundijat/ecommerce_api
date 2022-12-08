const { OrderItem, Order } = require('./model')
const jwt = require('jsonwebtoken')


exports.addOrder = async (req, res) =>{
    try{
        //save each item in the orderItem list
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOderItem = new OrderItem({
            product: orderItem.product,
            quantity: orderItem.quantity
        })
        newOderItem = await newOderItem.save()

        return newOderItem._id
    }))
    //Request token & Secret
    const token = req.headers['authorization'].split(" ")[1]
    const secret = process.env.SECRET

    //userId & resolvedOrderItemsIds
    const user = jwt.verify(token, secret).userId
    const resolvedOrderItemsIds = await orderItemsIds

    const { shippingAdress, city, zip, country, phone, totalPrice } = req.body
    if(!user || !resolvedOrderItemsIds)
        return res.status(404).json({success: false, message: 'Invalid ID or order products'})
    
    let order = new Order({
        
        orderItems: resolvedOrderItemsIds, 
        shippingAdress, city, zip, country, phone, totalPrice, user
    })

    order = await order.save()
    if(!order)
        return res.status(404).send('order can not be created..!')

    res.status(200).json({success: true, order})
    }catch(err){
    return res.status(500).json({success: false, error: err})
}

}


exports.updateOderStatus = async (req, res) =>{
    try{
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            {new: true}
            )
        if(!order)
            return res.status(404).send('No order was found with the id.!')

        res.status(200).json({success: true, order})
    }catch(err){
        return res.status(400).json({success: false, error: err})
    }
}

exports.deleteOrder = async (req, res) =>{
    try{
        let order = await Order.findByIdAndRemove(req.params.id)
            if(order){
                await order.orderItems.map(async orderItem => {
                    await OrderItem.findByIdAndRemove(orderItem)
                })
                res.status(200).json({success: true, message: 'order was deleted successfully'})
            }else{
                res.status(404).json({success: false, message: 'order Not found'})
            }
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
}

exports.getAllOrder = async (req, res) =>{
    try{
        const orderList = await Order.find().populate('user', 'name')

        if(!orderList)
            return res.status(404).json({success: false, message: 'No order found'})

        res.status(200).json({success: true, orderList})
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
}

exports.getOneOrder = async (req, res) =>{
    try{
        const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems', populate: {
                path: 'product', }
            })
    
            if(!order)
               return res.status(404).json({success: false, message: 'No order found'})
            
            res.status(200).json({success: true, order})
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
    
}

