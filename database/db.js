import mongoose from 'mongoose';

const URL = "mongodb+srv://ProtalentoJafet:1234@cluster0.itt0fhl.mongodb.net/ProyectoCrud";

export const dbConnection = async () =>{
    await mongoose.connect(URL); 
}

