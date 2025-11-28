
const databaseSql = {
        dialect: process.env.LOCAL_DIALECT,
        timezone: '-3:00',
        host: process.env.LOCAL_HOST,
        username: process.env.LOCAL_USER_NAME,
        port: process.env.LOCAL_PORT,
        password: process.env.LOCAL_PASSWORD,
        database: process.env.LOCAL_DATABASE,
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