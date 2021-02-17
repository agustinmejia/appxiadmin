const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderCustomer, locationsCustomer } = require('../controllers/customers.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/', isLoggedIn, renderCustomer);

router.get('/locations/:id', locationsCustomer);

module.exports = router;