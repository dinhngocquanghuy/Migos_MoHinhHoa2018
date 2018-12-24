const user_db = require("../repos/user_repo");
const ticket = require("./ticket_services");

const express = require("express");
const users = express.Router();
const bodyParser = require("body-parser");
users.use(bodyParser.json());

users.login = (req, res) => {
  const body = req.body;
  console.log("Post login Entry: " + body);
  console.log(body);
  const username = body.username;
  const password = body.password;
  const role = body.role;

  const accessToken = ticket.generateAccessToken(users);
  const refreshToken = ticket.generateRefreshToken();
  user_db
    .authenticate(username, password, role)
    .then(user => {
      console.log("user_db.authenticate: " + user + " " + role );
      ticket.generateRefreshToken();
      ticket
        .updateRefreshToken(user.id, refreshToken, role)
        .then(() => {
          res.writeHead(200, { "Content-Type": "text/json" });
          const body = {
            id: user.id,
            username: username,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: user.role,
            access_token: accessToken,
            refresh_token: refreshToken
          };
          res.end(JSON.stringify(body));
        })
        .catch(err => {
          console.log(err);
          res.statusCode = 500;
          res.end("Server Error");
        });
    })
    .catch(() => {
      console.log("401 incorrect username/password ");
      res.writeHead(401, { "Content-Type": "text/json" });
      const body = {
        username: username,
        reason: "incorrect username/password"
      };
      res.end(JSON.stringify(body));
    });
};

users.register = (req, res) => {
  const body = req.body;
  console.log("users.register");
  console.log(body);
  var user = {
    username: body.username,
    password: body.password,
    fullname: body.fullname,
    email: body.email,
    address: body.address,
    phone: body.phone,
    role: body.role
  };

  if (user.username.trim() != "") {
    console.log("users.register 11");
    user_db
      .add_new(user)
      .then(resolve => {
        res.writeHead(200, { "Content-Type": "text/json" });
        const body = { username: user.username, reason: resolve };
        res.end(JSON.stringify(body));
      })
      .catch(reject => {
        res.writeHead(400, { "Content-Type": "text/json" });
        const body = { username: user.username, reason: reject };
        res.end(JSON.stringify(body));
      });
  } else {
    res.writeHead(400, { "Content-Type": "text/json" });
    const body = { username: user.username, reason: "Invalid input" };
    res.end(JSON.stringify(body));
  }
};

users.edit = (req, res) => {
  const body = req.body;
  console.log("users.edit" + body);
  var user = {
    username: body.username,
    password: body.password,
    fullname: body.fullname,
    email: body.email,
    address: body.address,
    phone: body.phone,
    role: body.role
  };
  user_db
    .edit(user)
    .then(resolve => {
      res.writeHead(200, { "Content-Type": "text/json" });
      const body = { username: user.username, reason: resolve };
      res.end(JSON.stringify(body));
    })
    .catch(reject => {
      res.writeHead(400, { "Content-Type": "text/json" });
      const body = { username: user.username, reason: reject };
      res.end(JSON.stringify(body));
    });
};

module.exports = users;
