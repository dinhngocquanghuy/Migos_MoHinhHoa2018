var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');

var ticket_db = require("../repos/ticket_repo");
var store = require('store');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 6000; // seconds

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

exports.verifyAccessToken = (req, res, next) => {
    var token = store.get("user_acToken").value;
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

exports.generateRefreshToken = () => {
    const SIZE = 80;
    return rndToken.generate(SIZE);
}

exports.updateRefreshToken = (userId, rfToken, role) => {
    return ticket_db.updateRefreshToken(userId, rfToken, role);
}
