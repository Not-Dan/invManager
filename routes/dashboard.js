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
router.post('/deleteEntry', function(req, res){
  console.log(req.param.col);
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
module.exports = router;