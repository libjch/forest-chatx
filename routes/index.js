var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //console.log('index page '+req)
    res.render('index', { title: 'ChatX' });
});

module.exports = router;
