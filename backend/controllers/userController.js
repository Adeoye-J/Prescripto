import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"


// API to Register New User

const registerUser = async (req, res) => {
    try {
        
        const {name, email, password} = req.body

        if (!name || !email || !password) {
            return res.json({success: false, message: "Missing details"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Invalid Email, Enter Valid Email"})
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Password must be at least 8 characters long"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API for user login

const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
            return res.json({success: false, message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to get user profile details
const getProfile = async (req, res) => {
    try {
        
        const {userId} = req.body
        const userData = await userModel.findById(userId).select("-password")

        res.json({success: true, userData})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API for updating user profile

const updateProfile = async (req, res) => {

    try {
        const {userId, name, address, gender, dob, phone} = req.body
        
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({success: false, message: "Missing and Incomplete details"})
        }

        await userModel.findByIdAndUpdate(userId, {name, gender, dob, phone, address: JSON.parse(address)})
        
        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image: imageUrl})
        }

        res.json({success: true, message: "Profile Successfully Updated"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}



export {registerUser, userLogin, getProfile, updateProfile}