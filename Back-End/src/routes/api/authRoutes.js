require('dotenv').config()

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const service = require('../../services/authService')
const authenticateToken = require('../../utils/authenticateToken')

// Registration rout
router.post('/user/registration', async (req, res) => {
    // Get data from request
    const user = {
        login: req.body.login,
        password: req.body.password
    }

    // Get response. Either error (string) or tokens (object)
    const response = await service.registration(user)

    // Check if response type is string and send error
    if (typeof response === 'string') {
        return res.status(409).json({ message: response })
    }

    // Send tokens
    return res.json(response)
})

// Login rout
router.post('/user/login', async (req, res) => {
    // Get user from DB by login
    const user = await service.getUser(req.body.login)

    // If not the user send error
    if (!user)  {
        return res.status(400).send('No such user!')
    }

    // Generate new tokens
    const tokens = await service.login(user, req.body.password)

    // Send success response with tokens
    if (tokens) {
        return res.json(tokens)
    }

    // Send that there was an error and login is not allowed
    return res.send('Not allowed!')
})

// Update tokens rout
router.post('/user/token', async (req, res) => {
    // Get refresh token from request
    const refreshToken = req.body.token

    // Check if there is a token
    if (!refreshToken) {
        return res.sendStatus(401)
    }

    // Get user from DB by refresh token
    const user = await service.isRefreshToken(refreshToken)

    // If there is no user send error
    if (!user) {
        return res.sendStatus(403)
    }

    // Update and get the access token
    const accessToken = service.updateToken(user)

    // If there is no token send error
    if (!accessToken) {
        return res.sendStatus(403)
    }

    // Send token in response
    return res.json({ accessToken: accessToken})
})

// Logout rout
router.delete('/user/logout', authenticateToken, (req, res) => {
    // Get token from request
    service.logout(req.body.token)

    // User was successfully logout, send 200 status
    return res.sendStatus(200)
})

module.exports = router
