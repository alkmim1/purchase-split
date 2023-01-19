import pg from 'pg';

const { Pool } = pg;

const dbConnection = await connect();

async function connect() {
    try {
        return new Pool({
            user: process.env.PGUSER || 'postgres',
            host: process.env.PGHOST || 'db',
            database: process.env.PGDATABASE || 'purchase_split',
            password: process.env.PGPASSWORD || 'devpg',
            port: process.env.PGPORT || 5432
        });
    } catch (error) {
        console.log(error)
    }
}

export {dbConnection}

