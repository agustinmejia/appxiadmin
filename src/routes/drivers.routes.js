const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderDrivers } = require('../controllers/drivers.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/', isLoggedIn, renderDrivers);

module.exports = router;