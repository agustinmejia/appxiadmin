const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderServices, renderMap } = require('../controllers/services.controller')

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/', isLoggedIn, renderServices);
router.get('/:id', renderMap);

module.exports = router;