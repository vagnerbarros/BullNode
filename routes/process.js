const express = require('express');
const router = express.Router();

let controller = require('../controller/controller');

//product more data to be processed
router.post('/process', controller.process.addData);

module.exports = router;