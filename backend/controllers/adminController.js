

// API for adding doctor

const addDoctor = async (req, res) => {
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.imageFile

        // Checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {

        }

        // console.log({name, email, password, speciality, degree, experience, about, fees, address}, imageFile)
    } catch (error) {
        
    }
}

export {addDoctor}