const express = require('express')
const router = express.Router()
const authenticateToken = require('../../utils/authenticateToken')
const service = require('../../controllers/userController')

router.get('/user', authenticateToken, async (req, res) => {
    const user = await service.getUser(req.user.login)

    if (!user) {
        return res.sendStatus(404)
    }

    return res.json({ login: user.login })
})

module.exports = router
