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

    db.any('SELECT dl.id, dl.cust_name, tp.national_id, tp.mobile_number, tp.fully_cleared, dl.loan_balance FROM tbl_due_listing AS dl JOIN tbl_profiles AS tp ON dl.id = tp.id WHERE tp.fully_cleared = FALSE')
        .then(data => {

            res.render('debtors', { title: 'PayDashboard', allusers: data });
        })
        .catch(error => {

        });


});

module.exports = router;