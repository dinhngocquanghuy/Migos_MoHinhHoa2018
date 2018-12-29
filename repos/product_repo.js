const database = require("../database/mysql");

exports.searchByName = key => {
	console.log("Tim kiem");
	var sql = `select * from products where Name like '%${key}%'`;
	return database.query_db(sql);
}

exports.loadProductsList = () => {
	console.log("Load danh sach san pham tu csdl");
	var sql = `select * from products`;
	return database.query_db(sql);
}
