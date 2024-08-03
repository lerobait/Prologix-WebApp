const pgp = require("pg-promise")(/*options*/)
const db = pgp("postgres://username:password@host:port/database")

module.exports = db
