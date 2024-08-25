const express = require('express')
const router = express.Router()
const authenticateToken = require('../../utils/authenticateToken')
const service = require('../../controllers/userController')

/**
 * @swagger
 *
 * tags:
 *   name: User
 *   description: User management
 */

/**
 * @swagger
 *
 * components:
 *  securitySchemes:
 *      BearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *
 * /api/user:
 *  get:
 *      tags: [User]
 *      description: Get current user info
 *      produces:
 *          - application/json
 *      security:
 *          - BearerAuth: []
 *      responses:
 *          200:
 *              description: Returns user info
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              login:
 *                                  type: string
 *                                  description: User's login
 *          404:
 *              description: User was not found
 */
router.get('/user', authenticateToken, async (req, res) => {
    // Get user from DB by login
    const user = await service.getUser(req.user.login)

    // If there is no such user, return 404
    if (!user) {
        return res.sendStatus(404).send('User was not found!')
    }

    // Return success response
    return res.json({login: user.login})
})

module.exports = router
