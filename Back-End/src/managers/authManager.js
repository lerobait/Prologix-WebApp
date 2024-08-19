const db = require('../db')

// Create a new user
const create = user => {
    db.none('INSERT INTO users(login, password, refresh_token) VALUES($1, $2, $3)', [user.login, user.password, user.refreshToken])
}

// Find user by login
const findByLogin = login => {
    return db.oneOrNone('SELECT * FROM users WHERE login = $1', [login])
}

// Save refresh token
const saveRefreshToken = user => {
    return db.none('UPDATE users SET refresh_token = $1 WHERE login = $2', [user.refreshToken, user.login])
}

// Find user by refresh token
const findByRefreshToken = token => {
    return db.oneOrNone('SELECT * FROM users WHERE refresh_token = $1', [token])
}

// Delete refresh token
const deleteRefreshToken = token => {
    db.none('UPDATE users SET refresh_token = NULL WHERE refresh_token = $1', [token])
}

module.exports = {
    create,
    findByLogin,
    saveRefreshToken,
    findByRefreshToken,
    deleteRefreshToken
}
