const servicesCtrl = {};

const pool = require('../database');

servicesCtrl.renderServices = async (req, res) => {
    const services = await pool.query('SELECT * FROM services WHERE deleted_at is NULL');
    res.render('services/list', { services });
}

module.exports = servicesCtrl;