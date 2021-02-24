const indexCtrl = {};

const pool = require('../database');

indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};

indexCtrl.renderdriverInfo = async (req, res) => {
    let { id } = req.params;
    const driver = await pool.query(`SELECT d.*, (SELECT FORMAT(AVG(s.rating), 1) FROM services as s WHERE s.driver_id = d.id) as rating FROM drivers as d WHERE d.id = ${id}`);
    res.render('drivers/view', {driver: driver[0]})
}

module.exports = indexCtrl;
