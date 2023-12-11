import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    jobTitle:{
        type: String,
    },
    gender:{
        // type: Enumerator,
        // enum: ['male', 'female']
        type: String
    }
},{timestamps: true}); 
export const User = mongoose.model('user', userSchema);