import express from 'express';
const app = express()
const port = 4003

/* Routes */
import { router } from './routes.js';
import { dbConnection } from './infra/db.js';

/* Middlewares */
app.use(router)

dbConnection().then(() => app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})).catch(err => new Error(err));
