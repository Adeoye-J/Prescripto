import validator from "validator"
import bcrypt from "bcrypt"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import appointmentModel from "../models/appointmentModel.js"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

        let userDetails = {name, gender, dob, phone, address: JSON.parse(address)}

        await userModel.findByIdAndUpdate(userId, userDetails)
        
        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image: imageUrl})
            
            userDetails = {name, gender, dob, phone, address: JSON.parse(address), image: imageUrl}
        }

        await appointmentModel.updateMany({userId}, {$set: {userData: userDetails}})

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
                message: "Doctor unavailable"
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

// API to get user appointments
const userAppointments = async (req, res) => {
    try {
        
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success: true, appointments})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to fetch appointments." });
    }
}

// API to cancel appoinment
const cancelAppointment = async (req, res) => {
    try {
        
        const {userId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        
        // Verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success: false, message: "Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

        // releasing doctors slot
        const {docId, slotDate, slotTime} = appointmentData

        const docData = await doctorModel.findById(docId)

        let slots_booked = docData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: "Appointment Cancelled"})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred while requesting appointments." });
    }
}

const makePayment = async (req, res) => {
    try {
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.cancelled) {
            return res.json({success: false, message: "Appointment Cancelled or Not Found"})
        }

        // Stripe payment setup
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Payment for Appointment with ' + appointmentData.docData.name,
                            description: 'Appointment on ' + appointmentData.slotDate + ' at ' + appointmentData.slotTime,
                        },
                        unit_amount: appointmentData.amount * 100, // Stripe requires amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                appointment_id: appointmentId,
            },
            success_url: `${process.env.FRONTEND_URL}/payment-success`, // Redirect to frontend after successful payment
            cancel_url: `${process.env.FRONTEND_URL}/payment-cancelled`, // Redirect to frontend after cancelled payment
        })

        console.log(`session: ${session.id}`);
        res.json({success: true, session})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to initiate payment. Try Again Later." });
    }
}
const confirmPayment = async (req, res) => {
    const { sessionId } = req.query;
    console.log(sessionId)
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log(session);
        if (session.payment_status === 'paid') {
            // Update the database
            const appointmentId = session.metadata.appointment_id;
            console.log(`appointmentId: ${appointmentId}`);
            await appointmentModel.findByIdAndUpdate(appointmentId, { paid: true });

            return res.json({ success: true, message: "Payment confirmed." });
        } else {
            return res.json({ success: false, message: "Payment not yet confirmed. Please try again later." });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Failed to retrieve payment status." });
    }
};

// const verifyPayment = async (req, res) => {
//     try {
//         const { sessionId } = req.body;
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         if (session.payment_status === 'paid') {
//             const appointmentId = session.metadata.appointment_id;
//             await appointmentModel.findByIdAndUpdate(appointmentId, { paid: true });
//             res.json({ success: true, message: 'Payment successful, verified and updated.' });
//         } else {
//             res.json({ success: false, message: 'Payment not completed.' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// }; 


export {registerUser, userLogin, getProfile, updateProfile, bookAppointment, userAppointments, cancelAppointment, makePayment, confirmPayment}