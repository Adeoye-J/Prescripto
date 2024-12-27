import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"


// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/user", userRouter)


// app.post("/make-payment", async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: [
//             {
//                 // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//                 price: '{{PRICE_ID}}',
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}/success.html`,
//         cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     })

// })

// localhost:4000/api/admin/add-doctor

app.get("/", (req, res) => {
    res.send("API Active")
})

app.listen(port, () => {
    console.log(`Server Started and listening on port ${port}`)
})
