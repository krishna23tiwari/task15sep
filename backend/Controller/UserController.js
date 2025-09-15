const UserModel = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = "asdasdaaan"

exports.adddata = async(req, res, next) => {
    try {
        const {name, email, password, phone} = req.body 

        const user = await UserModel.findOne({email})

        if(user){
            return res.status(400).json({messgae : "User already exists"})
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

         

        const data = new UserModel({name, email, password: hash, phone})
        await data.save()

        return res.status(200).json({message : "User has been created", user : data})

    } catch (error) {
        next(error)
    }
}

exports.login = async(req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({message : "User not found"})
        }

        const decode = bcrypt.compareSync(password, user.password)

        if(!decode){
            return res.status(400).json({message : "Pasword not match"})
        }

        const token = jwt.sign({email}, secret, {expiresIn: "12h"})

        return res.status(200).json({message : "Login successfull", token})

    } catch (error) {
        next(error)
    }
}


exports.getall = async(req, res, next) => {
    try {
        const user = await UserModel.find()

        if(!user){
            return res.status(400).json({message : "error finding users"})
        }

        return res.status(200).json({message : "All users", users : user})
    } catch (error) {
        next(error)
    }
}

exports.getone = async(req, res, next) => {
    try {
        const {email} = req.body 
        const user = await UserModel.findOne({email})

        if(!user){
            return res.status(400).json({messgae : "USer not found", })
        }

        return res.status(200).json({message : "User found", user: user})
    } catch (error) {
        next(error)
    }
}

exports.getOneApi = async(req, res, next) => {
    try {
        const {name, email} = req.body
        console.log(`>>name>>>`,name, email)

        const user = await UserModel.find({name : name}, {email : email ? email : ''})
        console.log(`>>>>user>>>`, user)

        console.log(`>>>user>>>`, UserModel)

        if(user.email === email || user.name === name){
            return res.status(200).json({message : "data", user})
        }

        return res.status(400).json({message : "users"})
    } catch (error) {
        next(error)
    }
}

exports.update = async(req, res, next) => {
    try {
        const {id} = req.params
        const {name, email,password ,phone} = req.body
        const updatedFields = {name, email, phone}

        if(password){
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            updatedFields.password = hash
        }

        const user = await UserModel.findByIdAndUpdate(
            id,
            updatedFields,
            {new : true, runValidators: true,}
        )

        if(!user){
            return res.status(400).json({messgae : "Error Updating"})
        }

        return res.status(200).json({message : "Update done", user})
    } catch (error) {
        next(error)
    }
} 


exports.remove = async(req, res, next) => {
    try {
        const {id} = req.params

        const user = await UserModel.findByIdAndDelete(id)

        if(!user){
            return res.status(400).json({messgae : "Error Deleting data"})
        }

        return res.status(200).json({message : "User deleted"})
    } catch (error) {
        next(error)
    }
}