const express = require('express');
const router = express.Router();

const sylhetController= require('../../controllers/admin/sylhet');
const auth= require('../../middleware/admin/auth');

router.get('/sylhet/chart', sylhetController.getChartSylhet);
router.get('/sylhet',auth, sylhetController.getSylhet);
router.post('/sylhet', sylhetController.postSylhet);
router.get('/sylhet/view',auth, sylhetController.getSylhetView);
router.post('/sylhet/edit/:id', sylhetController.postEditSylhet);
router.post('/sylhet/editt/:id', sylhetController.postEdittSylhet);
router.post('/sylhet/edittt/:id', sylhetController.postEditttSylhet);
router.get('/sylhet/chartData', sylhetController.getSylhetChart);

module.exports=router;