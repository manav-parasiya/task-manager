const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerSchema, loginSchema, refreshTokenSchema } = require('../validation/auth');
const { addUser, getUserByEmail } = require('../model/auth');

const register = async (req, res) => {
    try {

        let { name, email, password } = req?.body || {};
        let { error, value } = await registerSchema.validate({
            name,
            email,
            password
        }, { abortEarly: false });

        if (error) {
            const messages = error?.details?.map(e => e.message)
            return res.status(400).json({
                error: true,
                message: "invalid input data",
                data: messages.join(', ').replace(/"/g, '')
            })
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT));

        const result = await addUser({
            name: value.name,
            email: value.email,
            hashedPassword: hashedPassword,
            role_id: 1
        });

        const accessToken = await jwt.sign({
            user_id: result.insertId,
            name,
            email
        }, process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            });
        const refreshToken = await jwt.sign({
            user_id: result.insertId,
            name,
            email
        }, process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            });


        return res.status(201).json({
            error: false,
            message: "User successfully registered",
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        console.error("ERROR ===>", error);
        if (error?.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                error: true,
                message: "Email Already Exists, Please Log In",
                data: []
            });
        }
        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}

const login = async (req, res) => {
    try {

        let { email , password } = req?.body || {};
        let { error, value } = await loginSchema.validate({
            email,
            password
        }, { abortEarly: false });
        if (error) {
            const messages = error?.details?.map(e => e.message)
            return res.status(400).json({
                error: true,
                message: "invalid input data",
                data: messages.join(', ').replace(/"/g, '')
            })
        }

        const users = await getUserByEmail(value?.email);
        const user = users[0];

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "invalid email or password",
                data: []
            });
        }
        const hashedPassword = await bcrypt.compare(value?.password, user?.password);
        if (hashedPassword === true) {


            const accessToken = await jwt.sign({
                user_id: user?.id,
                name: user?.name,
                email: user?.email
            }, process.env.JWT_SECRET,
                {
                    expiresIn: "15m"
                });
            const refreshToken = await jwt.sign({
                user_id: user?.id,
                name: user?.name,
                email: user?.email
            }, process.env.JWT_REFRESH_SECRET,
                {
                    expiresIn: "7d"
                });


            return res.status(200).json({
                error: false,
                message: "User successfully logged in",
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } else {
            return res.status(401).json({
                error: true,
                message: "invalid email or password",
                data: []
            });
        }
    } catch (error) {
        console.error("ERROR ===>", error);

        return res.status(500).json({
            error: true,
            message: "Something went wrong!",
            data: []
        });
    }
}

const refreshApiToken = async (req, res) => {
    try {

        let { refreshToken: userRefreshToken } = req?.query;

        let { error, value } = await refreshTokenSchema.validate({
            userRefreshToken
        }, { abortEarly: false });

        if (error) {
            const messages = error?.details?.map(e => e.message)
            return res.status(400).json({
                error: true,
                message: "invalid input data",
                data: messages.join(', ').replace(/"/g, '')
            })
        }

        const result = await jwt.verify(userRefreshToken, process.env.JWT_REFRESH_SECRET)

        const users = await getUserByEmail(result?.email);

        const user = users[0];

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "invalid email or password",
                data: []
            });
        }

        const accessToken = await jwt.sign({
            user_id: user?.id,
            name: user?.name,
            email: user?.email
        }, process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            });
        const refreshToken = await jwt.sign({
            user_id: user?.id,
            name: user?.name,
            email: user?.email
        }, process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "7d"
            });


        return res.status(200).json({
            error: false,
            message: "User successfully logged in",
            data: {
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        console.error("ERROR ===>", error);

        return res.status(401).json({
            error: true,
            message: "invalid Refresh Token!",
            data: []

        })
    }
}

module.exports = { register, login, refreshApiToken };