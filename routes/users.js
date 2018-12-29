var express = require("express");
var router = express.Router();
var user_services = require("../services/user_services");
const verifyAccessToken = require("../services/ticket_services")
  .verifyAccessToken;

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.render("user", { title: "Express" });
});

router.get("/register", function(req, res, next) {
  res.render("user_register", { title: "Express" });
});
router.get("/login", function(req, res, next) {
  res.render("user_login", { title: "Express" });
});

router.post("/api/login/", (req, res) => {
  user_services.login(req, res);
});

router.post("/api/register/", (req, res) => {
  user_services.register(req, res);
});

router.post("/api/edit", (req, res) => {
  user_services.edit(req, res);
});

module.exports = router;
