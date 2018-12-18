const database = require("../database/mysql");
var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');
var md5 = require('crypto-js/md5');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 6000; // seconds

// Authentication
exports.login = (user) => {
  var md5_pwd = md5(user.password);
  const query = `SELECT * FROM \`admin\` WHERE username='${user.username}' && password='${md5_pwd}'`;
  return database.query_db(query);
}

exports.generateAccessToken = userEntity => {
    var payload = {
        user: userEntity,
        info: 'more info'
    }

    var token = jwt.sign(payload, SECRET, {
        expiresIn: AC_LIFETIME
    });

    return token;
}

exports.generateRefreshToken = () => {
    const SIZE = 80;
    return rndToken.generate(SIZE);
}

exports.updateRefreshToken = (adminId, acToken, rfToken) => {
    return new Promise((resolve, reject) => {

        var sql = `delete from admin_token where admin_id = ${adminId}`;
        database.query_db(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `insert into admin_token(admin_id,ac_token,rf_token,rdt) values(${adminId}, '${acToken}', '${rfToken}', '${rdt}')`;
                return database.query_db(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);

    if (token) {
        jwt.verify(token, SECRET, (err, payload) => {
            if (err) {
                res.statusCode = 401;
                res.json({
                    msg: 'INVALID TOKEN',
                    error: err
                })
            } else {
                req.token_payload = payload;
                next();
            }
        });
    } else {
        res.statusCode = 403;
        res.json({
            msg: 'NO_TOKEN'
        })
    }
}
// Management
