var express = require('express');
var router = express.Router();
var userServices = require('../services/user_services')
var store = require('store');
var alert = require('alert-node');


/* GET home page. */
router.get('/sellerHome/:id', function(req,res,next){
  var id = req.params.id;
  userServices.getBooksOfSeller(id).then((rows) => {
    res.render('sellerHome', {"books": rows});
  });
});

router.get('/postProducts', function(req, res, next) {
  res.render('postProducts');
});

router.post('/api/postProducts/:idSeller', function(req,res,next){
  userServices.postBook(req.params.idSeller, req.body.BookName, req.body.BookPrice, req.body.BookDes, req.body.BookIU, req.body.BookType, req.body.BookNum, req.body.BookAuthor, req.body.BookRD, req.body.BookLinkD);
  alert("Add successfully");
  var id = req.params.idSeller;
  res.redirect('/seller/sellerHome/' + id);
});

router.get('/editProducts/:id', function(req, res, next){
  var id = req.params.id;
  console.log("book id: " + id);
  userServices.getBook(id).then(rows => {
    console.log(rows);
    res.render('sellerViewBook', {"book": rows[0]});
  });
});

router.post('/api/editProducts/:id', function(req,res,next){
  console.log(req.body);
  userServices.updateBook(req.params.id, req.body.name, req.body.price, req.body.description, req.body.type, req.body.number, req.body.author, req.body.release_date, req.body.linkdemo).then(
    () => {
      alert("update successfully");
      res.redirect("/seller/editProducts/" + req.params.id);
  }
  );
});

module.exports = router;
