/**
 * Created by emmanuel on 14/05/2017.
 */

var pgp = require('pg-promise')();

var dbpath = "postgres://dev001:EV5gy2pQPDhC4H&fg3$5qzWL*9P4=D2K8ta9x&Qr2@51.140.33.76:6773/testdb";

var db = pgp(dbpath);

// if (db.connect()){
//     console.log('db connected')
//
// }

module.exports = db;