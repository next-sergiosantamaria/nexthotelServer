let router = require('express').Router();

var dataController = require('../controllers/dataController.js');

router.get('/', function (req, res) {
    res.send("message from API");
});

router.route('/users')
    .get(dataController.index);

router.route('/newUser')
    .post(dataController.new);    

module.exports = router;