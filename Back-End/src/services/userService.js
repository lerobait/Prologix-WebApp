const manager = require('../managers/userManager')

const getUser = async login => {
    return manager.findByLogin(login)
}

module.exports = {
    getUser
}
