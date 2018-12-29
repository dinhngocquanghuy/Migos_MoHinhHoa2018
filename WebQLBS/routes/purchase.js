var express = require('express');
var router = express.Router();
var purchase_services = require("../services/purchase_services");

router.post("/buy",(req,res)=>{
	console.log('Data sent: ' + req.body);
	purchase_services.buy(req.body);
	res.end();
});
router.get("/getLatestID" ,(req,res)=>{
	purchase_services.getLatestProductID().then(rows => {
		console.log(rows);
		res.json(rows[0]);
	});
					
});
module.exports = router;