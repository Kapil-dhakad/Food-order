const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body

        // check if user already exists
        const userAlreadyExists = await userModel.findOne({ email })
        if (userAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        // hash password
        const hash = await bcrypt.hash(password, 10)

        // create user
        const user = await userModel.create({
            name,
            email,
            password: hash
        })

        // generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        // set cookie
        res.cookie("token", token)

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Server error, please try again later"
        })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        // check if user exists
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        // generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        // set cookie
        res.cookie("token", token)

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: { id: user._id, name: user.name, email: user.email }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Server error, please try again later"
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}
