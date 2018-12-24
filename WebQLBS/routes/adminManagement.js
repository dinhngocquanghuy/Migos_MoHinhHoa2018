var express = require('express');
var router = express.Router();
var adminRepos = require('../repos/adminRepos');
var store = require('store');
var alert = require('alert-node');

/* Get Admin Home Page */
router.get('/adminBuyerPage', function(req, res, next) {
  adminRepos.getAllBuyer().
  then(value => {
    if(value.length>0)
    res.render('adminBuyerPage', {
      "listbuyer" : value
    });
  }
);
});

router.get('/adminSellerPage', function(req, res, next) {
  adminRepos.getAllSeller().
  then(value => {
    if(value.length>0)
    res.render('adminSellerPage', {
      "listseller" : value
    });
  }
);
});

router.get('/blockBuyer/:id', function(req, res, next) {
  var id = req.params.id;
  adminRepos.blockBuyer(id).then(
    () => {
      res.redirect('/adminManagement/adminBuyerPage');
    }
  );
});

router.get('/unblockBuyer/:id', function(req, res, next) {
  var id = req.params.id;
  adminRepos.unblockBuyer(id).then(
    () => {
      res.redirect('/adminManagement/adminBuyerPage');
    }
  );
});

router.get('/blockSeller/:id', function(req, res, next) {
  var id = req.params.id;
  adminRepos.blockSeller(id).then(
    () => {
      res.redirect('/adminManagement/adminSellerPage');
    }
  );
});

router.get('/unblockSeller/:id', function(req, res, next) {
  var id = req.params.id;
  adminRepos.unblockSeller(id).then(
    () => {
      res.redirect('/adminManagement/adminSellerPage');
    }
  );
});

router.get('/adminProductPage', function(req,res,next){
  adminRepos.getAllProducts().then(
    (rows) => {
      console.log(rows);
      res.render('adminProductPage',{
        "listbooks" : rows
      });
    }
  );
});

router.get('/adminViewPage', function(req,res,next){
  adminRepos.viewBook(store.get("bookid").value).then(
    (book) => {
      console.log(book);
      res.render('adminViewPage',{
        "book" : book
      });
    }
  );
});

router.post('/api/blockBook/:id', function(req,res,next){
  var id = req.params.id;
  adminRepos.blockBook(id).then(
    () => {
        alert("Sách id: " + id + " đã bị block!");
        res.redirect('/adminManagement/adminProductPage');
  });
});

router.post('/api/unblockBook/:id', function(req,res,next){
  var id = req.params.id;
  adminRepos.unblockBook(id).then(
    () => {
        alert("Sách id: " + id + " đã được unblock!")
        res.redirect('/adminManagement/adminProductPage');
  });
});

router.post('/api/viewBook/:id', function(req,res,next){
  var id = req.params.id;
  store.set("bookid", {value:id});
  res.redirect('/adminManagement/adminViewPage');
});
module.exports = router;
