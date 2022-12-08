const { Product } = require('./model')


exports.addProduct = async (req, res) =>{

    try{
        const { name, description, richDescription, image, images, brand, price, countInStock } = req.body
        let product = new Product({
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            countInStock
        }) 
        product = await product.save()
            if(!product)
                return res.status(400).send({success: false, message: 'product was not add'})

            res.status(200).json({success: true, product})
    }catch(err){
        return res.status(500).json({success: false, err})
    }
}


exports.getAllProduct = async (req, res) =>{
    try{
        const product = await Product.find()
        if(!product)
            return res.status(404).json({success: false, message: 'product List is empty'})
        
        res.status(200).json({success: true, product})
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
}

exports.getOneProduct = async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product)
           return res.status(404).json({success: false, message: 'product was not found'})
        
        res.status(200).json({success: true, product})
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
}

exports.updateProduct = async (req, res) =>{
    try{
        const id = req.params.id
        const { name, description, richDescription, image, images, brand, price, countInStock } = req.body
        const product = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                richDescription,
                image,
                images,
                brand   ,
                price,
                countInStock
            },
            {new: true}
            )
        if(!product)
            return res.status(404).send('No product was found with the id.!')

        res.status(200).json({success: true, product})
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
}

exports.deleteProduct = async (req, res) =>{
    try{
        const id = req.params.id
        const product = await Product.findByIdAndRemove(id)
            if(!product)
            return res.status(404).json({success: false, message: 'product Not found'})

        res.status(200).json({success: true, message: 'product was deleted successfully'})
    }catch(err){
        return res.status(500).json({success: false, error: err})
    }
}