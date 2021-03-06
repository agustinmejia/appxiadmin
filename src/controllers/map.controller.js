const mapsCtrl = {};

const pool = require('../database');
const driversController = require(`../../app/controllers/driversController.js`);
const servicesController = require(`../../app/controllers/servicesController.js`);

mapsCtrl.renderMap = async (req, res) => {
  let { id, type } = req.params;
  let service = {}
  let query;
  if(type == 'service'){
    query = await pool.query(`SELECT s.*, l.latitude, l.longitude, d.code, c.avatar, c.name, l.created_at
                                      FROM services as s, customer_locations as l, customers as c, drivers as d
                                      WHERE s.location_id = l.id and c.id = l.customer_id and s.driver_id = d.id and s.id = '${id}' limit 1`);
    service = {
      id: query[0].id,
      code: query[0].code
    }
  }else{
    query = await pool.query(`SELECT l.latitude, l.longitude, d.code, c.avatar, c.name, l.created_at
                                      FROM customer_locations as l, customers as c, drivers as d
                                      WHERE c.id = l.customer_id and l.id = '${id}' limit 1`);
  }
  let customer = {
    name: query[0].name,
    avatar: query[0].avatar
  }
  let location = {
    latitude: query[0].latitude,
    longitude: query[0].longitude,
    created_at: query[0].created_at
  }
  
  res.render('maps/service', {customer, location, service});
}

mapsCtrl.updateLocation = async (req, res) => {
  let { id, lat, lng } = req.params;
  const service = await pool.query(`SELECT s.*, l.latitude, l.longitude, d.code FROM services as s, customer_locations as l, customers as c, drivers as d
                                    WHERE s.location_id = l.id and c.id = l.customer_id and s.driver_id = d.id and s.id = '${id}' limit 1`);
  let {code} = service[0];
  let position = {lat, lng}
  await driversController.updateColumn('last_location', JSON.stringify(position), code);
  await driversController.createLocation(code, lat, lng);
  res.send('update');
}

mapsCtrl.updateService = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;
  await servicesController.updateColumn('destination', JSON.stringify(location), id);
  res.send('updateServicio');
}

module.exports = mapsCtrl;