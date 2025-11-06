const mssqlIcubeConfig = {
    user: 'dzicube',
    password: 'ejwhs123$',
    server: '112.216.62.4',
    port: 5539,
    database: 'dzicube',
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    connectionTimeout: 60000,
    acquireTimeoutMillis: 60000,
    requestTimeout: 600000,
    pool: {
        idleTimeoutMillis: 600000,
    }
};

const mysqlConfig = {
    host: 'erp-test.shints.com',
    port: 3306,
    user: 'afroba',
    password: 'auto1234',
    database: 'erp-test',
    connectionLimit: 100 
 };

module.exports = { 
    mssqlIcubeConfig, 
    mysqlConfig,
}
