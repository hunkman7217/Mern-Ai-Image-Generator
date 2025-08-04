import express from 'express'
import {ragisterUser, loginUser, userCredits} from "../Controllers/userController.js"
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register', ragisterUser)
userRouter.post('/login', loginUser)
userRouter.get('/credits', userAuth , userCredits)


export default userRouter;

// localhost:4000/api/user/register
// localhost:4000/api/user/login