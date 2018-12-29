const purchase_db = require("../repos/purchase_repo");

const express = require('express');
const purchase = express.Router();
const bodyParser = require('body-parser');
purchase.use(bodyParser.json());

purchase.buy = (data) => {
	return purchase_db.buy(data);
}
purchase.getLatestProductID = () => {
	return purchase_db.getLatestProductID();
}
module.exports = purchase;
