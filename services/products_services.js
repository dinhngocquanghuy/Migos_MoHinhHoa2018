const product_db = require("../repos/product_repo");

const express = require('express');
const pro = express.Router();
const bodyParser = require('body-parser');
pro.use(bodyParser.json());


pro.loadProductsList = () => {
	return product_db.loadProductsList();
}

pro.searchProduct = (req, res) => {
	var key = req.query.byname;
	return product_db.searchByName(key);
}
module.exports = pro;
