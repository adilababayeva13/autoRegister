const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   surname:{
    type:String,
    required:true
   },
   username:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true,
    unique: true,
    lowercase: true,
    validate:isEmail
   },
   confirmPassword:{
    type:String,
    required:true,
   },
   password:{
    type:String,
    required:true,
    minlength:6
   }
});