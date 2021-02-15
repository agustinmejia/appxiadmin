const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderServices } = require('../controllers/services.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/', isLoggedIn, renderServices);

module.exports = router;