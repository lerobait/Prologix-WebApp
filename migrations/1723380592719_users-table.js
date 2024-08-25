exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        login: { type: 'varchar(100)', notNull: true, unique: true },
        password: { type: 'varchar(255)', notNull: true },
        refresh_token: { type: 'text', notNull: false },
    })
}

exports.down = (pgm) => {
    pgm.dropTable('users')
}
