const connection = require('./../../src/database');
const moment = require('moment');

module.exports = {
    index: () => {

    },
    find: (code) => {
        let query;
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        query = `SELECT * FROM drivers where code = ${code}`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    create: (data) => {
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let query = `INSERT INTO drivers (code, name, created_at, updated_at, deleted_at) VALUES ("${data.id}", "${data.first_name} ${data.last_name}", "${ date }", "${ date }", NULL)`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results.insertId);
            });
        });
    },
    // Actualizar solo una columna
    updateColumn: (key, value, code) => {
        let query = `UPDATE drivers SET ${key} = '${value}' where code = "${code}"`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    setVehicleType: (data) => {
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let type = data.update.callback_query.data == 'setDriverVehicleMoto' ? 'Motocicleta': 'Automóvil';
        let query = `UPDATE drivers set
                        vehicle_type = "${type}", updated_at = "${ date }"
                        where code = "${data.update.callback_query.from.id}"`;
            return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results);
            });
        });
    },
    getDriverTypeVehicle: (type) => {
        return new Promise(function (resolve, reject) {
            let query = `SELECT * FROM drivers where vehicle_type = "${type}"`;
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve({results});
            });
        });
    },
    createLocation: (code, latitude, longitude) => {
        let date = moment().format('YYYY-MM-DD hh:mm:ss');
        let query = `INSERT INTO driver_locations (driver_code, latitude, longitude, created_at, updated_at, deleted_at) VALUES ("${code}", "${latitude}", "${longitude}", "${ date }", "${ date }", NULL)`;
        return new Promise(function (resolve, reject) {
            connection.query(query, function (err, results) {
                if (err) return reject(err);
                return resolve(results.insertId);
            });
        });
    },
}