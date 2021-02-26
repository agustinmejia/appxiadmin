const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderServices, statusServices, renderMap, renderMapMonitor, getDataMonitor } = require('../controllers/services.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/', isLoggedIn, renderServices);
router.get('/status/:value/:id', statusServices);
router.get('/monitor/driver', isLoggedIn, renderMapMonitor);
router.get('/monitor/driver/get', isLoggedIn, getDataMonitor);

module.exports = router;