import express from 'express';
import {MongoHelper} from './infra/db.js';
import {router} from './routes.js';

const app = express()
const port = 4003

/* Middlewares */
app.use(router)

MongoHelper.connect()
    .then(async () => {
        app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
    })
    .catch(console.error)
