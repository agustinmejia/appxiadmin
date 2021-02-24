const express = require('express');
const router = express.Router();

const { renderIndex, renderdriverInfo } = require('../controllers/index.conroller');

router.get('/', renderIndex);
router.get('/driver/:id', renderdriverInfo);

module.exports = router;