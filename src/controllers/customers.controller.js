const customersCtrl = {};

const pool = require('../database');

customersCtrl.renderCustomer = async (req, res) => {
    const customers = await pool.query('SELECT * FROM customers WHERE deleted_at is NULL');
    res.render('customers/list', { customers });
}

customersCtrl.locationsCustomer = async (req, res) => {
    let { id } = req.params
    const locations = await pool.query(`SELECT l.*, c.name FROM customer_locations as l, customers as c WHERE c.id = l.customer_id and c.id = ${id}`);
    let name = '';
    if(locations.length){
        name = locations[0].name;
    }
    res.render('customers/locations', { locations, name });
}

module.exports = customersCtrl;