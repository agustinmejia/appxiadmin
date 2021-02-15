const connection = require('./../../src/database');
const moment = require('moment');

module.exports = {
    index: () => {

    },
    find: (code) => {
        let query = `SELECT * FROM customers where code = ${code}`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    findProccess: (code) => {
        let query = `SELECT * FROM exec_proccess where code = ${code} and status = 1 ORDER BY id DESC`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    create: async (data) => {
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let query = `INSERT INTO customers (code, name, created_at, updated_at, deleted_at) VALUES ("${data.id}", "${data.first_name} ${data.last_name}", "${ date }", "${ date }", NULL)`;
        let insert = new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results.insertId);
            });
        });

        let insertId = await insert.then(results => results);

        query = `SELECT * FROM customers where id = ${insertId}`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    createProccess: async (code, name) => {
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let query = `INSERT INTO exec_proccess (code, name, created_at, updated_at) VALUES ("${code}", "${name}", "${ date }", "${ date }")`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results.insertId);
            });
        });
    },
    createLocation: (id, data) => {
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let query = `INSERT INTO customer_locations
                    (customer_id, latitude, longitude, created_at, updated_at, deleted_at) VALUES
                    (${id}, "${data.location.latitude}", "${data.location.longitude}", "${ date }", "${ date }", NULL)`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results.insertId);
            });
        });
    },
    findLocation: (id) => {
        let query = `SELECT u.*, l.id as location_id, l.status as location_status FROM customer_locations as l, customers as u WHERE u.id = l.customer_id and l.id = ${id}`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    lastLocationByUserCode: (code) => {
        let query = `SELECT u.*, l.id as location_id, l.vehicle_type, l.status as location_status, l.latitude, l.longitude FROM customers as u, customer_locations as l WHERE u.id = l.customer_id and u.code = ${code} ORDER BY l.id DESC LIMIT 1`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    updateColumn: (key, value, code) => {
        let query = `UPDATE customers SET ${key} = '${value}' where code = "${code}"`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    updateColumnLocation: (key, value, id) => {
        let query = `UPDATE customer_locations SET ${key} = '${value}' where id = "${id}"`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    deleteProccess: async (code) => {
        let query = `UPDATE exec_proccess SET status = 0 WHERE code = "${code}"`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results.insertId);
            });
        });
    },
}