const { User } = require('./model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.userRegister = async (req, res) =>{
    const {  name, email, password, phone, street, apartment, city, zip, country } = req.body
    try{
        
        let user = new User({
            name, email, phone, street, apartment, city, zip, country,
            passwordHash: bcrypt.hashSync(password, 10),
        })
        user = await user.save()
        if(!user)
            return res.status(404).send('user can not be created..!')
            res.status(200).json({success: true, user})
    }catch(err){
            return res.status(400).json({success: false, err})
    }
}


exports.userLogin = async (req, res) =>{
    try{
        const user = await User.findOne({email: req.body.email})
        const secret = process.env.SECRET

            if(!user){
                return res.status(404).json({success: false, message: 'email not found'})
            }

            if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
                const token = jwt.sign(
                    {
                        userId: user.id,
                        isAdmin: user.isAdmin
                    },
                    secret,
                    {expiresIn: '1d'}
                )

                res.status(200).send({user: user.email, token: token})
            }else{
                res.status(400).json({success: false, message: 'incorrect password'})
            }
    }catch(err){
        return res.status(400).json({success: false, error: err})
    }
}

exports.getAllUser = async (req, res) =>{
    const allUser = await User.find().select('-passwordHash')

        if(!allUser){
            res.status(500).json({success: false})
        }
        res.status(200).json({success: true, allUser})
}

exports.getOneUser = async (req, res) =>{
    try{
        const id = req.params.id
        const user = await User.findById(id).select('-passwordHash')
        if(!user)
            return res.status(404).json({success: false, message: 'No user found.'})

        res.status(200).json({success: true, user})
    }catch(err){
        return res.status(400).json({success: false, error: err})
    }
}


exports.userDelete = async (req, res) =>{
    try{
        const id = req.params.id
        user = await User.findByIdAndRemove(id)
            if(!user)
            return res.status(404).json({success: false, message: 'user Not found'})

        res.status(200).json({success: true, message: 'user was deleted successfully'})
    }catch(err){
        return res.status(400).json({success: false, err})
    }
}