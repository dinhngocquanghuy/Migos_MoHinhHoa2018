const database = require("../database/mysql");
var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');
var md5 = require('crypto-js/md5');
var store = require('store');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 6000; // seconds

// Authentication
exports.login = (user) => {
  var md5_pwd = md5(user.password);
  const query = `SELECT * FROM \`admin\` WHERE username='${user.username}' && password='${md5_pwd}'`;
  return database.query_db(query);
}

exports.logout = (acToken) => {
  const query = `delete from admin_token where ac_token = '${acToken}'`;
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

    var token = store.get('acToken').value;
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

exports.getAllBuyer = () => {
  const query = `SELECT * FROM \`buyer\``;
  return database.query_db(query);

}

exports.getAllSeller = () => {
  const query = `SELECT * FROM \`seller\``;
  return database.query_db(query);
}

// Management
exports.blockBuyer = (buyerId) => {
  const query = `update buyer set status = -1 where id = ${buyerId}`;
  return database.query_db(query);
}

exports.unblockBuyer = (buyerId) => {
  const query = `update buyer set status = 0 where id = ${buyerId}`;
  return database.query_db(query);
}

exports.blockSeller = (sellerId) => {
  const query = `update seller set status = -1 where id = ${sellerId}`;
  return database.query_db(query);
}

exports.unblockSeller = (sellerId) => {
  const query = `update seller set status = 0 where id = ${sellerId}`;
  return database.query_db(query);
}

exports.getAllProducts = () => {
  const query = `select * from products`;
  return database.query_db(query);
}

exports.blockBook = (id) => {
  const query = `update products set status = -1 where id = ${id}`;
  return database.query_db(query);
}

exports.unblockBook = (id) => {
  const query = `update products set status = 0 where id = ${id}`;
  return database.query_db(query);
}

exports.viewBook = (id) => {
  const query = `select * from \`products\` where id = ${id}`;
  return database.query_db(query);
}

exports.searchBook = (string) => {
  const query = `select * from \`products\` where name like '%${string}%' || '${string}%' || '%${string}'`;
  return database.query_db(query);
}
