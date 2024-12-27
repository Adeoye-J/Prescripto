import express from "express"
import { bookAppointment, cancelAppointment, getProfile, makePayment, registerUser, updateProfile, userAppointments, userLogin } from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", userLogin)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile)

userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/user-appointments", authUser, userAppointments)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)
userRouter.post("/make-payment", authUser, makePayment)
// userRouter.post("/checkout-success", (req, res) => {
//     return res.json({success: true, message: "Payment Successful"})
// })
// userRouter.post("/checkout-cancelled", (req, res) => {
//     return res.json({success: false, message: "Payment Cancelled"})
})

export default userRouter