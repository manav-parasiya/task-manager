const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {

        let { email, password } = req?.body;
        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT));
        console.log('hashedPassword ===>',hashedPassword);
        const token = await jwt.sign({ email : email},process.env.JWT_SECRET);
        console.log('token ===>',token);
        console.log('verfiy ===>', await jwt.verify(token,process.env.JWT_SECRET));

        return res.status(200).json({
            error: false,
            message: "User successfully registered",
            data: ["will add data later on"]
        });
    } catch (error) {
        console.error('Error ===>', error);
        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}

const login = (req, res) => {
    try {
        return res.status(200).json({
            error: false,
            message: "User successfully logged in",
            data: ["will add data later on"]
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}


module.exports = { register, login };