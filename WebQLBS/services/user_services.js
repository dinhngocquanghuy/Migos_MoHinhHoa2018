const user_db = require("../repos/user_repo");
const ticket = require("./ticket_services");

const express = require("express");
const users = express.Router();
const bodyParser = require("body-parser");
var database = require("../database/mysql");

var store = require('store');
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
  store.set("user_acToken",{value:accessToken});
  console.log(refreshToken);
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

users.logout = (acToken) => {
  const query = `delete from ticket_seller where ticket = '${acToken}'`;
  return database.query_db(query);
}

users.postBook = (id_seller,name, price, des, iu, type, num, author, rd, linkd) => {
  const query = `insert into products(seller_id,name,price,description,image_url,status,type,number,author,linkdemo) values(${id_seller}, '${name}', ${price}, '${des}', '${iu}', 0, '${type}', ${num}, '${author}', '${linkd}')`;
  return database.query_db(query);
}

users.getBooksOfSeller = (id) => {
  const query = `select * from products where seller_id = ${id}`;
  return database.query_db(query);
}

users.getBook = (id) => {
  const query = `select * from products where id = ${id}`;
  return database.query_db(query);
}

users.updateBook = (id,name,price,description,type,number,author,release_date,linkdemo) => {
  const query = `update products set name = '${name}', price = ${price}, description = '${description}', type = '${type}', number = ${number}, author = '${author}', release_date = '${release_date}', linkdemo = '${linkdemo}' where id = ${id}`;
  return database.query_db(query);
}
module.exports = users;
