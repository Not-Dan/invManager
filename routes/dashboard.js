var express = require('express');
var router = express.Router();
var q = require('../scripts/queries');
var bodyParser = require("body-parser");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard', {
    title: 'Dashboard'
  });
});

//delete
router.post('/deleteUser', function(req, res){
    q.delete('users', {uid: req.param('qq')});
    res.render('dashboard', {
      title: 'Dashboard'
    });
});

//getUsers
router.get('/getUsers', function (req, res) {
  var usersCol = new Promise(function (resolve, reject) {
    q.find("users", {}, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
  usersCol.then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(error);
      res.send(error);
    });
});

//getProducts
router.get('/getProducts', function (req, res) {
  var products = new Promise(function (resolve, reject) {
    q.find("products", {}, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
  products.then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(error);
      res.send(error);
    });
});
module.exports = router;