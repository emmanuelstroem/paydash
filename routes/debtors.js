/**
 * Created by emmanuel on 15/05/2017.
 */

var express = require('express');
var router = express.Router();

var db = require('../dbconfig');

var PQ = require('pg-promise').ParameterizedQuery;

var PS = require('pg-promise').PreparedStatement;

// var $ = require('')

/* GET Debtors page. */
router.get('/', function(req, res, next) {

    db.any('SELECT * FROM tbl_users')
        .then(data => {

            res.render('debtors', { title: 'PayDashboard', allusers: data });
        })
        .catch(error => {

        });


});

module.exports = router;