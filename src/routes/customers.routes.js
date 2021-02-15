const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderCustomer } = require('../controllers/customers.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/', isLoggedIn, renderCustomer);

module.exports = router;