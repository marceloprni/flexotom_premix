const databaseSql = {
        dialect: process.env.LOCAL_DIALECT1,
        timezone: '-3:00',
        host: process.env.LOCAL_HOST1,
        username: process.env.LOCAL_USER_NAME1,
        port: process.env.LOCAL_PORT1,
        password: process.env.LOCAL_PASSWORD1,
        database: process.env.LOCAL_DATABASE1,
        define: {
            timestamps: true,
            underscored: true,
        },
        dialectOptions: {
            options: {
                encrypt: false,
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1'
                }
            }
        }
}

module.exports = databaseSql