'use strict';

var mysql = require('mysql');
var migration = require('mysql-migrations');

const { database } = require('./src/config');
var connection = mysql.createPool(database);

migration.init(connection, `${__dirname}/database/migrations`, function() {
  console.log("Migración finalizada");
});