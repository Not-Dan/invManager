var express = require('express');
var router = express.Router();
var q = require('../scripts/queries');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard', {
    title: 'Dashboard'
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
      resolve(data);
    });
  });
  test.then(data => {
      res.send(data);
    })
    .catch(e => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;