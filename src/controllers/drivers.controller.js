const driversCtrl = {};

const pool = require('../database');

driversCtrl.renderDrivers = async (req, res) => {
    const drivers = await pool.query('SELECT * FROM drivers WHERE deleted_at is NULL');
    res.render('drivers/list', { drivers });
}

module.exports = driversCtrl;