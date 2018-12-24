const database = require("../database/mysql");

find_product = product_id => {
	console.log(`find_product function: ${product_id}`);
	const query = `Select * from \`products\` where id='${product_id}'`;
	console.log(`query = ${query}`);
	return database.query_db(query);
}

add_product = (products) => {
	console.log(`add_product function: ${products.product_id}`);
	const query = `Insert into \`products\` (\`seller_id\`, \`name\`, \`price\`, \`description\`, \`image_url\`, \`status\`, \`type\`) values ('${seller_id}', '${name}', ${price}, '${description}', '${image_url}', '${status}', '${type}')`;
	console.log(`query = ${query}`);
	return database.query_db(query);
}

edit_product = (products) => {
	console.log(`edit_product function: ${products.product_id}`);
	const query = `Update \`products\` set \`seller_id\`='${seller_id}', \`name\`='${name}', \`price\`=${price}, \`description\`='${description}', \`image_url\`='${image_url}',  \`status\`='${status}', \`type\`='${type}' where \`product_id\`='${product_id}'`;
	console.log(`query = ${query}`);
    return database.query_db(query);
}

exports.add_new = (products) => new Promise((resolve, reject) => {
	find_product(products.product_id).then(find_product_resolve => {
		console.log(find_product_resolve);
		if(find_product_resolve.length > 0) {
			reject("Product is already exists");
		}
		else {
			add_product(products).then(add_product_resolve => {
				console.log(add_product_resolve);
				resolve("New product added");
			}).catch(add_product_resolve => {
				reject(add_product_resolve)
			})
		}
	}).catch(find_product_resolve => {
		console.log(find_product_reject);
		add_product(products).then(add_product_resolve => {
			console.log(add_product_resolve);
			resolve("New product added");
		}).catch(add_product_resolve => {
			reject(add_product_resolve)
		})
	});
});

exports.edit = (products) => new Promise((resolve, reject) => {
	find_product(products.product_id).then(find_product_resolve => {
		console.log(find_product_resolve);
		if(find_product_resolve.length > 0) {
			edit_product(products).then(edit_product_resolve => {
				console.log(edit_product_resolve);
				resolve("Product edited");
			}).catch(edit_product_resolve => {
				reject(edit_product_resolve);
			})
		}
		else {
			console.log("Cannot find product");
			reject("Cannot find product");
		}
	}).catch(find_product_reject => {
		console.log(find_product_reject);
		reject("Cannot find product");
	});
});

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
