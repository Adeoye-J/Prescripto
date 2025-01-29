import express from "express"
import { bookAppointment, cancelAppointment, getProfile, makePayment, registerUser, updateProfile, userAppointments, userLogin, confirmPayment } from "../controllers/userController.js"
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
userRouter.get('/api/user/confirm-payment', authUser, confirmPayment);

export default userRouter
