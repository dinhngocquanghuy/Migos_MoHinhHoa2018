var express = require('express');
var router = express.Router();
var product_services = require("../services/products_services");

router.get('/', function(req, res, next) {
	res.render('products', { title: 'Express' });
});

router.get('/new_product', function(req, res, next) {
	res.render('product_add', { title: 'Express' });
});

router.post("/api/new_product", (req, res) => {
	products_services.add(req, res);
});

router.post("/api/edit_product", (req, res) => {
	products_services.edit(req, res);
});

router.get("/show",(req,res)=>{
	console.log(req.body);
	var results = [];
	product_services.loadProductsList()
					.then(row => {
						console.log('danh sach san pham');
						for (var i = 0; i < row.length; i++) {
							var product = {
							'product_id':row[i].id,
							'seller_id':row[i].seller_id,
							'name':row[i].name,
							'price':row[i].price,
							'description':row[i].description,
							'image_url':row[i].image_url,
							'status':row[i].status,
							'type':row[i].type
							}
							results.push(product);
						}
						res.render("products", {products_list: results});
					});
});

module.exports = router;