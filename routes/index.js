var express = require('express');
var router = express.Router({
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
});
var q = require('../scripts/queries');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Inventory Manager'
  });
});

var results;

//login
router.post('/login', function (req, res) {
  var login = new Promise(function (resolve, reject) {
    q.find("users", {
      uid: req.param('uid')
    }, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
  login.then(data => {
      if (data == undefined || null) {
        res.redirect('/?login=false');
      } else if (data[0].pwd == req.param('pwd')) {
        res.redirect('/dashboard');
      } else {
        res.redirect('/?login=failed');
      }
    })
    .catch(e => {
      res.redirect('/?login=failed');
    });
});

//Register
router.post('/register', function (req, res) {
  console.log(req.param('ruid'));
  var checkUid = new Promise(function (resolve, reject) {
    q.find("users", {
      uid: req.param('ruid')
    }, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
  checkUid.then(data => {
      console.log(data[0]);
      if (data[0] == undefined || null) {
        q.writeOne(
          "users", {
            uid: req.param('ruid'),
            pwd: req.param('rpwd'),
            fname: req.param('fname'),
            lname: req.param('lname')
          });
        res.send("User " + req.param('ruid') + " Created");
      } else {
        res.send("User already exists.");
      }
    })
    .catch(e => {
      console.log(error);
      res.send(error);
    });
});
//getProduct
router.get('/getProduct', function (req, res) {
  var test = new Promise(function (resolve, reject) {
    q.find("products", {
      uid: 'dan'
    }, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data[0]);
    });
  });
  test.then(data => {
      res.send(data[0]);
    })
    .catch(e => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;