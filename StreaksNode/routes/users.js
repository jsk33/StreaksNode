var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource please');
  console.log("you have hit the /users endpoint");
});

module.exports = router;
