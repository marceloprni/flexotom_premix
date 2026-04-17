const databaseSql = {
        dialect: process.env.LOCAL_DIALECT2,
        timezone: '-3:00',
        host: process.env.LOCAL_HOST2,
        username: process.env.LOCAL_USER_NAME2,
        port: process.env.LOCAL_PORT2,
        password: process.env.LOCAL_PASSWORD2,
        database: process.env.LOCAL_DATABASE2,
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