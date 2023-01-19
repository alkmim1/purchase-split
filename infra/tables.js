class Tables {
    static async init(dbConnection) {
        this.connection = dbConnection;
        await this.createTableUser().then();
    }

    static async createTableUser() {
        const sql = 'CREATE TABLE if not exists users (id SERIAL PRIMARY KEY, provider varchar(255) NOT NULL, uuid varchar(255), ' +
            'name varchar(255) NOT NULL, oauth_token varchar(255), oauth_expires_at TIMESTAMP, created_at TIMESTAMP NOT NULL, ' +
            'updated_at TIMESTAMP NOT NULL, favorite_cart int)';
        await this.query(sql);
    }

    static async query(sql) {
        return await this.connection.query(sql)
            .then((res) => {
                return res.rows;
            })
            .catch(e => console.error(e.stack))
    }
}

export {Tables}