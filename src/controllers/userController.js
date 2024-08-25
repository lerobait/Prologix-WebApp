const manager = require('../models/userManager')

const getUser = async login => {
    return manager.findByLogin(login)
}

module.exports = {
    getUser
}
