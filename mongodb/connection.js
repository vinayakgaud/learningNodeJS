import mongoose from 'mongoose';

export async function connectToDB(url){
    return mongoose.connect(url)
    .then(()=>console.log('MongoDB Connected'))
    .catch(err=>{
        console.log('MongoDB Error', err)
    })
}
