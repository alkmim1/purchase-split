const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})


const doc = {
    info: {
        version: "1.0.0",
        title: "Split Bill",
        description: "Documentação da Aplicação Split-Bill"
    },
    host: "localhost:4003",
    basePath: "/",
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json']
    
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./index.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index')
})