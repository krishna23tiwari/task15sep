const mongoose = require('mongoose')

const UserModel = mongoose.Schema({
    name :{
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    password : {
        type : String
    },

    phone : {
        type : String, 
        required : true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); 
            },
            message: props => `${props.value} is not valid, Phone number must be 10!`
        }
    }
}, {timestamps : true, versionKey : false})

module.exports = mongoose.model('phonebook', UserModel)