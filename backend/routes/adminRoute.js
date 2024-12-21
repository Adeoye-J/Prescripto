import express from "express"
import { addDoctor, adminLogin } from "../controllers/adminController.js"
import upload from "../middlewares/multer.js"

const adminRouter = express.Router()

adminRouter.post("/add-doctor", upload.single("image"), addDoctor)
adminRouter.post("/login", upload.single("image"), addDoctor)

export default adminRouter