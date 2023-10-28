import mongoose from "mongoose";

//USER SCHEMA
const userSchema = new mongoose.Schema({
    name: String, 
    email: {type: String, required: true},
    password: {type: String, required: true}
});

//USER MODEL
export const User = mongoose.model('User', userSchema); //primer parametro en singular, en la bd queda en prural 