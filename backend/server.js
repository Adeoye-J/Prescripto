import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"
import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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


// app.get('/payment/success', async (req, res) => {
//     const sessionId = req.query.session_id;
  
//     try {
//       // Fetch the session details from Stripe
//       const session = await stripe.checkout.sessions.retrieve(sessionId);
  
//       // Perform any post-payment actions, such as updating your database
//     //   console.log('Payment successful!', session);
  
//       // Redirect the user to a frontend success page
//       res.redirect(`${process.env.FRONTEND_URL}/my-appointments/success?session_id=${sessionId}`);
//     } catch (error) {
//       console.error('Error fetching session:', error);
//       res.status(500).send('An error occurred');
//     }
// });

// app.get('/payment/cancelled', (req, res) => {
//     // Redirect the user to a frontend cancellation page
//     res.redirect(`${process.env.FRONTEND_URL}/my-appointments/cancelled`);
// });

// localhost:4000/api/admin/add-doctor

app.get("/", (req, res) => {
    res.send("API Active")
})

app.listen(port, () => {
    console.log(`Server Started and listening on port ${port}`)
})
