/**
 * Created by emmanuel on 15/05/2017.
 */

var express = require('express');
var router = express.Router();

var db = require('../dbconfig');

var PQ = require('pg-promise').ParameterizedQuery;

var PS = require('pg-promise').PreparedStatement;
