import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

//connecting mongoose
mongoose.connect('mongodb://127.0.0.1:27017/node-mongodb-database')
.then(()=>console.log('MongoDB Connected'))
.catch(err=>{
    console.log('MongoDB Error', err)
})

//creating Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true //tells that it is mandatory field
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true //tell mongo to check that entry is unique
    },
    jobTitle:{
        type: String,
    },
    gender:{
        // type: Enumerator,
        // enum: ['male', 'female']
        type: String
    }
},{timestamps: true}); //bascially we are also keeping track of time user was created or updated

//creating model for user
const User = mongoose.model('user', userSchema); //first parameter is name and second is schema

app.use(express.json())
app.get('/users',async (req, res)=>{
    const allUsers = await User.find({});
    const html = `
        <ul>
            ${allUsers.map(user => `<li>Firstname: ${user.firstName} and email: ${user.email}</li>`).join('')}
        </ul>
    `
    res.send(html);
})
app.get('/',(req, res)=>{
    res.send('Welcome to home page')
})

app.get('/api/users',async (req, res)=>{
    const allUsers = await User.find({});
    res.json({
        allUsers //writing it this way, it is showing key as allUsers and then also fetching all users
    })
})

app.route('/api/users/:id')
.get(async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }
    return res.json(user)
})
.patch(async (req, res)=>{
    const body = req.body;
    const updateBody = {
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    };
    await User.findByIdAndUpdate(req.params.id, updateBody);
    return res.json({msg: 'Success updated the user'})
})
.delete(async (req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg: 'Success deleted the user'})
})

app.post('/api/users',async (req, res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ //400 Bad Request means payload sent have some data missing
            error: 'Please fill all the fields'
        })
    }
    const userResult = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    });
    res.status(201).json({ msg: 'Success user is added to database'})
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});