const express = require('express');
const router = require('./routes');
const MongoHelper = require('./infra/db');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express()
const port = 4003;

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

MongoHelper.connect()
    .then(async () => {
        app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
    })
    .catch(console.error)
