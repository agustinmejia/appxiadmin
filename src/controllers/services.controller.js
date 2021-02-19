const servicesCtrl = {};

const pool = require('../database');

servicesCtrl.renderServices = async (req, res) => {
    const services = await pool.query(` SELECT s.*, d.name as driver, c.name as customer FROM services as s, drivers as d, customer_locations as l, customers as c
                                        WHERE s.driver_id = d.id and s.location_id = l.id and l.customer_id = c.id and s.deleted_at is NULL`);
    res.render('services/list', { services });
}

servicesCtrl.renderMap = async (req, res) => {
  let { id } = req.params;
  console.log(id)
  res.render('map1');
}

module.exports = servicesCtrl;