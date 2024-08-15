require('dotenv').config()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const manager = require('../managers/authManager')

// Registration rout logic
const registration = async user => {
    // Check if user already exist
    const existingUser = await manager.findByLogin(user.login)

    // If user with this login already exist, return error message
    if (existingUser) {
        return 'User with such login already exists!'
    }

    // Hash user password
    user.password = await bcrypt.hash(user.password, 10)

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ login: user.login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    user.refreshToken = jwt.sign({ login: user.login }, process.env.REFRESH_TOKEN_SECRET)

    // Create user in DB
    manager.create(user)

    // Return tokens
    return {
        accessToken: accessToken,
        refreshToken: user.refreshToken
    }
}

// Returns user that was found by login
const getUser = async login => {
    return manager.findByLogin(login)
}

// Login rout logic
const login = async (user, password) => {
    // Checking if user password matches the password in request,
    // if true generate new tokens for user and return it, if not returns null
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({ login: user.login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        user.refreshToken = jwt.sign({ login: user.login }, process.env.REFRESH_TOKEN_SECRET)

        manager.saveRefreshToken(user)

        return {
            accessToken: accessToken,
            refreshToken: user.refreshToken
        }
    }

    return null
}

// Returns user by its refresh token
const isRefreshToken = async token => {
    return manager.findByRefreshToken(token)
}

// Update token rout logic, verifies refresh token and returns new access token
const updateToken = user => {
    let token = null

    jwt.verify(user.refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return
        }

        token = jwt.sign({ login: user.login }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    })

    return token
}

// Logout rout logic, deletes refresh token from the DB
const logout = token => {
    manager.deleteRefreshToken(token)
}

module.exports = {
    registration,
    getUser,
    login,
    isRefreshToken,
    updateToken,
    logout
}
