import express from 'express';
import { getAllUsersHandler, getUserByIDHandler, createUserHandler, updateUserbyIDHandler, deleteUserbyIDHandler } from '../controllers/user.js'

const router = express.Router();
//as it is router for /users, then / -> means /users and /:id means -> /users/:id
//.get and other are route handler/ controllers which will be moved to contoller folder
router.route('/')
.get(getAllUsersHandler)
.post(createUserHandler)

router.route('/:id')
.get(getUserByIDHandler)
.patch(updateUserbyIDHandler)
.delete(deleteUserbyIDHandler)

export default router;