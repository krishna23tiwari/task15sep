const usermodel = require('../Model/UserModel')
const jwt = require('jsonwebtoken')
const secret = "asdasdaaan"

module.exports = async(req, res, next) => {
    const barrertoken = req.headers.authorization

    if(!barrertoken){
        return res.status(400).json({message: "barreer token not found"})
    }

    const token = barrertoken.split(" ")[1]

     if(!token){
        return res.status(400).json({message: "token not found"})
    }

    const decode = jwt.verify(token, secret)

     if(!decode){
        return res.status(400).json({message: "decode not work"})
    }

    const user = await usermodel.findOne({email: decode.email})

     if(!user){
        return res.status(400).json({message: "user not found"})
    }

    req.user = user

    next()
}