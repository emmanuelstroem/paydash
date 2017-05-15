/**
 * Created by emmanuel on 14/05/2017.
 */

var express = require('express');
var router = express.Router();

var db = require('../dbconfig');

var PQ = require('pg-promise').ParameterizedQuery;

var PS = require('pg-promise').PreparedStatement;


// Authenticate User
router.post('/', function (req, res, next) {


    var username = req.body.inputUsername;
    var pass = req.body.inputPassword;

    console.log("Username: " + username);
    console.log("Password: " + pass);

    var findUser = new PQ('SELECT username, user_password FROM tbl_users WHERE username = $1 AND user_password = $2', [username, pass]);


    db.one(findUser)
        .then(user => {
            if(!user){

            console.log('auth failed')
            res.redirect('/')
        }
        else if(user){
            console.log('login success: ' + user);
            req.session.user = username;


        req.session.save(function (err) {

            if(!err){
                console.log('session saved');
                console.log(req.session.user)

                res.redirect('/dashboard')
            } else {

                console.log('session not saved')
            }

        });
        }
    })
    .catch (error => {
        console.log(error)
    if(error){
            res.json(error)

    }
    });

});

module.exports = router;
