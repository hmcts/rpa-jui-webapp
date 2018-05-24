const express = require('express');
const router = express.Router();

const caseRoutes = require('./cases');




router.use('/cases', caseRoutes);






module.exports = router;