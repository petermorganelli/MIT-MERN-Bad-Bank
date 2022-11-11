require("dotenv").config();
const path = require("path");
var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const e = require("express");


// used to serve static files from public directory
app.use(express.static("build"));

app.use(cors());

// create user account
app.get("/account/create/:name/:email/:password/:balance", function (req, res) {
  // check if account exists
  dal.find(req.params.email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already in exists");
      res.send("User already in exists");
    } else {
      // else create user
      var balance = Number(req.params.balance);
      dal
        .create(req.params.name, req.params.email, req.params.password, balance)
        .then((user) => {
          console.log(user);
          res.send(user);
        });
    }
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// delete
app.get("/account/deleteAccount/:email", function (req, res) {
  dal.deleteAccount(req.params.email).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Running on port: " + port);
