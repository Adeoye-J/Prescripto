import express from "express"
import { doctorAppointments, doctorList, doctorLogin } from "../controllers/doctorController.js"
import authDoctor from "../middlewares/authDoctor.js"

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)

doctorRouter.post("/login", doctorLogin)

doctorRouter.get("/appointments", authDoctor,doctorAppointments)
doctorRouter.get("/appointment-completed", authDoctor,doctorAppointments)
doctorRouter.get("/appointment=cancelled", authDoctor,doctorAppointments)

export default doctorRouter