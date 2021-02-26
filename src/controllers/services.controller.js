const servicesCtrl = {};

const pool = require('../database');

servicesCtrl.renderServices = async (req, res) => {
  const services = await pool.query(` SELECT s.*, d.name as driver, c.name as customer FROM services as s, drivers as d, customer_locations as l, customers as c
                                      WHERE s.driver_id = d.id and s.location_id = l.id and l.customer_id = c.id and s.deleted_at is NULL`);
  res.render('services/list', { services });
}

servicesCtrl.statusServices = async (req, res) => {
  let { id, value } = req.params;

  await pool.query(`UPDATE services set status = '${value}' where id = ${id}`);

  let service = await pool.query(`SELECT * FROM services where id = ${id}`);

  let message = 'Servicio anulado correctamente';
  let statusLocation = 0;
  switch (value) {
      case '2':
          message = 'Servicio concluido correctamente';
          statusLocation = 3;
          break;
  }
  
  await pool.query(`UPDATE drivers set status = 1 where id = ${service[0].driver_id}`);
  await pool.query(`UPDATE customer_locations set status = '${statusLocation}' where id = ${service[0].location_id}`);

  req.flash('success', message);
  res.redirect('/services');
}

servicesCtrl.renderMapMonitor = async (req, res) => {
  res.render('maps/monitor');
}

servicesCtrl.getDataMonitor = async (req, res) => {
  const locations = await pool.query(` SELECT last_location as location, avatar, name from drivers`);
  res.json(locations)
}

module.exports = servicesCtrl;