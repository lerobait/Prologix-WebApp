require('dotenv').config()

const express = require('express')
const router = express.Router()
const service = require('../../controllers/authController')
const authenticateToken = require('../../utils/authenticateToken')

/**
 * @swagger
 *
 * tags:
 *  name: Auth
 *  description: User authentication management
 * */

// Registration rout
/**
 * @swagger
 *
 * /api/auth/registration:
 *  post:
 *    tags: [Auth]
 *    description: User registration
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              login:
 *                type: string
 *                description: User's login
 *              password:
 *                type: string
 *                description: User's password
 *            required:
 *              - login
 *              - password
 *    responses:
 *      200:
 *        description: Successful registration
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  description: User's access token
 *                refreshToken:
 *                  type: string
 *                  description: User's refresh token
 *      409:
 *        description: User with such login already exists
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 */
router.post('/auth/registration', async (req, res) => {
    // Get data from request
    const user = {
        login: req.body.login,
        password: req.body.password
    }

    // Get response. Either error (string) or tokens (object)
    const response = await service.registration(user)

    // Check if response type is string and send error
    if (typeof response === 'string') {
        return res.status(409).json({message: response})
    }

    // Send tokens
    return res.json(response)
})

// Login rout
/**
 * @swagger
 *
 * /api/auth/login:
 *  post:
 *    tags: [Auth]
 *    description: User login
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              login:
 *                type: string
 *                description: User's login
 *              password:
 *                type: string
 *                description: User's password
 *            required:
 *              - login
 *              - password
 *    responses:
 *      200:
 *        description: Successful login
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  description: User's access token
 *                refreshToken:
 *                  type: string
 *                  description: User's refresh token
 *      400:
 *        description: Invalid login credentials
 */
router.post('/auth/login', async (req, res) => {
    // Get user from DB by login
    const user = await service.getUser(req.body.login)

    // If not the user send error
    if (!user) {
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
/**
 * @swagger
 *
 * /api/auth/token:
 *  post:
 *    tags: [Auth]
 *    description: Update access token
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                description: Refresh token
 *            required:
 *              - token
 *    responses:
 *      200:
 *        description: Successful token update
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                accessToken:
 *                  type: string
 *                  description: New access token
 *      401:
 *        description: No token provided
 *      403:
 *        description: Invalid refresh token
 */
router.post('/auth/token', async (req, res) => {
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
    return res.json({accessToken: accessToken})
})

// Logout rout
/**
 * @swagger
 *
 * /api/auth/logout:
 *  delete:
 *    tags: [Auth]
 *    description: Logout user
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *        description: Successful logout
 */
router.delete('/auth/logout', authenticateToken, (req, res) => {
    // Get token from request
    service.logout(req.body.token)

    // User was successfully logout, send 200 status
    return res.sendStatus(200)
})

module.exports = router
