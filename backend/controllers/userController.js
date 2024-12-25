import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"


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

// API to book appointment

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        if (!userId || !docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "Missing required fields." });
        }

        const docData = await doctorModel.findById(docId).select("-password");
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found." });
        }

        if (!docData.available) {
            return res.json({
                success: false,
                message: "Doctor unavailable for appointment at the moment, try again later."
            });
        }

        let slots_booked = docData.slots_booked;

        // Checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot date or time filled." });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.json({ success: false, message: "User not found." });
        }

        // Prepare the appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData: { ...docData, slots_booked: undefined }, // Avoid including slots_booked
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        };

        // Save the appointment
        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Update the doctor's slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully." });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred while booking the appointment." });
    }
};


// const bookAppointment = async (req, res) => {
//     try {
//         const {userId, docId, slotDate, slotTime} = req.body

//         const docData = await doctorModel.findById(docId).select("-password")

//         if(!docData.available) {
//             return res.json({success: false, message: "Doctor Unavailable for Appointment at the moment, try again later."})
//         }

//         let slots_booked = docData.slots_booked

//         // Checking for slots availability

//         if(slots_booked[slotDate]) {
//             if(slots_booked[slotDate].includes(slotTime)) {
//                 return res.json({success: false, message: "Slot Date or Time Filled"})
//             } else {
//                 slots_booked[slotDate].push(slotTime)
//             }
//         } else {
//             slots_booked[slotDate] = []
//             slots_booked[slotDate].push(slotTime)
//         }

//         const userData = await userModel.findById(userId).select("-password")

//         delete docData.slots_booked

//         const appointmentData = {
//             userId, 
//             docId,
//             userData,
//             docData,
//             amount: docData.fees,
//             slotTime,
//             slotDate,
//             date: Date.now()
//         }

//         const newAppointment = new appointmentModel(appointmentData)
//         await newAppointment.save()

//         // Save new slots data in docData
//         await doctorModel.findById(docId, {slots_booked})

//         res.json({success: true, message: "Appointment Booked"})

//     } catch (error) {
//         console.log(error)
//         res.json({success: false, message: error.message})
//     }
// }



export {registerUser, userLogin, getProfile, updateProfile, bookAppointment}