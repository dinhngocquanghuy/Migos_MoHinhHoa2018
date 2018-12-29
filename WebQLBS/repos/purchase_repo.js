const database = require("../database/mysql");

exports.buy = data => {
	console.log("Them hoa don");
	console.log(data.order[0][0]);
	var orderID = data.order[0][0];
	var buyerID = data.order[0][1];
	console.log(data.orderitem);

	// First, insert new order
	let sql = `INSERT INTO orders (id, id_buyer, status, payment_method) VALUES (${orderID}, ${buyerID}, 'processing', 'cash')`;
	console.log(sql);
	database.query_db(sql);
	// Insert list of product
	for (var i = 0; i < data.orderitem.length; i++)
	{
		var productID = data.orderitem[i][1];
		var quantity = data.orderitem[i][2];
		console.log('ProductID: ' + i + productID);

		let sql_second = `INSERT INTO orders_items (order_id, product_id, quantity) VALUES (${orderID}, ${productID}, ${quantity})`;
		console.log(sql_second);
		database.query_db(sql_second);
	}
}

exports.getLatestProductID = () => {
	console.log("Get latest product ID: ");
	var sql = 'SELECT MAX(id) AS LatestID FROM orders';
	return database.query_db(sql);
}
