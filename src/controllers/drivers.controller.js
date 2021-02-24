const driversCtrl = {};

const pool = require('../database');

driversCtrl.renderDrivers = async (req, res) => {
    const drivers = await pool.query('SELECT d.*, (SELECT FORMAT(AVG(s.rating), 1) FROM services as s WHERE s.driver_id = d.id) as rating FROM drivers as d WHERE d.deleted_at is NULL');
    res.render('drivers/list', { drivers });
}

module.exports = driversCtrl;