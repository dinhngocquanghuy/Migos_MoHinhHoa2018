var express = require('express');
var router = express.Router();
var store = require('store');
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
            adminRepos.getAllBuyer().then(rows => {
              if(rows.length > 0) {
                store.set('acToken', { value:acToken });
                res.redirect('/adminManagement/adminBuyerPage');
              }
              else{
                res.redirect('/adminManagement/adminBuyerPage');
              }
            });
					})
					.catch(err => {
						console.log(err);
						res.statusCode = 500;
						res.end('View error log on console');
					})
			} else {
				    res.redirect('back');
				}
			})
		.catch(err => {
			console.log(err);
			res.statusCode = 500;
			res.end('View error log on console');
    })
  });

router.get('/api/logout', function(req,res,next){
  var acToken = store.get('acToken').value;
  adminRepos.logout(acToken)
  .then(() => {
    res.redirect('/admin/login');
  });
});
module.exports = router;
