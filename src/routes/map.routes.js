const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderMap, updateLocation } = require('../controllers/map.controller')

router.get('/:id/:type', renderMap);
router.get('/:id', renderMap);
router.post('/:id/:lat/:lng', updateLocation);

module.exports = router;