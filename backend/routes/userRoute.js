import express from "express"
import { getProfile, registerUser, updateProfile, userLogin } from "../controllers/userController.js"
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", userLogin)
userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile)

user

export default userRouter