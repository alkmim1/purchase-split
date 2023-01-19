import express from 'express';
import dotenv from "dotenv";
dotenv.config()

const app = express()
const port = 4003

/* Routes */
import { router } from './routes.js';
import { dbConnection } from './infra/db.js';
import { Tables } from './infra/tables.js';

/* Middlewares */
app.use(router)
await Tables.init(dbConnection).then()

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
