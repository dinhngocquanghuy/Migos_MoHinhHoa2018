const mysql = require('mysql');

const createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'dinhngocquanghuy',
        database: 'migos_sm_qlbs'
    });
};

exports.query_db = sql => {
    console.log("Query sql: " + sql);
    return new Promise((resolve, reject) => {
        const cn = createConnection();
        cn.connect();
        console.log("Connect to database successfully");
        cn.query(sql, (err, rows, fields) => {
            if (err) {
                console.log(`err: ${err}`);
                reject(err);
            } else {
                console.log(`row: ${rows}`);
                resolve(rows);
            }

            cn.end();
        });
    });
}
