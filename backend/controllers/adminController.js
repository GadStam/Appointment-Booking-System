import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/config.js';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';



//API for addingg doctro

import { validateDoctor, validatePartialDoctor } from "../validators/doctorValidator.js";

const addDoctor = async (req, res) => {
    try {
        const {name, email, password, image, speciality, degree, experience, about, fees, address} = req.body;
        console.log("Request Body:", req.body);
        const imageFile = req.file
        let parsedAddress = JSON.parse(address);
        const errors = validateDoctor({ ...req.body, address: parsedAddress });
        if (!errors.success) {
            return res.status(400).json(errors);
        }
        //HASHING DOCTORS PASSWORD
        const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS);

        //UPLOAD IMAGE TO CLOUDINARY
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'});
        const imageUrl = imageUpload.secure_url;

        const doctorData = {name, email, password: hashedPassword, image: imageUrl, speciality, degree, experience, about, fees, address: JSON.parse(address), date: Date.now()};
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        return res.status(201).json({success: true, message: 'Doctor added successfully'})
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: error.message})
    }
}

// API fro Admin Log in
const loginAdmin = async (req, res) =>{
    try{
      const { email, password } = req.body;
      console.log("Request Body:", req.body);

      // Log environment variables for debugging
      console.log("Admin Email from Env:", process.env.ADMIN_EMAIL);
      console.log("Admin Password from Env:", process.env.ADMIN_PASSWORD);
      const result = validatePartialDoctor({email, password});
        if(!result.success){
            return res.status(400).json(result)
        }
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        const token = jwt.sign(email + password, process.env.JWT_SECRET);
        return res
          .status(200)
          .json({
            success: true,
            message: "Admin logged in successfully",
            token,
          });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
    }catch(error){
        console.log(error)
        return res.status(500).json({success: false, message: error.message})
    }
}

export {addDoctor, loginAdmin};