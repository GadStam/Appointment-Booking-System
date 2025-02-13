import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/config.js';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';



//API for addingg doctro

import { validateDoctor } from "../validators/doctorValidator.js";

const addDoctor = async (req, res) => {
    try {
        const {name, email, password, image, speciality, degree, experience, about, fees, address} = req.body;
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

export {addDoctor};