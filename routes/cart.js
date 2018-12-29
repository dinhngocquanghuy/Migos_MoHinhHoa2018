var express = require('express');
var router = express.Router();
var cart_services = require("../services/products_services");

router.get('/', function(req, res, next) {
	res.render('cart');
});


module.exports = router;