const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'DC Link Prologix API',
            version: '1.0.0',
            description: 'This API provides endpoints for managing the DC Link Prologix system, including user management, data retrieval.'
        },
    },
    apis: ['./src/routes/api/*.js'],
};

const openapiSpecification = swaggerJsdoc(options)

module.exports = openapiSpecification
