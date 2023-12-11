import { User } from '../models/user.js'

export const getAllUsersHandler = async (req, res)=>{
    const allUsers = await User.find({});
    res.json({
        allUsers //writing it this way, it is showing key as allUsers and then also fetching all users
    })
}

export const getUserByIDHandler = async (req, res)=>{
    const user = await User.findById(req.params.id);
    if(!user) {
        return res.status(404).json({
            error: 'User not found'
        })
    }
    return res.json(user)
}

export const createUserHandler = async (req, res)=>{
    const body = req.body;
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ //400 Bad Request means payload sent have some data missing
            error: 'Please fill all the fields'
        })
    }
    await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    });
    res.status(201).json({ msg: 'Success user is added to database'})
}

export const updateUserbyIDHandler = async (req, res) =>{
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
}

export const deleteUserbyIDHandler = async (req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({msg: 'Success deleted the user'})
}
