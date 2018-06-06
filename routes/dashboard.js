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


//Deleting Entries

//delete User
router.post('/deleteUser', function(req, res){
    q.delete('users', {uid: req.param('qq')});
    res.render('dashboard', {
      title: 'Dashboard'
    });
});

//delete Products
router.post('/deleteProduct', function(req, res){
    q.delete('products', {pid: req.param('qq')});
    res.render('dashboard', {
      title: 'Dashboard'
    });
});


//Getting Entries

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


//Creating Entries

//Create Product
router.post('/addProduct', function (req, res) {
  var createProduct = new Promise(function (resolve, reject) {
    q.find("products", {
      uid: req.param('pname')
    }, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
  var temp = new Promise(function (resolve, reject){
    q.find("products", {}, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
  temp.then(results => {
    var maxPid = results[0].pid;
    for(var i in results){
      if(parseInt(results[i].pid) >= parseInt(maxPid)){
        maxPid = parseInt(results[i].pid)+1;
        while(maxPid.toString().length < 4){
          maxPid = "0"+maxPid;
        }
      }
    }

    createProduct.then(data => {
      console.log(data[0]);
      if (data[0] == undefined || null) {
        q.writeOne(
          "products", {
            pname: req.param('pname'),
            pid: req.param('pid'),
            qty: parseInt(req.param('qty')),
            price: parseFloat(req.param('price')),
            desc: req.param('desc'),
            pid: maxPid
          });
          res.render('dashboard', {
            title: 'Dashboard'
          });
      } else {
        res.send(error);
      }
    })
    .catch(e => {
      console.log(error);
      res.send(error);
    });
  });
});

//Editing Entries
module.exports = router;