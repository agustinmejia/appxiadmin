const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderDrivers, renderEditDriver, editDriver } = require('../controllers/drivers.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/', isLoggedIn, renderDrivers);
router.get('/edit/:id', isLoggedIn, renderEditDriver);
router.post('/edit/:id', isLoggedIn, editDriver);

module.exports = router;