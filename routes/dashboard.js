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
   var temp = "{"+req.param('val')+": "+'"'+req.param('qq')+'"}';
   //console.log(JSON.parse(temp));
  q.delete(req.param('col'), {uid: req.param('qq')});
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