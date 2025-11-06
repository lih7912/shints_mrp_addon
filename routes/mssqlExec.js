const mssqlConfig = require('./config.js').mssqlIcubeConfig;
const sql = require('mssql');

async function mssqlExec(query) {
    try {
        let pool = await sql.connect(mssqlConfig);

        console.log(mssqlConfig.server + ':' + mssqlConfig.port + ' MSSQL connected - fetchDbMultiConn()')
        console.log('');
        console.log(query);
    
        const result = await pool.request().query(query);

        console.log(result);
    
        if (!result.recordset) {
            result.recordset = [];
        }

        return result.recordset;
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    mssqlExec,
}