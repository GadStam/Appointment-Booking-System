import bcrypt from "bcrypt"
import { SALT_ROUNDS } from "../config/config"
import { validateUser } from "../validators/userValidator"
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'



const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body

        const result = validateUser({name, email, password})
        if(!result.success){
            return res.status(400).json({success: false, message: result.message})
        }

        if(!name || !email || !password){
            return res.status(400).json({success: false, message: "Please fill all the fields"})
        }

        const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS);
        const userData = {
            name, email, password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        if(user){
            return res.status(201).json({success: true,token, message: "User registered successfully"})
        }
        return res.status(400).json({success: false, message: "Failed to register user"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: error.message})
    }
}

export {registerUser}