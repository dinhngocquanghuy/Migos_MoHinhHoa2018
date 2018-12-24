const database = require("../database/mysql");
var moment = require("moment");

var role = "ticket_buyer";
var id = "buyer_id"

exports.updateRefreshToken = (userId, rfToken, _role) => {
    return new Promise((resolve, reject) => {

        console.log("updateRefreshToken " + _role)
        if(_role == 1)
            {
                role = "ticket_buyer";
                id = "buyer_id";
            }
        else
            {
                role = "ticket_seller";
                id = "seller_id";
            }

        var sql = `DELETE FROM ${role} WHERE ${id} = '${userId}'`;
        database.query_db(sql) // delete
            .then(value => {
                var rdt = moment().format('YYYY-MM-DD HH:mm:ss');
                sql = `INSERT INTO ${role} (${id}, ticket, release_date) VALUES ('${userId}', '${rfToken}', '${rdt}')`;
                return database.query_db(sql);
            })
            .then(value => resolve(value))
            .catch(err => reject(err));
    });
}
