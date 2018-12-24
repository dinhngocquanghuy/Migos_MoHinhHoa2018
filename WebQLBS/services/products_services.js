const product_db = require("../repos/product_repo");

const express = require('express');
const pro = express.Router();
const bodyParser = require('body-parser');
pro.use(bodyParser.json());

pro.add = (req, res) => {
	const body = req.body;
	console.log(body);
	var product = {
		product_id: body.product_id,
		seller_id: body.seller_id,
		name: body.name,
		price: body.price,
		description: body.description,
		image_url: body.image_url,
		status: body.status,
		type: body.type
	}

	if(product.product_id.trim() != "") {
		product_db.add_new(product).then(resolve => {
			res.writeHead(200, { 'Content-Type': 'text/json'});
			const body = { "product_id": product.product_id, "reason": resolve };
			res.end(JSON.stringify(body));
		}).catch(reject => {
			res.writeHead(400, { 'Content-Type': 'text/json'});
			const body = { "product_id": product.product_id, "reason": reject };
			res.end(JSON.stringify(body));
		})
	} else {
		res.writeHead(400, { 'Content-Type': 'text/json'});
		const body = { "product_id": product.product_id, "reason": "Invalid id" };
		res.end(JSON.stringify(body));
	}
}

pro.edit = (req, res) => {
	const body = req.body;
	console.log("pro.edit" + body);
	var product = {
		product_id: body.product_id,
		seller_id: body.seller_id,
		name: body.name,
		price: body.price,
		description: body.description,
		image_url: body.image_url,
		status: body.status,
		type: body.type
	}
	product_db.edit(product).then(resolve => {
		res.writeHead(200, { 'Content-Type': 'text/json'});
		const body = { "product_id": product.product_id, "reason": resolve };
		res.end(JSON.stringify(body));
	}).catch(reject => {
		res.writeHead(400, { 'Content-Type': 'text/json'});
		const body = { "product_id": product.product_id, "reason": reject };
		res.end(JSON.stringify(body));
	})
}
pro.loadProductsList = () => {
	return product_db.loadProductsList();
}

pro.searchProduct = (req, res) => {
	var key = req.query.byname;
	return product_db.searchByName(key);
}
module.exports = pro;
