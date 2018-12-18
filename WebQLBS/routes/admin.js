var express = require('express');
var router = express.Router();
var adminRepos = require('../repos/adminRepos');

/* Get Admin Login Page */
router.get('/login', function(req, res, next) {
  res.render('adminLogin');
});

router.post('/api/login', function(req,res,next){
  adminRepos.login(req.body)
  .then(rows => {
    console.log(rows);
    if (rows.length > 0) {
				var userEntity = rows[0];
				var acToken = adminRepos.generateAccessToken(userEntity);
				var rfToken = adminRepos.generateRefreshToken();
        adminRepos.updateRefreshToken(userEntity.id, acToken, rfToken)
					.then(value => {
            console.log(value);
						res.render('adminHomepage');
					})
					.catch(err => {
						console.log(err);
						res.statusCode = 500;
						res.end('View error log on console');
					})
			} else {
				    console.log('Account Not Exist!');
				}
			})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
		})
  });
module.exports = router;
