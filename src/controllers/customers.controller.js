const customersCtrl = {};

const pool = require('../database');

customersCtrl.renderCustomer = async (req, res) => {
    const customers = await pool.query('SELECT * FROM customers WHERE deleted_at is NULL');
    res.render('customers/list', { customers });
}

module.exports = customersCtrl;