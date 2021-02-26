const driversCtrl = {};

const pool = require('../database');

driversCtrl.renderDrivers = async (req, res) => {
    const drivers = await pool.query('SELECT d.*, (SELECT FORMAT(AVG(s.rating), 1) FROM services as s WHERE s.driver_id = d.id) as rating FROM drivers as d WHERE d.deleted_at is NULL');
    res.render('drivers/list', { drivers });
}

driversCtrl.renderEditDriver = async (req, res) => {
    let { id } = req.params;
    const query = await pool.query(`SELECT d.* FROM drivers as d WHERE d.id = '${id}'`);
    let driver = {}
    if(query.length){
        driver = query[0]
    }
    res.render('drivers/edit', { driver });
}

driversCtrl.editDriver = async (req, res) => {
    let { id } = req.params;
    let { name, phone, vehicle_type, status } = req.body;
    const query = await pool.query(`UPDATE drivers
                                    set name = '${name}', phone = '${phone}', vehicle_type = '${vehicle_type}', status = '${status}'
                                    WHERE id = '${id}'`);

    req.flash('success', 'Información de conductor actualizada exitosamente.');
    res.redirect('/drivers');
}

module.exports = driversCtrl;