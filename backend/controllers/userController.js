import validator from "validator"
import bcrypt from "bcrypt"
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


    } catch (error) {
        
    }
}
