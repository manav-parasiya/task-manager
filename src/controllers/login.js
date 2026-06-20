const register = (req, res) => {
    try {
        return res.status(200).json({
            error: false,
            message: "User successfully registered",
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

const login = (req, res) => {
    try {
        return res.status(200).json({
            error: false,
            message: "User successfully registered",
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