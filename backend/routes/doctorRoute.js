import express from "express"
import { appointmentCancelled, appointmentCompleted, doctorAppointments, doctorDashboard, doctorList, doctorLogin } from "../controllers/doctorController.js"
import authDoctor from "../middlewares/authDoctor.js"

const doctorRouter = express.Router()

doctorRouter.get("/list", doctorList)

doctorRouter.post("/login", doctorLogin)

doctorRouter.get("/appointments", authDoctor,doctorAppointments)
doctorRouter.post("/appointment-completed", authDoctor, appointmentCompleted)
doctorRouter.post("/appointment-cancelled", authDoctor, appointmentCancelled)
doctorRouter.post("/dashboard", authDoctor, doctorDashboard)

export default doctorRouter