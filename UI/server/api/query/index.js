'use strict';

var express = require('express');
var controller = require('./query.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/count', controller.count);
router.post('/', controller.queryData);
router.get('/export', controller.export);
module.exports = router;