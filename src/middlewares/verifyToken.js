const jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) => {
    try {
        const token = JSON.stringify(req?.headers?.authorization)?.split(' ')[1].replace(`"`, '');
        if (token) {
            const result = await jwt.verify(token, process.env.JWT_SECRET);

            next();
        } else {
            return res.status(401).json({
                error: true,
                message: "Authorization Token is Required in Headers",
                data: []
            });
        }
    } catch (error) {
        if (error?.message === "invalid signature") {
            return res.status(401).json({
                error: true,
                message: "Invalid Token",
                data: []
            });
        }
         return res.status(401).json({
                error: true,
                message: "Invalid Token",
                data: []
            });
    }
}

module.exports = verifyToken;